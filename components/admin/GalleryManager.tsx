'use client';

import { CmsTour } from './CmsTour';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { galleryConfig, getCategoryLabel } from '@/config/gallery.config';
import type { GalleryImageView } from '@/lib/gallery/types';
import type { UploadedImage } from '@/lib/home-images/uploaded-image';
import { createClient } from '@/lib/supabase/client';

type QueuedFile = {
  file: File;
  preview: string;
  altText: string;
  progress: number;
  status: 'ready' | 'uploading' | 'done' | 'error';
  error?: string;
};

export function GalleryManager({ userId, initialImages, initialError }: { userId: string; initialImages: GalleryImageView[]; initialError: string | null }) {
  const router = useRouter();
  const previews = useRef<string[]>([]);
  const [images, setImages] = useState(initialImages);
  const [filter, setFilter] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'library'>('file');
  const [availableUploads, setAvailableUploads] = useState<UploadedImage[] | null>(null);
  const [loadingUploads, setLoadingUploads] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState<UploadedImage | null>(null);
  const [reuseAlt, setReuseAlt] = useState('');
  const [queued, setQueued] = useState<QueuedFile[]>([]);
  const [category, setCategory] = useState<string>(galleryConfig.categories[0].value);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState('');
  const [editAlt, setEditAlt] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(initialError ?? '');

  useEffect(() => () => previews.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const visibleImages = filter === 'all' ? images : images.filter((image) => image.category === filter);

  async function reloadImages() {
    const response = await fetch('/api/admin/gallery', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not refresh gallery images.');
    const body = await response.json();
    setImages(body.images);
  }

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    previews.current.forEach((url) => URL.revokeObjectURL(url));
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > galleryConfig.upload.maxFilesPerBatch) {
      setMessage(`Select no more than ${galleryConfig.upload.maxFilesPerBatch} images at once.`);
      setQueued([]);
      event.target.value = '';
      return;
    }
    const next = selected.map((file) => ({ file, preview: URL.createObjectURL(file), altText: '', progress: 0, status: 'ready' as const }));
    previews.current = next.map((item) => item.preview);
    setQueued(next);
    setMessage('');
  }

  function updateQueued(index: number, patch: Partial<QueuedFile>) {
    setQueued((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  }

  async function uploadOne(item: QueuedFile, index: number) {
    return new Promise<void>((resolve, reject) => {
      const form = new FormData();
      form.append('files', item.file);
      form.append('category', category);
      form.append('altText', item.altText);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/admin/gallery');
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) updateQueued(index, { progress: Math.round(event.loaded / event.total * 100) });
      };
      xhr.onload = () => {
        let body: { error?: string } = {};
        try { body = JSON.parse(xhr.responseText); } catch { /* Response was not JSON. */ }
        if (xhr.status === 201) resolve();
        else reject(new Error(body.error || 'Upload failed.'));
      };
      xhr.onerror = () => reject(new Error('Network error during upload.'));
      xhr.send(form);
    });
  }

  async function uploadFiles() {
    if (queued.length === 0) return;
    setBusy(true);
    setMessage('');
    let succeeded = 0;
    for (const [index, item] of queued.entries()) {
      if (item.status === 'done') continue;
      if (item.file.size > galleryConfig.upload.maxFileSizeMB * 1024 * 1024 || !galleryConfig.upload.acceptedTypes.includes(item.file.type as typeof galleryConfig.upload.acceptedTypes[number])) {
        updateQueued(index, { status: 'error', error: 'Use a JPG, PNG, or WebP image no larger than 8 MB.' });
        continue;
      }
      updateQueued(index, { status: 'uploading', progress: 0 });
      try {
        await uploadOne(item, index);
        updateQueued(index, { status: 'done', progress: 100 });
        succeeded++;
      } catch (error) {
        updateQueued(index, { status: 'error', error: error instanceof Error ? error.message : 'Upload failed.' });
      }
    }
    try { await reloadImages(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not refresh gallery.'); }
    if (succeeded > 0) setMessage(`${succeeded} image${succeeded === 1 ? '' : 's'} uploaded.`);
    setBusy(false);
  }

  async function loadUploadedImages() {
    setUploadMode('library');
    setLoadingUploads(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/uploaded-images', { cache: 'no-store' });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not load uploaded images.');
      setAvailableUploads((body.images as UploadedImage[]).filter((image) => image.source === 'Home page' && !image.galleryImageId));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load uploaded images.');
    } finally {
      setLoadingUploads(false);
    }
  }

  async function addUploadedImage() {
    if (!selectedUpload || busy) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/gallery/reuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath: selectedUpload.imagePath, category, altText: reuseAlt }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not add this image to the gallery.');
      setImages((current) => [...current, { ...body.image, imageUrl: selectedUpload.imageUrl } as GalleryImageView]);
      setAvailableUploads((current) => current?.filter((image) => image.imagePath !== selectedUpload.imagePath) ?? null);
      setSelectedUpload(null);
      setReuseAlt('');
      setMessage('Image added to the gallery without uploading it again.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not add this image to the gallery.');
    } finally {
      setBusy(false);
    }
  }

  function startEdit(image: GalleryImageView) {
    setEditingId(image.id);
    setEditCategory(image.category);
    setEditAlt(image.alt_text ?? '');
    setMessage('');
  }

  async function saveEdit() {
    if (!editingId) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/gallery/${editingId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: editCategory, altText: editAlt }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not save changes.');
      await reloadImages();
      setEditingId(null);
      setMessage('Image updated.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save changes.'); }
    setBusy(false);
  }

  async function deleteImage(image: GalleryImageView) {
    if (!window.confirm(`Delete this ${getCategoryLabel(image.category)} image from the gallery?`)) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/gallery/${image.id}`, { method: 'DELETE' });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not delete image.');
      setImages((current) => current.filter((item) => item.id !== image.id));
      setMessage(body.warning || 'Image deleted.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not delete image.'); }
    setBusy(false);
  }

  async function moveImage(id: string, direction: -1 | 1) {
    const index = images.findIndex((image) => image.id === id);
    const destination = index + direction;
    if (index < 0 || destination < 0 || destination >= images.length) return;
    const reordered = [...images];
    [reordered[index], reordered[destination]] = [reordered[destination], reordered[index]];
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/gallery/reorder', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageIds: reordered.map((image) => image.id) }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not save image order.');
      setImages(reordered);
      setMessage('Image order saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save image order.'); }
    setBusy(false);
  }

  async function signOut() {
    setBusy(true);
    await createClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-10">
      <header className="mb-10 flex flex-col gap-5 border-b border-[#D9DEE2] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-[#19547E]">{galleryConfig.businessName}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">GALLERY MANAGER</h1>
          <p className="mt-2 text-sm text-slate-600">Add and manage the photographs displayed on your website.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/admin/home-images" className="flex min-h-11 items-center justify-center border border-[#C9D2D9] bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#123E61] hover:bg-slate-50">Home Images</Link>
          <button type="button" onClick={() => setUploadOpen((open) => !open)} className="min-h-11 bg-[#123E61] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0C2B44]">+ Add Photos</button>
          <button type="button" onClick={signOut} disabled={busy} className="min-h-11 border border-[#C9D2D9] bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-50">Sign Out</button>
        </div>
      </header>
      <CmsTour page="gallery" userId={userId} />

      {message && <p role="status" className="mb-6 border border-[#C9D2D9] bg-white px-4 py-3 text-sm">{message}</p>}

      {uploadOpen && <section className="mb-10 border border-[#D9DEE2] bg-white p-5 sm:p-7" aria-label="Add photos">
        <h2 className="mb-4 text-lg font-bold text-[#123E61]">Add photos to the gallery</h2>
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Choose image source">
          <button type="button" onClick={() => setUploadMode('file')} aria-pressed={uploadMode === 'file'} className={`min-h-11 border px-4 py-2 text-xs font-bold uppercase tracking-wider ${uploadMode === 'file' ? 'border-[#123E61] bg-[#123E61] text-white' : 'border-[#C9D2D9] text-[#123E61]'}`}>Upload new files</button>
          <button type="button" onClick={loadUploadedImages} disabled={loadingUploads} aria-pressed={uploadMode === 'library'} className={`min-h-11 border px-4 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50 ${uploadMode === 'library' ? 'border-[#123E61] bg-[#123E61] text-white' : 'border-[#C9D2D9] text-[#123E61]'}`}>Choose from uploaded images</button>
        </div>
        {uploadMode === 'file' ? <>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">Photos (up to 10, 8 MB each)
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={selectFiles} disabled={busy} className="peer sr-only" />
            <span className={`mt-2 inline-flex min-h-11 items-center border border-[#123E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#123E61] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#123E61] ${busy ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#E8EFF4]'}`}>Upload file</span>
            <span className="mt-2 block text-xs font-normal text-slate-600">{queued.length ? `${queued.length} ${queued.length === 1 ? 'file' : 'files'} selected` : 'No files selected'}</span>
          </label>
          <label className="block text-sm font-semibold">Category
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 min-h-11 w-full border border-[#C9D2D9] bg-white px-3">
              {galleryConfig.categories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
        {queued.length > 0 && <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {queued.map((item, index) => <div key={`${item.file.name}-${index}`} className="border border-[#D9DEE2] p-3">
            <div className="relative mb-3 aspect-[4/3] bg-[#F3F5F6]"><Image src={item.preview} alt="Selected photo preview" fill unoptimized className="object-contain" /></div>
            <p className="truncate text-xs font-semibold" title={item.file.name}>{item.file.name}</p>
            <label className="mt-2 block text-xs font-semibold">Alt text (optional)
              <input maxLength={300} value={item.altText} onChange={(event) => updateQueued(index, { altText: event.target.value })} className="mt-1 w-full border border-[#C9D2D9] px-2 py-2 text-sm" />
            </label>
            <p className="mt-2 text-xs text-slate-600">{item.status === 'uploading' ? `Uploading ${item.progress}%` : item.status === 'done' ? 'Uploaded' : item.status === 'error' ? item.error : 'Ready'}</p>
            <div className="mt-1 h-1.5 bg-[#E8EFF4]"><div className="h-full bg-[#19547E]" style={{ width: `${item.progress}%` }} /></div>
          </div>)}
        </div>}
        <button type="button" onClick={uploadFiles} disabled={busy || queued.length === 0} className="mt-6 min-h-11 w-full bg-[#123E61] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50 sm:w-auto">{busy ? 'Uploading…' : 'Upload Selected Photos'}</button>
        </> : <>
          <p className="mb-4 text-sm text-slate-600">Select a home-page image to add it to the gallery. The existing file will be reused.</p>
          {loadingUploads ? <p className="text-sm text-slate-600">Loading images…</p> : availableUploads?.length === 0 ? <p className="border border-dashed border-[#C9D2D9] p-5 text-sm text-slate-600">No home-page uploads are available to add. Images already in the gallery are omitted.</p> : <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {availableUploads?.map((image) => <button key={image.key} type="button" onClick={() => { setSelectedUpload(image); setReuseAlt(image.altText); }} disabled={busy} aria-pressed={selectedUpload?.imagePath === image.imagePath} className={`border p-2 text-left disabled:opacity-50 ${selectedUpload?.imagePath === image.imagePath ? 'border-[#123E61] bg-[#E8EFF4]' : 'border-[#D9DEE2] hover:border-[#123E61]'}`}>
              <span className="relative block aspect-[4/3]"><Image src={image.imageUrl} alt={image.altText || 'Uploaded home-page image'} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" /></span>
              <span className="mt-2 block truncate text-xs text-slate-700">{image.altText || 'Untitled image'}</span>
            </button>)}
          </div>}
          {selectedUpload && <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">Category
              <select value={category} onChange={(event) => setCategory(event.target.value)} disabled={busy} className="mt-2 min-h-11 w-full border border-[#C9D2D9] bg-white px-3">{galleryConfig.categories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            </label>
            <label className="block text-sm font-semibold">Alt text (optional)
              <input value={reuseAlt} onChange={(event) => setReuseAlt(event.target.value)} maxLength={300} disabled={busy} className="mt-2 min-h-11 w-full border border-[#C9D2D9] px-3 text-sm" />
            </label>
            <button type="button" onClick={addUploadedImage} disabled={busy} className="min-h-11 bg-[#123E61] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50 sm:col-span-2 sm:w-fit">{busy ? 'Adding…' : 'Add to Gallery'}</button>
          </div>}
        </>}
      </section>}

      <section aria-label="Gallery images">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#D9DEE2] pb-4">
          <h2 className="text-lg font-bold text-[#123E61]">Images <span className="ml-2 text-sm font-normal text-slate-600">{images.length} total</span></h2>
          <p className="text-xs text-slate-500">Select All Projects to change image order.</p>
        </div>
        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter images by category">
          {[{ value: 'all', filterLabel: 'All Projects' }, ...galleryConfig.categories].map((option) => <button key={option.value} type="button" onClick={() => setFilter(option.value)} aria-pressed={filter === option.value} className={`min-h-10 border px-3 py-2 text-xs font-semibold ${filter === option.value ? 'border-[#123E61] bg-[#123E61] text-white' : 'border-[#C9D2D9] bg-white text-[#30323A]'}`}>{option.filterLabel}</button>)}
        </div>
        {visibleImages.length === 0 ? <div className="border border-dashed border-[#C9D2D9] bg-white px-6 py-16 text-center text-sm text-slate-600">No images in this category yet. Upload photos to add them to the website.</div> :
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleImages.map((image) => {
              const order = images.findIndex((item) => item.id === image.id);
              return <article key={image.id} className="min-w-0 border border-[#D9DEE2] bg-white">
                <div className="relative aspect-[4/3] bg-[#F3F5F6]"><Image src={image.imageUrl} alt={image.alt_text || `${getCategoryLabel(image.category)} project`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div>
                <div className="space-y-3 p-4">
                  {editingId === image.id ? <>
                    <label className="block text-xs font-semibold">Category
                      <select value={editCategory} onChange={(event) => setEditCategory(event.target.value)} className="mt-1 min-h-10 w-full border border-[#C9D2D9] px-2 text-sm">{galleryConfig.categories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
                    </label>
                    <label className="block text-xs font-semibold">Alt text
                      <input value={editAlt} maxLength={300} onChange={(event) => setEditAlt(event.target.value)} className="mt-1 min-h-10 w-full border border-[#C9D2D9] px-2 text-sm" />
                    </label>
                    <div className="flex gap-2"><button type="button" disabled={busy} onClick={saveEdit} className="min-h-10 bg-[#123E61] px-4 text-xs font-bold text-white">Save</button><button type="button" onClick={() => setEditingId(null)} className="min-h-10 border border-[#C9D2D9] px-4 text-xs font-bold">Cancel</button></div>
                  </> : <>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#19547E]">{getCategoryLabel(image.category)}</p>
                    <p className="min-h-10 text-sm text-slate-700">{image.alt_text || 'No alt text added'}</p>
                    <div className="flex flex-wrap gap-2 border-t border-[#D9DEE2] pt-3">
                      <button type="button" disabled={busy} onClick={() => startEdit(image)} className="min-h-10 border border-[#C9D2D9] px-3 text-xs font-bold">Edit</button>
                      <button type="button" disabled={busy} onClick={() => deleteImage(image)} className="min-h-10 border border-red-200 px-3 text-xs font-bold text-red-700">Delete</button>
                      <button type="button" disabled={busy || filter !== 'all' || order === 0} onClick={() => moveImage(image.id, -1)} aria-label={`Move ${image.alt_text || getCategoryLabel(image.category)} up`} className="min-h-10 border border-[#C9D2D9] px-3 text-xs font-bold disabled:opacity-40">↑</button>
                      <button type="button" disabled={busy || filter !== 'all' || order === images.length - 1} onClick={() => moveImage(image.id, 1)} aria-label={`Move ${image.alt_text || getCategoryLabel(image.category)} down`} className="min-h-10 border border-[#C9D2D9] px-3 text-xs font-bold disabled:opacity-40">↓</button>
                    </div>
                  </>}
                </div>
              </article>;
            })}
          </div>}
      </section>
    </div>
  );
}
