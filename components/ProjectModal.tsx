'use client';

import React from 'react';
import Image from 'next/image';
import { ProjectItem } from '../data/projects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[#D9DEE2] max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9DEE2] bg-neutral-50">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#123E61] block">
              DYNAMIC HANDYMAN // CASE STUDY
            </span>
            <h3 id="modal-title" className="text-base sm:text-lg font-extrabold uppercase text-[#30323A]">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 text-[#30323A] flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Image */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900 border border-[#D9DEE2]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#123E61]/90 backdrop-blur-md text-white text-[10px] font-mono font-semibold px-3 py-1 rounded">
              {project.location}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold uppercase text-[#30323A] mb-2">
              {project.subtitle}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Scope of Work */}
          <div className="bg-neutral-50 p-5 rounded-xl border border-[#D9DEE2]">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#123E61] mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#123E61]" />
              <span>Scope of Work Completed</span>
            </h5>
            <ul className="space-y-2">
              {project.scope.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-[#123E61] font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Modal Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-500 font-mono">
              Certified Multi-Trade Workmanship • Johannesburg
            </span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-[#D9DEE2] text-xs font-bold uppercase tracking-wider text-[#30323A] hover:bg-neutral-50 rounded"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                Inquire About This Service →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
