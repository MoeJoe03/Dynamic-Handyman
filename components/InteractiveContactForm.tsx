'use client';

import React, { useState } from 'react';
import { contactPhone } from '@/config/contact';
import { servicesData } from '@/data/services';

interface TradeOption {
  id: string;
  name: string;
  code: string;
  icon: string;
}

const tradeIcons: Record<string, string> = {
  electrical: '⚡', painting: '🎨', carpentry: '🪵', plumbing: '🔧',
  palisades: '🚗', paving: '🧱', maintenance: '🏗️', 'glass-works': '🪟',
  flooring: '◩', 'gutters-fascia': '🏠', 'aluminium-windows-doors': '🚪',
};

const tradeOptions: TradeOption[] = [
  ...servicesData.map((service) => ({
    id: service.id,
    name: service.title,
    code: service.ref,
    icon: tradeIcons[service.id] ?? '🛠️',
  })),
  { id: 'multiple', name: 'Multiple Combined Trades', code: 'COMB', icon: '🛠️' },
];

const propertyTypes = [
  { id: 'domestic', label: 'Residential Home' },
  { id: 'corporate', label: 'Commercial / Office' },
  { id: 'sectional', label: 'Sectional Title / Body Corporate' },
  { id: 'industrial', label: 'Industrial / Warehouse' },
];

const urgencyLevels = [
  { id: 'urgent', label: 'Urgent / Same-Day Fault', badge: 'High Priority' },
  { id: 'week', label: 'Within 3 - 5 Days', badge: 'Standard' },
  { id: 'planning', label: 'Planning / Estimating', badge: 'Flexible' },
];

