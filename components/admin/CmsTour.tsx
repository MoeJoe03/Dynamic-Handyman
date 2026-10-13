'use client';

import { useRef, useState, useSyncExternalStore } from 'react';

const subscribeToStorage = (notify: () => void) => {
  window.addEventListener('storage', notify);
  return () => window.removeEventListener('storage', notify);
};

type TourPage = 'gallery' | 'home-images';
const tours: Record<TourPage, { title: string; description: string; tip: string }[]> = {
  gallery: [
    { title: 'Welcome to Gallery Manager', description: 'This is where you manage the project photos shown on the Gallery page. Home Images manages the photos used elsewhere on your homepage.', tip: 'You can replay this guide at any time using Take a Tour.' },
    { title: 'Add your project photos', description: 'Select + Add Photos, then Upload new files. Choose up to 10 JPG, PNG or WebP photos, with a maximum size of 8 MB each. Select the service category and press Upload Selected Photos.', tip: 'Selecting a file prepares it for upload. Upload Selected Photos publishes it to the gallery.' },
    { title: 'Reuse an uploaded image', description: 'Under + Add Photos, choose Choose from uploaded images to reuse a photo already uploaded through Home Images. Select the photo, choose its category and press Add to Gallery.', tip: 'Reusing a photo avoids uploading the same file twice.' },
    { title: 'Describe and organise your photos', description: 'Use Edit on a photo to change its category or alt text, then save the edit. Alt text should describe what the photo shows. Select All Projects to enable the up and down arrows that change image order.', tip: 'For example: “New kitchen cupboards with white doors and timber worktop.”' },
    { title: 'Check your work', description: 'Open the public Gallery page to check your saved photos. Use Home Images when you want to place an uploaded photo on the homepage. Delete removes a photo from the gallery, so read the confirmation before continuing.', tip: 'Gallery actions save as you upload, add, edit or reorder. Home Images also has a Save All button.' },
  ],
  'home-images': [
    { title: 'Welcome to Home Images', description: 'Each card represents a photo position on your homepage. The cards are grouped by section and service so you can find the image you want to replace.', tip: 'You can replay this guide at any time using Take a Tour.' },
    { title: 'Choose the right position', description: 'Find the section or service you want to update. Service carousel cards are grouped together, and each photo position is labelled. Optional review photos appear on the site after you save them.', tip: 'Use photos that match the service or project shown in that section.' },
    { title: 'Upload or reuse a photo', description: 'Use Upload file to select a new photo, or Choose from Uploaded Images to use an existing gallery or homepage upload. Selecting a photo changes the preview; save it to apply the change.', tip: 'The same uploaded image can be used in more than one position without uploading it again.' },
    { title: 'Add useful alt text', description: 'Write a short description of what is visible in the photo. This helps people using screen readers and gives search engines context. You can edit alt text without replacing the photo.', tip: 'Describe the actual image, rather than listing services or repeating location keywords.' },
    { title: 'Save and preview', description: 'Save an individual card or use Save All to save every changed card on this page. The unsaved-changes indicator tells you what still needs saving. Check for any error messages, then open the homepage to review the result.', tip: 'Always save before leaving the page. Public images may take about a minute to refresh.' },
  ],
};

export function CmsTour({ page, userId }: { page: TourPage; userId: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [step, setStep] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const storageKey = `dynamic-handyman:cms-tour:v1:${userId}:${page}`;
  const steps = tours[page];
  const current = steps[step];

  const firstVisit = useSyncExternalStore(subscribeToStorage, () => {
    try { return localStorage.getItem(storageKey) !== 'seen'; }
    catch { return true; }
  }, () => false);
  const welcome = firstVisit && !dismissed;

  function remember() {
    setDismissed(true);
    try { localStorage.setItem(storageKey, 'seen'); } catch { /* Guide still works when storage is unavailable. */ }
  }

  function start() {
    setStep(0);
    dialog.current?.showModal();
  }

  function finish() {
    remember();
    dialog.current?.close();
  }

  return (
    <section aria-label="CMS help" className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#C9D2D9] bg-white p-4">
      <div>
        <p className="text-sm font-bold text-[#123E61]">{welcome ? 'New here? Get to know your CMS.' : 'Need a quick refresher?'}</p>
        {welcome && <p className="mt-1 text-sm text-slate-600">A short guide to choosing photos, editing details and saving your work.</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        <button ref={launcher} type="button" onClick={start} className="min-h-11 rounded border border-[#123E61] px-4 py-2 text-sm font-bold text-[#123E61] hover:bg-[#E8EFF4] focus-visible:outline-2 focus-visible:outline-offset-2">Take a Tour</button>
        {welcome && <button type="button" onClick={remember} className="min-h-11 px-3 text-sm text-slate-600 underline underline-offset-4">Maybe later</button>}
      </div>
      <dialog ref={dialog} aria-labelledby={`cms-tour-title-${page}`} aria-describedby={`cms-tour-description-${page}`} onClose={() => launcher.current?.focus()} className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-xl border-0 bg-white p-6 text-[#30323A] shadow-xl backdrop:bg-[#082c4c]/70 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#19547E]">CMS Tour · {step + 1} of {steps.length}</p>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close tour" className="flex min-h-11 min-w-11 items-center justify-center rounded text-2xl text-[#123E61] hover:bg-slate-100">×</button>
        </div>
        <div aria-live="polite" aria-atomic="true">
          <h2 id={`cms-tour-title-${page}`} className="text-2xl font-extrabold text-[#123E61]">{current.title}</h2>
          <p id={`cms-tour-description-${page}`} className="mt-4 text-sm leading-7 text-slate-700">{current.description}</p>
          <p className="mt-5 rounded-lg bg-[#E8EFF4] p-4 text-sm leading-6 text-[#123E61]">{current.tip}</p>
        </div>
        <div className="mt-7 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setStep((value) => value - 1)} disabled={step === 0} className="min-h-11 rounded border border-[#C9D2D9] px-5 py-2 text-sm font-bold text-[#123E61] disabled:opacity-40">Back</button>
          <button type="button" onClick={step === steps.length - 1 ? finish : () => setStep((value) => value + 1)} className="min-h-11 rounded bg-[#123E61] px-5 py-2 text-sm font-bold text-white hover:bg-[#0C2B44]">{step === steps.length - 1 ? 'Finish Tour' : 'Next'}</button>
        </div>
      </dialog>
    </section>
  );
}
