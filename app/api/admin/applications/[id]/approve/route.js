import { NextResponse } from 'next/server'
import { verifyAdminAuth, unauthorized } from '@/lib/adminAuth'
import { createAdminClient } from '@/lib/supabaseAdmin'

export async function POST(request, { params }) {
  const auth = await verifyAdminAuth()
  if (!auth) return unauthorized()

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Missing application id' }, { status: 400 })
  }

  // performed_by is a placeholder — current auth model has no named admin identity.
  const performed_by = 'admin'

  const supabase = createAdminClient()

  const { data: existing, error: fetchError } = await supabase
    .from('creator_applications')
    .select('id, full_name, email, instagram, requested_username, status, rejection_reason, reviewed_by, reviewed_at, creator_id, created_at')
    .eq('id', id)
    .maybeSingle()

  if (fetchError) {
    console.error('creator_applications fetch failed', fetchError)
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
  if (!existing) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }
  if (existing.status !== 'pending') {
    return NextResponse.json({ error: `Application cannot be approved — current status is '${existing.status}'` }, { status: 409 })
  }

  const { data: creator, error: creatorError } = await supabase
    .from('creators')
    .insert({
      full_name: existing.full_name,
      email: existing.email,
      username: existing.requested_username,
      instagram: existing.instagram,
      avatar_url: null,
      is_active: true,
      jazzcash_number: null,
      application_id: existing.id,
      admin_notes: null,
    })
    .select('id, full_name, email, username, instagram, avatar_url, is_active, jazzcash_number, application_id, admin_notes, created_at')
    .single()

  if (creatorError) {
    console.error('creators insert failed', creatorError, { application_id: id })
    return NextResponse.json({ error: 'Failed to create creator', detail: creatorError.message }, { status: 500 })
  }

  const reviewed_at = new Date().toISOString()

  const { data: updated, error: updateError } = await supabase
    .from('creator_applications')
    .update({
      status: 'approved',
      creator_id: creator.id,
      reviewed_by: performed_by,
      reviewed_at,
      rejection_reason: null,
    })
    .eq('id', id)
    .select('id, full_name, email, instagram, requested_username, status, rejection_reason, reviewed_by, reviewed_at, creator_id, created_at')
    .single()

  if (updateError) {
    // Creator was inserted but the application status update failed.
    // Not a true transaction — surface honest partial-success state for manual reconciliation.
    console.error('creator_applications update failed after creator insert', updateError, {
      application_id: id,
      creator_id: creator.id,
    })
    return NextResponse.json(
      {
        error: 'Creator created but application update failed — manual reconciliation required',
        creator_id: creator.id,
        application_id: id,
        detail: updateError.message,
      },
      { status: 500 }
    )
  }

  const { error: auditError } = await supabase
    .from('admin_actions')
    .insert({
      action_type: 'application_reviewed_approved',
      target_type: 'creator_application',
      target_id: id,
      brand_id: null,
      creator_id: creator.id,
      before_state: existing,
      after_state: updated,
      performed_by,
      notes: null,
    })

  if (auditError) {
    // Creator and application both succeeded; only audit write failed.
    console.error('admin_actions insert failed after application approve', auditError, {
      application_id: id,
      creator_id: creator.id,
    })
    return NextResponse.json(
      {
        application: updated,
        creator,
        audit_warning: 'Audit log failed — application is approved and creator exists, but admin_actions write needs manual reconciliation',
        application_id: id,
        creator_id: creator.id,
      },
      { status: 200 }
    )
  }

  return NextResponse.json({ application: updated, creator }, { status: 201 })
}
