import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getAdmin, isSameOrigin } from '@/lib/gallery/auth';
import { altTextSchema, categorySchema } from '@/lib/gallery/validation';

export const runtime = 'nodejs';

const reuseSchema = z.object({
  imagePath: z.string().startsWith('home/'),
  category: categorySchema,
  altText: altTextSchema,
});

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });

    const parsed = reuseSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Select an uploaded image, category, and valid alt text.' }, { status: 400 });

    const { data: homeImage, error: homeError } = await admin.supabase.from('home_images')
      .select('image_path').eq('image_path', parsed.data.imagePath).limit(1).maybeSingle();
    if (homeError) throw homeError;
    if (!homeImage) return NextResponse.json({ error: 'That uploaded image is no longer available.' }, { status: 404 });

    const { data: existing, error: existingError } = await admin.supabase.from('gallery_images')
      .select('id').eq('image_path', parsed.data.imagePath).maybeSingle();
    if (existingError) throw existingError;
    if (existing) return NextResponse.json({ error: 'This image is already in the gallery.' }, { status: 409 });

    const { data: lastImage, error: orderError } = await admin.supabase.from('gallery_images')
      .select('sort_order').order('sort_order', { ascending: false }).limit(1).maybeSingle();
    if (orderError) throw orderError;

    const { data: image, error: insertError } = await admin.supabase.from('gallery_images')
      .insert({
        image_path: parsed.data.imagePath,
        category: parsed.data.category,
        alt_text: parsed.data.altText || null,
        sort_order: (lastImage?.sort_order ?? -1) + 1,
      })
      .select('*').single();
    if (insertError?.code === '23505') return NextResponse.json({ error: 'This image is already in the gallery.' }, { status: 409 });
    if (insertError) throw insertError;

    revalidatePath('/gallery');
    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    console.error('Gallery image reuse failed', error);
    return NextResponse.json({ error: 'Could not add this image to the gallery.' }, { status: 500 });
  }
}
