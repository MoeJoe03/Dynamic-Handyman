'use client';

import React, { useEffect, useRef, useState } from 'react';
import { businessConfig } from '@/config/business';
import { servicesData } from '@/data/services';

export function QuoteForm({
  serviceArea = businessConfig.serviceAreaSummary,
  initialServiceId,
}: {
  serviceArea?: string;
  initialServiceId?: string;
}) {
  const initialServiceTitle = servicesData.find((service) => service.id === initialServiceId)?.title ?? '';
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceCategory: initialServiceTitle,
    projectDetails: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [website, setWebsite] = useState('');
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const focusErrorSummary = useRef(false);
  const sending = useRef(false);
  const submission = useRef<{ payload: string; id: string } | null>(null);

  useEffect(() => {
    if (focusErrorSummary.current && Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
      focusErrorSummary.current = false;
    }
  }, [errors]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending.current) return;
    focusErrorSummary.current = true;
    if (!validate()) return;

    sending.current = true;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const details = {
        ...formData,
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        emailAddress: formData.emailAddress.trim(),
        projectDetails: formData.projectDetails.trim(),
        website,
      };
      const payload = JSON.stringify(details);
      if (submission.current?.payload !== payload) {
        submission.current = { payload, id: crypto.randomUUID() };
      }
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, requestId: submission.current.id }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || 'Your request could not be sent. Please try again.');
      }
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your request could not be sent. Please try again or contact us by phone or WhatsApp.');
    } finally {
      sending.current = false;
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      serviceCategory: initialServiceTitle,
      projectDetails: '',
    });
    setErrors({});
    setSubmitError('');
    setWebsite('');
    submission.current = null;
    setIsSubmitted(false);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Hello Dynamic Handyman, my name is ${formData.fullName || 'Client'}. I would like to request an estimate for ${formData.serviceCategory || 'a service'}. Details: ${formData.projectDetails || 'Please contact me.'}`;
    return `${businessConfig.phone.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28" id="quoteFormContainer">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Info Column */}
        <div className="flex flex-col lg:col-span-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-3 font-mono">
            (DIRECT INQUIRY)
          </span>

          {/* Contact Data Strip */}
          <div className="order-1 space-y-6 border-t border-[#D9DEE2] pt-8 lg:order-3">
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#123E61] sm:text-2xl">
              Contact Details
            </h2>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Phone
              </span>
              <p className="text-base font-bold text-[#30323A] mt-1">
                <a href={businessConfig.phone.telHref}>{businessConfig.phone.display}</a>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Direct Email
              </span>
              <p className="text-base font-bold text-[#30323A] mt-1">
                <a href={businessConfig.email.href}>{businessConfig.email.address}</a>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Service Area
              </span>
              <p className="text-base font-bold text-[#30323A] mt-1">
                {serviceArea}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Address
              </span>
              <address className="mt-1 text-base font-bold not-italic leading-relaxed text-[#30323A]">
                {businessConfig.address.streetAddress}<br />
                {businessConfig.address.addressLocality}, {businessConfig.address.city}, {businessConfig.address.postalCode}
              </address>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Operating Hours
              </span>
              <p className="text-sm font-bold text-[#30323A] mt-1">
                {businessConfig.operatingHours.map(({ label, display }) => (
                  <React.Fragment key={label}>{label}: {display}<br /></React.Fragment>
                ))}
              </p>
            </div>
          </div>

          {/* Instant WhatsApp CTA */}
          <div className="order-2 mt-8 lg:order-4 lg:mt-8">
            <a
              href={businessConfig.phone.whatsappUrl}
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

          <h2 className="order-3 mt-10 text-2xl font-extrabold uppercase tracking-tight text-[#30323A] sm:text-3xl lg:order-1 lg:mt-0 lg:mb-6 lg:text-4xl">
            Request a Handyman or Renovation Quote
          </h2>

          <p className="order-4 mt-4 text-sm leading-relaxed text-slate-600 lg:order-2 lg:mt-0 lg:mb-10">
            Reach out by phone, email or the quote request form. Our team will review your request and contact you shortly. We usually respond during business hours. If your request is urgent, call or WhatsApp us directly.
          </p>

        </div>

        {/* Right Form Column - Balanced Height & Architectural Presence */}
        <div className="lg:col-span-7 bg-[#123E61] text-white p-7 sm:p-10 lg:p-14 min-h-[640px] lg:min-h-[710px] flex flex-col justify-between border border-[#0C2B44] shadow-2xl">
          {!isSubmitted ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase text-white tracking-tight mb-2.5">
                  Quote Request Form
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mb-7 font-normal leading-relaxed">
                  Please provide your contact and service requirements. All estimates are free of obligation.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {Object.keys(errors).length > 0 && (
                    <div
                      ref={errorSummaryRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      className="border border-rose-300 bg-rose-950/40 p-4 text-sm text-rose-100 focus:outline-2 focus:outline-offset-2 focus:outline-rose-300"
                    >
                      <p className="font-bold">Please correct the following fields:</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        {Object.entries(errors).map(([field, message]) => (
                          <li key={field}>
                            <a className="underline underline-offset-2" href={`#${field}`}>
                              {message}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="quoteWebsite">Leave this field empty</label>
                    <input id="quoteWebsite" name="website" autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                  <fieldset disabled={isSubmitting} className="min-w-0 space-y-6">
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
                      aria-required="true"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      maxLength={120}
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
                      <p id="fullName-error" className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.fullName}</p>
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
                        aria-required="true"
                        aria-invalid={Boolean(errors.phoneNumber)}
                        aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
                        maxLength={18}
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
                        <p id="phoneNumber-error" className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.phoneNumber}</p>
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
                        aria-required="false"
                        aria-invalid={Boolean(errors.emailAddress)}
                        aria-describedby={errors.emailAddress ? 'emailAddress-error' : undefined}
                        maxLength={254}
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
                        <p id="emailAddress-error" className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.emailAddress}</p>
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
                      aria-required="true"
                      aria-invalid={Boolean(errors.serviceCategory)}
                      aria-describedby={errors.serviceCategory ? 'serviceCategory-error' : undefined}
                      value={formData.serviceCategory}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceCategory: e.target.value });
                        if (errors.serviceCategory) setErrors({ ...errors, serviceCategory: '' });
                      }}
                      className={`w-full bg-white text-[#30323A] border ${
                        errors.serviceCategory ? 'border-red-400 ring-2 ring-red-400' : 'border-[#D9DEE2]'
                      } px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors shadow-inner`}
                    >
                      <option value="">Select a service</option>
                      {servicesData.map((service) => (
                        <option key={service.id} value={service.title}>{service.title}</option>
                      ))}
                      <option value="Multiple Combined Trades">Multiple Combined Trades</option>
                    </select>
                    {errors.serviceCategory && (
                      <p id="serviceCategory-error" className="text-rose-300 text-[11px] mt-1 font-semibold">{errors.serviceCategory}</p>
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
                      maxLength={5000}
                      rows={5}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Describe current issues, approximate dimensions, materials, or special access requirements..."
                      className="w-full bg-white text-[#30323A] border border-[#D9DEE2] px-4.5 py-3.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-white outline-none transition-colors resize-y min-h-[130px] shadow-inner"
                    />
                  </div>

                  <p className="text-xs leading-relaxed text-slate-200">
                    We’ll use your contact details only to respond to your quote request and discuss your project.
                  </p>

                  {/* Submit Button & WhatsApp Quick Link */}
                  {submitError && <p role="alert" className="text-sm text-rose-200">{submitError}</p>}
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
                  </fieldset>
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
                QUOTE REQUEST RECEIVED
              </span>

              <div role="status" aria-live="polite" aria-atomic="true" className="mb-3">
                <p className="text-2xl font-extrabold uppercase text-[#30323A]">
                  Your quote request has been received
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Our team will review your request for <strong className="text-[#123E61]">{formData.serviceCategory}</strong> and contact you shortly at{' '}
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
