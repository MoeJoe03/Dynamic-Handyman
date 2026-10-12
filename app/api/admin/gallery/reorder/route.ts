import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { getAdmin, isSameOrigin } from '@/lib/gallery/auth';
import { reorderSchema } from '@/lib/gallery/validation';

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const parsed = reorderSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid image order.' }, { status: 400 });
    const { error } = await admin.supabase.rpc('reorder_gallery_images', { image_ids: parsed.data.imageIds });
    if (error) throw error;
    revalidatePath('/gallery');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery reorder failed', error);
    return NextResponse.json({ error: 'Could not save image order. Refresh and try again.' }, { status: 500 });
  }
}
