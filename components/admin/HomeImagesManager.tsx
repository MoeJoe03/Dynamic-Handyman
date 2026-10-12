'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { galleryConfig, getCategoryLabel } from '@/config/gallery.config';
import { homeImageSlots, type HomeImageOverride, type HomeImageOverrides, type HomeImageSlot } from '@/config/home-images';
import type { GalleryImageView } from '@/lib/gallery/types';
import { createClient } from '@/lib/supabase/client';

function HomeImageCard({ slot, override, onChange }: { slot: HomeImageSlot; override?: HomeImageOverride; onChange: (key: string, value?: HomeImageOverride) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryImageView | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImageView[] | null>(null);
  const [altText, setAltText] = useState(override?.alt_text ?? slot.defaultAlt);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const altTextChanged = altText.trim() !== (override?.alt_text ?? slot.defaultAlt).trim();

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) return;
    if (selected.size > galleryConfig.upload.maxFileSizeMB * 1024 * 1024 || !galleryConfig.upload.acceptedTypes.includes(selected.type as typeof galleryConfig.upload.acceptedTypes[number])) {
      setMessage('Choose a JPG, PNG, or WebP image no larger than 8 MB.');
      event.target.value = '';
      return;
    }
    setFile(selected);
    setSelectedGallery(null);
    setPreview(URL.createObjectURL(selected));
    event.target.value = '';
    setMessage('');
  }

  async function openGallery() {
    setGalleryOpen(true);
    if (galleryImages) return;
    setGalleryLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/gallery', { cache: 'no-store' });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? 'Could not load gallery photos.');
      setGalleryImages(body.images as GalleryImageView[]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load gallery photos.');
    } finally {
      setGalleryLoading(false);
    }
  }

  function chooseGallery(image: GalleryImageView) {
    setSelectedGallery(image);
    setFile(null);
    setPreview(null);
    setAltText(image.alt_text || '');
    setGalleryOpen(false);
    setMessage('Gallery photo selected. Save to use it here.');
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file && !selectedGallery && !altTextChanged) return;
    setBusy(true);
    setMessage('');
    try {
      let response: Response;
      if (selectedGallery) {
        response = await fetch(`/api/admin/home-images/${slot.key}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ galleryImageId: selectedGallery.id, altText }),
        });
      } else if (file) {
        const form = new FormData();
        form.set('image', file);
        form.set('altText', altText);
        response = await fetch(`/api/admin/home-images/${slot.key}`, { method: 'POST', body: form });
      } else {
        response = await fetch(`/api/admin/home-images/${slot.key}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ altText }),
        });
      }
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? 'Could not save this image.');
      onChange(slot.key, body as HomeImageOverride);
      setFile(null);
      setSelectedGallery(null);
      setPreview(null);
      setMessage(file || selectedGallery ? 'Image updated on the home page.' : 'Alt text updated on the home page.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save this image.');
    } finally {
      setBusy(false);
    }
  }

  async function restore() {
    if (!override || !window.confirm(`Restore the original image for ${slot.label}?`)) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/home-images/${slot.key}`, { method: 'DELETE' });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? 'Could not restore the original image.');
      onChange(slot.key);
      setAltText(slot.defaultAlt);
      setFile(null);
      setSelectedGallery(null);
      setPreview(null);
      setMessage('Original image restored.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not restore the original image.');
    } finally {
      setBusy(false);
    }
  }

  return <article className="overflow-hidden border border-[#D9DEE2] bg-white">
    <div className="relative aspect-[4/3] bg-[#E8EFF4]">
      <Image src={preview ?? selectedGallery?.imageUrl ?? override?.imageUrl ?? slot.defaultImageUrl} alt={preview || selectedGallery ? 'Selected replacement preview' : override?.alt_text ?? slot.defaultAlt} fill unoptimized={Boolean(preview)} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
    </div>
    <div className="p-5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#19547E]">{override?.gallery_image_id ? 'Gallery image' : override && override.image_path !== slot.defaultImageUrl ? 'Custom image' : 'Original image'}</p>
      <h3 className="mt-1 text-lg font-bold text-[#123E61]">{slot.label}</h3>
      <form onSubmit={save} className="mt-4 space-y-4">
        <label className="block text-sm font-semibold text-[#123E61]">Replacement photo
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectFile} disabled={busy} className="mt-2 block w-full text-sm file:mr-3 file:border-0 file:bg-[#E8EFF4] file:px-3 file:py-2 file:font-semibold file:text-[#123E61]" />
        </label>
        <button type="button" onClick={openGallery} disabled={busy || galleryLoading} className="min-h-11 w-full border border-[#123E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] disabled:opacity-50">{galleryLoading ? 'Loading gallery…' : 'Choose from Gallery'}</button>
        {galleryOpen && <div className="max-h-72 overflow-y-auto border border-[#D9DEE2] bg-[#F8F9F9] p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#123E61]">Select an existing gallery photo</p>
            <button type="button" onClick={() => setGalleryOpen(false)} className="text-xs font-semibold text-[#123E61] underline">Close</button>
          </div>
          {galleryLoading ? <p className="text-sm text-slate-600">Loading photos…</p> : galleryImages?.length === 0 ? <p className="text-sm text-slate-600">No gallery photos yet. Upload one in Gallery Manager first.</p> : <div className="grid grid-cols-2 gap-2">
            {galleryImages?.map((image) => <button key={image.id} type="button" onClick={() => chooseGallery(image)} className="border border-[#D9DEE2] bg-white p-1 text-left hover:border-[#123E61] focus-visible:outline-2 focus-visible:outline-[#123E61]" aria-label={`Use ${image.alt_text || getCategoryLabel(image.category)}`}>
              <span className="relative block aspect-[4/3]"><Image src={image.imageUrl} alt={image.alt_text || getCategoryLabel(image.category)} fill sizes="160px" className="object-cover" /></span>
              <span className="block truncate p-1 text-xs text-slate-700">{image.alt_text || getCategoryLabel(image.category)}</span>
            </button>)}
          </div>}
        </div>}
        <label className="block text-sm font-semibold text-[#123E61]">Image description (alt text)
          <input value={altText} onChange={(event) => setAltText(event.target.value)} required minLength={1} maxLength={300} disabled={busy} className="mt-2 block min-h-11 w-full border border-[#C9D2D9] px-3 py-2 font-normal text-slate-800" />
        </label>
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy || (!file && !selectedGallery && !altTextChanged)} className="min-h-11 bg-[#123E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">{busy ? 'Saving…' : file || selectedGallery ? 'Save image' : 'Save alt text'}</button>
          {override && <button type="button" onClick={restore} disabled={busy} className="min-h-11 border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] disabled:opacity-50">Restore original</button>}
        </div>
      </form>
      {message && <p role="status" className="mt-3 text-sm text-slate-700">{message}</p>}
    </div>
  </article>;
}

export function HomeImagesManager({ initialOverrides, initialError }: { initialOverrides: HomeImageOverrides; initialError: string | null }) {
  const router = useRouter();
  const [overrides, setOverrides] = useState(initialOverrides);
  const [signingOut, setSigningOut] = useState(false);
  const sections = ['Hero carousel', 'Service carousels', 'Featured projects', 'Other home sections'] as const;

  function update(key: string, value?: HomeImageOverride) {
    setOverrides((current) => {
      const next = { ...current };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
  }

  async function signOut() {
    setSigningOut(true);
    await createClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  return <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-10">
    <header className="mb-10 flex flex-col gap-5 border-b border-[#D9DEE2] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-[#19547E]">{galleryConfig.businessName}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">HOME IMAGES</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Replace any home page photo with a new upload or reuse an existing Gallery photo. Each position keeps its original image until you save a replacement.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/" target="_blank" className="flex min-h-11 items-center border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61]">View home page</Link>
        <Link href="/admin/gallery" className="flex min-h-11 items-center border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61]">Gallery Manager</Link>
        <button type="button" onClick={signOut} disabled={signingOut} className="min-h-11 border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] disabled:opacity-50">Sign Out</button>
      </div>
    </header>
    {initialError && <p role="alert" className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800">{initialError}</p>}
    {sections.map((section) => <section key={section} className="mb-12" aria-label={section}>
      <h2 className="mb-5 text-2xl font-bold text-[#123E61]">{section}</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {homeImageSlots.filter((slot) => slot.section === section).map((slot) => <HomeImageCard key={slot.key} slot={slot} override={overrides[slot.key]} onChange={update} />)}
      </div>
    </section>)}
  </div>;
}