export function InteractiveContactForm() {
  const [selectedTrade, setSelectedTrade] = useState<string>('electrical');
  const [propertyType, setPropertyType] = useState<string>('domestic');
  const [urgency, setUrgency] = useState<string>('week');
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp');

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    suburb: '',
    description: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeTrade = tradeOptions.find((t) => t.id === selectedTrade) || tradeOptions[0];
  const activeProperty = propertyTypes.find((p) => p.id === propertyType) || propertyTypes[0];
  const activeUrgency = urgencyLevels.find((u) => u.id === urgency) || urgencyLevels[0];

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your name';
    }

    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Contact phone number is required';
    } else if (!/^[\d\s+\-()]{7,18}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = 'Please enter a valid telephone number';
    }

    if (contactMethod === 'email' && !formData.emailAddress.trim()) {
      errs.emailAddress = 'Enter an email address for an email response';
    } else if (formData.emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address';
    }

    if (!formData.suburb.trim()) {
      errs.suburb = 'Please provide your suburb or property location';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const getWhatsAppPrefillUrl = () => {
    const text = `Hello Dynamic Handyman, I'd like to request an estimate:
• Name: ${formData.fullName || 'Client'}
• Trade: ${activeTrade.name}
• Property: ${activeProperty.label}
• Urgency: ${activeUrgency.label}
• Location: ${formData.suburb || 'Johannesburg'}
• Notes: ${formData.description || 'Please call back'}`;
    return `${contactPhone.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      suburb: '',
      description: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#F8F9F9] border border-[#D9DEE2] shadow-sm">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-12 space-y-10" noValidate>
          {/* STEP 1: INTERACTIVE TRADE SELECTOR */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#123E61] flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#123E61] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Required Trade Division</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                ACTIVE: [{activeTrade.code}]
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {tradeOptions.map((trade) => {
                const isSelected = selectedTrade === trade.id;
                return (
                  <button
                    key={trade.id}
                    type="button"
                    onClick={() => setSelectedTrade(trade.id)}
                    className={`p-3 text-left border transition-all cursor-pointer flex items-center space-x-2.5 ${
                      isSelected
                        ? 'bg-[#123E61] text-white border-[#123E61] shadow-sm'
                        : 'bg-white hover:bg-neutral-50 text-[#30323A] border-[#D9DEE2]'
                    }`}
                  >
                    <span className="text-base shrink-0">{trade.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-tight">
                      {trade.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: PROPERTY & URGENCY BUTTON CLUSTERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#D9DEE2] pt-8">
            {/* Property Type */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#123E61] flex items-center space-x-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#123E61] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Property Specification</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {propertyTypes.map((prop) => {
                  const isSelected = propertyType === prop.id;
                  return (
                    <button
                      key={prop.id}
                      type="button"
                      onClick={() => setPropertyType(prop.id)}
                      className={`px-3 py-2.5 text-left border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#123E61] text-white border-[#123E61]'
                          : 'bg-white text-slate-700 hover:bg-neutral-50 border-[#D9DEE2]'
                      }`}
                    >
                      {prop.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#123E61] flex items-center space-x-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#123E61] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Job Urgency &amp; SLA</span>
              </span>
              <div className="space-y-2">
                {urgencyLevels.map((urg) => {
                  const isSelected = urgency === urg.id;
                  return (
                    <button
                      key={urg.id}
                      type="button"
                      onClick={() => setUrgency(urg.id)}
                      className={`w-full px-3.5 py-2 text-left border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#123E61] text-white border-[#123E61]'
                          : 'bg-white text-slate-700 hover:bg-neutral-50 border-[#D9DEE2]'
                      }`}
                    >
                      <span>{urg.label}</span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 ${
                        isSelected ? 'bg-sky-500/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {urg.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 3: CONTACT INFORMATION INPUTS */}
          <div className="border-t border-[#D9DEE2] pt-8 space-y-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#123E61] flex items-center space-x-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#123E61] text-white flex items-center justify-center text-[10px]">4</span>
              <span>Contact &amp; Location Details</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="interactiveName" className="block text-[11px] font-bold uppercase tracking-wider text-[#30323A] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="interactiveName"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="e.g. David Miller"
                  className={`w-full bg-white border ${
                    errors.fullName ? 'border-red-500' : 'border-[#D9DEE2]'
                  } px-4 py-3 text-sm focus:ring-1 focus:ring-[#123E61] focus:border-[#123E61] outline-none transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="interactivePhone" className="block text-[11px] font-bold uppercase tracking-wider text-[#30323A] mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="interactivePhone"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, phoneNumber: e.target.value });
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                  }}
                  placeholder="e.g. 082 123 4567"
                  className={`w-full bg-white border ${
                    errors.phoneNumber ? 'border-red-500' : 'border-[#D9DEE2]'
                  } px-4 py-3 text-sm focus:ring-1 focus:ring-[#123E61] focus:border-[#123E61] outline-none transition-colors`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label htmlFor="interactiveEmail" className="block text-[11px] font-bold uppercase tracking-wider text-[#30323A] mb-1.5">
                  Email Address {contactMethod === 'email' ? '(required for email response)' : '(optional)'}
                </label>
                <input
                  type="email"
                  id="interactiveEmail"
                  value={formData.emailAddress}
                  onChange={(e) => {
                    setFormData({ ...formData, emailAddress: e.target.value });
                    if (errors.emailAddress) setErrors({ ...errors, emailAddress: '' });
                  }}
                  placeholder="name@domain.com"
                  className={`w-full bg-white border ${
                    errors.emailAddress ? 'border-red-500' : 'border-[#D9DEE2]'
                  } px-4 py-3 text-sm focus:ring-1 focus:ring-[#123E61] focus:border-[#123E61] outline-none transition-colors`}
                />
                {errors.emailAddress && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.emailAddress}</p>
                )}
              </div>

              {/* Suburb */}
              <div>
                <label htmlFor="interactiveSuburb" className="block text-[11px] font-bold uppercase tracking-wider text-[#30323A] mb-1.5">
                  Project Location / Suburb *
                </label>
                <input
                  type="text"
                  id="interactiveSuburb"
                  value={formData.suburb}
                  onChange={(e) => {
                    setFormData({ ...formData, suburb: e.target.value });
                    if (errors.suburb) setErrors({ ...errors, suburb: '' });
                  }}
                  placeholder="e.g. Alberton, Bryanston, Sandton"
                  className={`w-full bg-white border ${
                    errors.suburb ? 'border-red-500' : 'border-[#D9DEE2]'
                  } px-4 py-3 text-sm focus:ring-1 focus:ring-[#123E61] focus:border-[#123E61] outline-none transition-colors`}
                />
                {errors.suburb && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.suburb}</p>
                )}
              </div>
            </div>

            {/* Scope Notes */}
            <div>
              <label htmlFor="interactiveNotes" className="block text-[11px] font-bold uppercase tracking-wider text-[#30323A] mb-1.5">
                Brief Job Description / Notes
              </label>
              <textarea
                id="interactiveNotes"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe current issues, rough dimensions, materials, or site access..."
                className="w-full bg-white border border-[#D9DEE2] px-4 py-3 text-sm focus:ring-1 focus:ring-[#123E61] focus:border-[#123E61] outline-none transition-colors resize-y"
              />
            </div>

            {/* Preferred Response Method */}
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#30323A] mb-2">
                Preferred Callback Method
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'whatsapp', label: '💬 WhatsApp Message' },
                  { id: 'phone', label: '📞 Direct Telephone Call' },
                  { id: 'email', label: '✉️ Formal Email Estimate' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setContactMethod(item.id as typeof contactMethod)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition-colors cursor-pointer ${
                      contactMethod === item.id
                        ? 'bg-[#123E61] text-white border-[#123E61]'
                        : 'bg-white text-slate-700 hover:bg-neutral-50 border-[#D9DEE2]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* REAL-TIME SCOPE SUMMARY BANNER */}
          <div className="bg-[#123E61] text-white p-5 rounded-xs space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-slate-300 uppercase">Configured Trade:</span>
              <span className="font-bold text-sky-200">{activeTrade.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-slate-300 uppercase">Property &amp; Urgency:</span>
              <span className="text-white">{activeProperty.label} ({activeUrgency.badge})</span>
            </div>
            <div className="flex justify-between items-center pt-1 text-[11px]">
              <span className="text-slate-300 uppercase">Assessment Commitment:</span>
              <span className="text-emerald-400 font-bold">Free Written Estimate &amp; Zero Hidden Fees</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? 'Transmitting Requisition...' : 'Submit Estimate Requisition →'}
            </button>
            <a
              href={contactPhone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 border border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs font-bold tracking-widest uppercase transition-colors inline-flex items-center space-x-2"
            >
              <span>Instant WhatsApp Inquiry</span>
              <span>→</span>
            </a>
          </div>
        </form>
      ) : (
        /* CONFIRMATION STATE */
        <div className="p-8 sm:p-12 space-y-6 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-700 block mb-1">
              REQUISITION SUCCESSFULLY LOGGED
            </span>
            <h4 className="text-2xl font-extrabold uppercase text-[#30323A]">
              Thank You, {formData.fullName}.
            </h4>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Your requisition for <strong className="text-[#123E61]">{activeTrade.name}</strong> at your{' '}
              <strong className="text-[#123E61]">{activeProperty.label}</strong> in{' '}
              <strong className="text-[#123E61]">{formData.suburb}</strong> has been prioritized. Our dispatch manager will contact you via {contactMethod.toUpperCase()}.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-white p-5 border border-[#D9DEE2] text-xs space-y-2 font-mono">
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="text-slate-500 uppercase">Contact Phone</span>
              <span className="font-bold text-[#30323A]">{formData.phoneNumber}</span>
            </div>
            {formData.emailAddress.trim() && (
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-slate-500 uppercase">Email</span>
                <span className="font-bold text-[#30323A]">{formData.emailAddress}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="text-slate-500 uppercase">Urgency</span>
              <span className="font-bold text-[#123E61]">{activeUrgency.label}</span>
            </div>
            {formData.description && (
              <div className="pt-1">
                <span className="text-slate-500 uppercase block mb-1">Notes</span>
                <p className="text-slate-700 italic font-sans">{formData.description}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={getWhatsAppPrefillUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              <span>Forward To WhatsApp Now</span>
              <span>→</span>
            </a>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-[#D9DEE2] hover:bg-neutral-100 text-[#30323A] text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Configure Another Requisition
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
