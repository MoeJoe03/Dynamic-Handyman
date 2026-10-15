'use client';

import { CmsTour } from './CmsTour';

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { galleryConfig } from '@/config/gallery.config';
import { homeImageSlots, type HomeImageOverride, type HomeImageOverrides, type HomeImageSlot } from '@/config/home-images';
import { homeServicesData } from '@/data/services';
import type { UploadedImage } from '@/lib/home-images/uploaded-image';
import { createClient } from '@/lib/supabase/client';

type SaveImage = () => Promise<boolean>;

function HomeImageCard({ slot, displayLabel, override, onChange, onDirtyChange, registerSave, savingAll }: {
  slot: HomeImageSlot;
  displayLabel?: string;
  override?: HomeImageOverride;
  onChange: (key: string, value?: HomeImageOverride) => void;
  onDirtyChange: (key: string, dirty: boolean) => void;
  registerSave: (key: string, save: SaveImage | null) => void;
  savingAll: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[] | null>(null);
  const [altText, setAltText] = useState(override?.alt_text ?? slot.defaultAlt);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const altTextChanged = altText.trim() !== (override?.alt_text ?? slot.defaultAlt).trim();
  const dirty = Boolean(file || selectedImage || altTextChanged);
  const previewUrl = preview ?? selectedImage?.imageUrl ?? override?.imageUrl ?? slot.defaultImageUrl;

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  useEffect(() => {
    onDirtyChange(slot.key, dirty);
    return () => onDirtyChange(slot.key, false);
  }, [slot.key, dirty, onDirtyChange]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) return;
    if (selected.size > galleryConfig.upload.maxFileSizeMB * 1024 * 1024 || !galleryConfig.upload.acceptedTypes.includes(selected.type as typeof galleryConfig.upload.acceptedTypes[number])) {
      setMessage('Choose a JPG, PNG, or WebP image no larger than 8 MB.');
      event.target.value = '';
      return;
    }
    setFile(selected);
    setSelectedImage(null);
    setPreview(URL.createObjectURL(selected));
    event.target.value = '';
    setMessage('');
  }

  async function openLibrary() {
    setLibraryOpen(true);
    setLibraryLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/uploaded-images', { cache: 'no-store' });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? 'Could not load uploaded images.');
      setUploadedImages(body.images as UploadedImage[]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load uploaded images.');
    } finally {
      setLibraryLoading(false);
    }
  }

  function chooseImage(image: UploadedImage) {
    setSelectedImage(image);
    setFile(null);
    setPreview(null);
    setAltText(image.altText || '');
    setLibraryOpen(false);
    setMessage('Uploaded image selected. Save to use it here.');
  }

  async function saveDraft(): Promise<boolean> {
    if (!dirty) return true;
    if (!file && !selectedImage && !override?.imageUrl && !slot.defaultImageUrl) {
      setMessage('Upload a photo or choose an uploaded image before saving.');
      return false;
    }
    if (!altText.trim() || altText.trim().length > 300) {
      setMessage('Describe this image in 1–300 characters before saving.');
      return false;
    }
    setBusy(true);
    setMessage('');
    try {
      let response: Response;
      if (selectedImage) {
        response = await fetch(`/api/admin/home-images/${slot.key}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imagePath: selectedImage.imagePath, altText }),
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
      setSelectedImage(null);
      setPreview(null);
      setMessage(file || selectedImage ? 'Image updated on the home page.' : 'Alt text updated on the home page.');
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save this image.');
      return false;
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    registerSave(slot.key, dirty ? saveDraft : null);
    return () => registerSave(slot.key, null);
  });

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingAll) return;
    await saveDraft();
  }

  async function restore() {
    if (!override || !window.confirm(slot.optional ? `Remove ${slot.label} from the review photo rotation?` : `Restore the original image for ${slot.label}?`)) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/home-images/${slot.key}`, { method: 'DELETE' });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? (slot.optional ? 'Could not remove this photo.' : 'Could not restore the original image.'));
      onChange(slot.key);
      setAltText(slot.defaultAlt);
      setFile(null);
      setSelectedImage(null);
      setPreview(null);
      setMessage(slot.optional ? 'Photo removed from the review photo rotation.' : 'Original image restored.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : slot.optional ? 'Could not remove this photo.' : 'Could not restore the original image.');
    } finally {
      setBusy(false);
    }
  }

  return <article className="overflow-hidden border border-[#D9DEE2] bg-white">
    <div className="relative aspect-[4/3] bg-[#E8EFF4]">
      {previewUrl ? <Image src={previewUrl} alt={preview || selectedImage ? 'Selected replacement preview' : override?.alt_text ?? slot.defaultAlt} fill unoptimized={Boolean(preview)} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" /> : <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-600">Add another photo from the same reviewed project.</div>}
    </div>
    <div className="p-5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#19547E]">{override?.gallery_image_id ? 'Gallery image' : override && override.image_path !== slot.defaultImageUrl ? 'Uploaded image' : slot.optional ? 'Optional photo' : 'Original image'}</p>
      <h3 className="mt-1 text-lg font-bold text-[#123E61]">{displayLabel ?? slot.label}</h3>
      {dirty && <p className="mt-1 text-xs font-semibold text-amber-800">Unsaved changes</p>}
      <form onSubmit={save} className="mt-4 space-y-4">
        <label className="block text-sm font-semibold text-[#123E61]">{slot.optional && !override ? 'Project photo' : 'Replacement photo'}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectFile} disabled={busy || savingAll} className="peer sr-only" />
          <span className={`mt-2 inline-flex min-h-11 items-center border border-[#123E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#123E61] ${busy || savingAll ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#E8EFF4]'}`}>Upload file</span>
          <span className="mt-2 block truncate text-xs font-normal text-slate-600" title={file?.name ?? ''}>{file?.name ?? 'No file selected'}</span>
        </label>
        <button type="button" onClick={openLibrary} disabled={busy || savingAll || libraryLoading} className="min-h-11 w-full border border-[#123E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] disabled:opacity-50">{libraryLoading ? 'Loading images…' : 'Choose from Uploaded Images'}</button>
        {libraryOpen && <div className="max-h-72 overflow-y-auto border border-[#D9DEE2] bg-[#F8F9F9] p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#123E61]">Select an uploaded image</p>
            <button type="button" onClick={() => setLibraryOpen(false)} className="text-xs font-semibold text-[#123E61] underline">Close</button>
          </div>
          {libraryLoading ? <p className="text-sm text-slate-600">Loading images…</p> : uploadedImages?.length === 0 ? <p className="text-sm text-slate-600">No uploaded images yet. Upload one here or in Gallery Manager first.</p> : <div className="grid grid-cols-2 gap-2">
            {uploadedImages?.map((image) => <button key={image.key} type="button" onClick={() => chooseImage(image)} className="border border-[#D9DEE2] bg-white p-1 text-left hover:border-[#123E61] focus-visible:outline-2 focus-visible:outline-[#123E61]" aria-label={`Use ${image.altText || image.source} image`}>
              <span className="relative block aspect-[4/3]"><Image src={image.imageUrl} alt={image.altText || `${image.source} image`} fill sizes="160px" className="object-cover" /></span>
              <span className="block truncate p-1 text-xs text-slate-700">{image.altText || 'Untitled image'}</span>
              <span className="block px-1 pb-1 text-[10px] font-semibold uppercase text-slate-500">{image.source}</span>
            </button>)}
          </div>}
        </div>}
        <label className="block text-sm font-semibold text-[#123E61]">Image description (alt text)
          <input value={altText} onChange={(event) => setAltText(event.target.value)} required minLength={1} maxLength={300} disabled={busy || savingAll} className="mt-2 block min-h-11 w-full border border-[#C9D2D9] px-3 py-2 font-normal text-slate-800" />
        </label>
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy || savingAll || !dirty} className="min-h-11 bg-[#123E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">{busy ? 'Saving…' : file || selectedImage ? 'Save image' : 'Save alt text'}</button>
          {override && <button type="button" onClick={restore} disabled={busy || savingAll} className="min-h-11 border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] disabled:opacity-50">{slot.optional ? 'Remove photo' : 'Restore original'}</button>}
        </div>
      </form>
      {message && <p role="status" className="mt-3 text-sm text-slate-700">{message}</p>}
    </div>
  </article>;
}

