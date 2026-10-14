import React from 'react';
import Image from 'next/image';
import { businessConfig } from '@/config/business';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  // Real high-resolution Dynamic Handyman logo asset with "D" monogram, house roof, wrench and brand text
  const logoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCKkZ_INuTkuoMKtJU54inW3RnBE6dbNExV82R9qL1JHyyv4dfaamB2UkW4p-1xAnF1WMyQvVn07q_yDfbz-cWyydE3QDD8Wn-j_TukWRpJ2_MnWI6ttR7qspK_ayRrwbQZ7snrEB6ouS5u2gQC0zIoC9zIbuhi4fVSge9vx-KVVQpGFNDis0NOm6vmFmCneDdB7DXFxFTpKGo6fNotG4Iadbx310P2wU1BPE2R5-mLpvnWIry6L-lD96iiOLOAiNbALQ8";

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
        width={220}
        height={65}
        className="h-12 sm:h-16 md:h-18 w-auto object-contain transition-opacity duration-200 hover:opacity-95"
        priority
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
