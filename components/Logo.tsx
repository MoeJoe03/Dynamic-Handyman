import React from 'react';
import Image from 'next/image';
import { businessConfig } from '@/config/business';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  const logoUrl = '/images/dynamic-handyman-logo.png';

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className="bg-white px-3 py-2 rounded-sm border border-slate-200/40 inline-block shadow-sm">
          <Image
            src={logoUrl}
            alt={`${businessConfig.legalName} logo`}
            width={180}
            height={54}
            className="h-10 sm:h-11 w-auto object-contain"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src={logoUrl}
        alt={`${businessConfig.legalName} logo`}
        width={200}
        height={59}
        className="h-10 sm:h-14 md:h-16 w-auto object-contain transition-opacity duration-200 hover:opacity-95"
        priority
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
