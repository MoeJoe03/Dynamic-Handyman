import Link from 'next/link';

const pageLabels = {
  services: 'Services',
  gallery: 'Our Work',
  about: 'About',
  contact: 'Contact',
} as const;

type BreadcrumbPage = keyof typeof pageLabels;

export function BreadcrumbNav({ currentPage }: { currentPage: BreadcrumbPage }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300 sm:text-[11px]">
        <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
        <li aria-hidden="true" className="text-sky-300">/</li>
        <li aria-current="page" className="text-white">{pageLabels[currentPage]}</li>
      </ol>
    </nav>
  );
}
