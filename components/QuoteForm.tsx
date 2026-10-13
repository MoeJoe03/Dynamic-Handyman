'use client';

import React, { useState } from 'react';
import { contactPhone } from '@/config/contact';
import { servicesData } from '@/data/services';

export function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceCategory: servicesData[0].title,
    projectDetails: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }

    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Please enter a contact telephone number';
    } else if (!/^[\d\s+\-()]{7,18}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = 'Please enter a valid phone number';
    }

    if (formData.emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address';
    }

    if (!formData.serviceCategory) {
      errs.serviceCategory = 'Please select a primary service';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      serviceCategory: servicesData[0].title,
      projectDetails: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Hello Dynamic Handyman, my name is ${formData.fullName || 'Client'}. I would like to request an estimate for ${formData.serviceCategory}. Details: ${formData.projectDetails || 'Please contact me.'}`;
    return `${contactPhone.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28" id="quoteFormContainer">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-3 font-mono">
            (04 — DIRECT INQUIRY)
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#30323A] mb-6">
            Request a Handyman or Renovation Quote
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-10">
            Reach out via phone, email, or complete the quote requisition form. We respond promptly with actionable site visits or estimates.
          </p>

          {/* Contact Data Strip */}
          <div className="space-y-6 border-t border-[#D9DEE2] pt-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Telephone
              </span>
              <p className="text-base font-bold text-[#30323A] mt-1">
                <a href={contactPhone.telHref}>{contactPhone.display}</a>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Direct Email
              </span>
              <p className="text-base font-bold text-[#30323A] mt-1">
                info@dynamichandyman.co.za
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Service Area
              </span>
              <p className="text-base font-bold text-[#30323A] mt-1">
                Alberton and selected surrounding areas of Johannesburg
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Operating Hours
              </span>
              <p className="text-sm font-bold text-[#30323A] mt-1">
                Mon – Fri: 07:30 – 17:00 <br />
                <span className="font-normal text-slate-500">Sat: By Appointment | Sun: Closed</span>
              </p>
            </div>
          </div>

          {/* Instant WhatsApp CTA */}
          <div className="mt-10">
            <a
              href={contactPhone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Form Column - Balanced Height & Architectural Presence */}
        <div className="lg:col-span-7 bg-[#123E61] text-white p-7 sm:p-10 lg:p-14 min-h-[640px] lg:min-h-[710px] flex flex-col justify-between border border-[#0C2B44] shadow-2xl">
          {!isSubmitted ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase text-white tracking-tight mb-2.5">
                  Request A Project Estimate
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mb-7 font-normal leading-relaxed">
                  Please provide your contact and service requirements. All estimates are free of obligation.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* 1. Name at the top */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. David Miller"
                      className={`w-full bg-white text-[#30323A] border ${
                        errors.fullName ? 'border-red-400 ring-2 ring-red-400' : 'border-[#D9DEE2]'
                      } px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors shadow-inner`}
                    />
                    {errors.fullName && (
                      <p className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.fullName}</p>
                    )}
                  </div>

                  {/* 2. Phone number and email next to each other */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, phoneNumber: e.target.value });
                          if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                        }}
                        placeholder="e.g. 082 123 4567"
                        className={`w-full bg-white text-[#30323A] border ${
                          errors.phoneNumber ? 'border-red-400 ring-2 ring-red-400' : 'border-[#D9DEE2]'
                        } px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors shadow-inner`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.phoneNumber}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="emailAddress"
                        className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-2"
                      >
                        Email Address (optional)
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        value={formData.emailAddress}
                        onChange={(e) => {
                          setFormData({ ...formData, emailAddress: e.target.value });
                          if (errors.emailAddress) setErrors({ ...errors, emailAddress: '' });
                        }}
                        placeholder="name@domain.com"
                        className={`w-full bg-white text-[#30323A] border ${
                          errors.emailAddress ? 'border-red-400 ring-2 ring-red-400' : 'border-[#D9DEE2]'
                        } px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors shadow-inner`}
                      />
                      {errors.emailAddress && (
                        <p className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.emailAddress}</p>
                      )}
                    </div>
                  </div>

                  {/* 3. Service */}
                  <div>
                    <label
                      htmlFor="serviceCategory"
                      className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Primary Trade / Service *
                    </label>
                    <select
                      id="serviceCategory"
                      value={formData.serviceCategory}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceCategory: e.target.value });
                        if (errors.serviceCategory) setErrors({ ...errors, serviceCategory: '' });
                      }}
                      className={`w-full bg-white text-[#30323A] border ${
                        errors.serviceCategory ? 'border-red-400 ring-2 ring-red-400' : 'border-[#D9DEE2]'
                      } px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors shadow-inner`}
                    >
                      {servicesData.map((service) => (
                        <option key={service.id} value={service.title}>{service.title}</option>
                      ))}
                      <option value="Multiple Combined Trades">Multiple Combined Trades</option>
                    </select>
                    {errors.serviceCategory && (
                      <p className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.serviceCategory}</p>
                    )}
                  </div>

                  {/* 4. Project Scope with Refined Height */}
                  <div>
                    <label
                      htmlFor="projectDetails"
                      className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Project Scope &amp; Specifications
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={5}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Describe current issues, approximate dimensions, materials, or special access requirements..."
                      className="w-full bg-white text-[#30323A] border border-[#D9DEE2] px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors resize-y min-h-[130px] shadow-inner"
                    />
                  </div>

                  {/* Submit Button & WhatsApp Quick Link */}
                  <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-9 py-3.5 sm:py-4 bg-white hover:bg-neutral-100 text-[#123E61] text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-md cursor-pointer border border-transparent active:translate-y-px disabled:opacity-70"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Submit Quote Request →'}
                    </button>

                    <a
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 text-xs font-bold text-sky-200 hover:text-white uppercase tracking-wider transition-colors py-2"
                    >
                      <span>Or Inquire Via WhatsApp</span>
                      <span>→</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Submission Confirmation Screen */
            <div className="bg-white text-[#30323A] p-8 sm:p-10 border border-[#0C2B44] shadow-md animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold mb-6">
                ✓
              </div>

              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-700 block mb-1">
                REQUISITION CONFIRMED
              </span>

              <h4 className="text-2xl font-extrabold uppercase text-[#30323A] mb-3">
                Thank You, {formData.fullName}.
              </h4>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Your request for <strong className="text-[#123E61]">{formData.serviceCategory}</strong> has been received. Our team will review your specifications and contact you shortly at{' '}
                <strong className="text-[#123E61]">{formData.phoneNumber}</strong>.
              </p>

              <div className="bg-[#F8F9F9] p-4 border border-[#D9DEE2] text-xs font-mono space-y-2 mb-6">
                <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                  <span className="text-slate-500 uppercase">Contact Phone</span>
                  <span className="font-bold text-[#30323A]">{formData.phoneNumber}</span>
                </div>
                {formData.emailAddress.trim() && (
                  <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                    <span className="text-slate-500 uppercase">Email</span>
                    <span className="font-bold text-[#30323A]">{formData.emailAddress}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                  <span className="text-slate-500 uppercase">Service Division</span>
                  <span className="font-bold text-[#123E61]">{formData.serviceCategory}</span>
                </div>
                {formData.projectDetails && (
                  <div className="pt-1">
                    <span className="text-slate-500 uppercase block mb-1">Project Notes</span>
                    <p className="text-slate-700 italic font-sans">{formData.projectDetails}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center space-x-2"
                >
                  <span>Forward Details to WhatsApp</span>
                  <span>→</span>
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-[#D9DEE2] hover:bg-neutral-100 text-[#30323A] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