export function HomeImagesManager({ userId, initialOverrides, initialError, sectionFilter }: { userId: string; initialOverrides: HomeImageOverrides; initialError: string | null; sectionFilter?: HomeImageSlot['section'] }) {
  const router = useRouter();
  const [overrides, setOverrides] = useState(initialOverrides);
  const [signingOut, setSigningOut] = useState(false);
  const [dirtyKeys, setDirtyKeys] = useState<Record<string, boolean>>({});
  const [savingAll, setSavingAll] = useState(false);
  const [saveAllMessage, setSaveAllMessage] = useState('');
  const saveHandlers = useRef(new Map<string, SaveImage>());
  const sections = ['Hero carousel', 'Service carousels', 'Featured projects', 'Review project photos', 'Other home sections'] as const;
  const dirtyCount = Object.values(dirtyKeys).filter(Boolean).length;

  const onDirtyChange = useCallback((key: string, dirty: boolean) => {
    if (dirty) setSaveAllMessage('');
    setDirtyKeys((current) => {
      if (Boolean(current[key]) === dirty) return current;
      const next = { ...current };
      if (dirty) next[key] = true;
      else delete next[key];
      return next;
    });
  }, []);

  const registerSave = useCallback((key: string, save: SaveImage | null) => {
    if (save) saveHandlers.current.set(key, save);
    else saveHandlers.current.delete(key);
  }, []);

  useEffect(() => {
    if (!dirtyCount) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [dirtyCount]);

  async function saveAll() {
    if (!dirtyCount || savingAll) return;
    setSavingAll(true);
    setSaveAllMessage('');
    let failed = 0;
    for (const slot of homeImageSlots) {
      const save = saveHandlers.current.get(slot.key);
      if (save && !(await save())) failed += 1;
    }
    setSaveAllMessage(failed ? `${failed} image ${failed === 1 ? 'change needs' : 'changes need'} attention. Review the marked cards and try again.` : 'All changes saved.');
    setSavingAll(false);
  }

  function update(key: string, value?: HomeImageOverride) {
    setOverrides((current) => {
      const next = { ...current };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
  }

  async function signOut() {
    if (dirtyCount && !window.confirm('You have unsaved changes. Leave without saving?')) return;
    setSigningOut(true);
    await createClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  function renderCard(slot: HomeImageSlot, displayLabel?: string) {
    return <HomeImageCard key={slot.key} slot={slot} displayLabel={displayLabel} override={overrides[slot.key]} onChange={update} onDirtyChange={onDirtyChange} registerSave={registerSave} savingAll={savingAll} />;
  }

  return <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-10">
    <header className="mb-10 flex flex-col gap-5 border-b border-[#D9DEE2] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-[#19547E]">{galleryConfig.businessName}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">{sectionFilter === 'Service carousels' ? 'SERVICES MANAGER' : 'HOME IMAGES'}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Replace service photos with a new upload or reuse an image already uploaded in the shared library. Update each image&apos;s alt text and save your changes when ready.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/" target="_blank" className="flex min-h-11 items-center border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61]">View home page</Link>
        <Link href="/admin/gallery" onClick={(event) => { if (dirtyCount && !window.confirm('You have unsaved changes. Leave without saving?')) event.preventDefault(); }} className="flex min-h-11 items-center border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61]">Gallery Manager</Link>
        {sectionFilter !== 'Service carousels' && <Link href="/admin/services" onClick={(event) => { if (dirtyCount && !window.confirm('You have unsaved changes. Leave without saving?')) event.preventDefault(); }} className="flex min-h-11 items-center border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61]">Services Manager</Link>}
        <button type="button" onClick={signOut} disabled={signingOut} className="min-h-11 border border-[#C9D2D9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] disabled:opacity-50">Sign Out</button>
      </div>
    </header>
      <CmsTour page="home-images" userId={userId} />
    <div className="sticky top-0 z-20 mb-6 flex flex-wrap items-center justify-between gap-3 border border-[#D9DEE2] bg-white/95 px-4 py-3 shadow-sm backdrop-blur" aria-live="polite">
      <div>
        <p className={`text-sm font-bold ${dirtyCount ? 'text-amber-800' : 'text-[#123E61]'}`}>
          {dirtyCount ? `Unsaved changes: ${dirtyCount} ${dirtyCount === 1 ? 'image' : 'images'}` : 'No unsaved changes'}
        </p>
        {saveAllMessage && <p className="mt-1 text-xs text-slate-600">{saveAllMessage}</p>}
      </div>
      <button type="button" onClick={saveAll} disabled={!dirtyCount || savingAll} className="min-h-11 bg-[#123E61] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">
        {savingAll ? 'Saving all…' : 'Save All'}
      </button>
    </div>
    {initialError && <p role="alert" className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800">{initialError}</p>}
    {sections.filter((section) => !sectionFilter || section === sectionFilter).map((section) => <section key={section} className="mb-12" aria-label={section}>
      <h2 className="mb-5 text-2xl font-bold text-[#123E61]">{section}</h2>
      {section === 'Review project photos' && <p className="mb-5 max-w-3xl text-sm text-slate-600">Use photos from the same reviewed project to show the different services completed. The photos rotate automatically while the customer reviews stay in place. Additional photos are optional; each unique image appears once.</p>}
      {section === 'Service carousels' ? <div className="space-y-10">
        {homeServicesData.map((service) => <div key={service.id} className="border-t-2 border-[#D9DEE2] pt-6 first:border-t-0 first:pt-0" aria-label={`${service.title} carousel images`}>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#19547E]">Service {service.ref}</p>
              <h3 className="text-lg font-bold text-[#123E61] sm:text-xl">{service.title}</h3>
            </div>
            <p className="text-xs font-semibold text-slate-500">Images 1–4</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {homeImageSlots.filter((slot) => slot.section === section && slot.key.startsWith(`service-${service.id}-`)).map((slot, index) => renderCard(slot, `Image ${index + 1}`))}
          </div>
        </div>)}
      </div> : <div className={`grid gap-5 md:grid-cols-2 ${section === 'Review project photos' ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
        {homeImageSlots.filter((slot) => slot.section === section).map((slot) => renderCard(slot))}
      </div>}
    </section>)}
  </div>;
}
