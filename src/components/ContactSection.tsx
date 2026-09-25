import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Compass, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Information */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
              Connect & Inquire
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Join the Expedition
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Have questions about marine species data, educational partnerships, or ocean conservation initiatives? Send a message to our marine storytelling team.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#04162e]/60 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Direct Inquiries</div>
                <div className="text-sm font-semibold text-slate-100">contact@exploredeepsea.ocean</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#04162e]/60 border border-slate-800">
              <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Academic Affiliation</div>
                <div className="text-sm font-semibold text-slate-100">Global Marine Biodiversity Institute</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-6 rounded-3xl ocean-card-glass border border-cyan-500/25 p-6 sm:p-8 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Message Dispatched
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you, {formData.name}! Our marine science curators will review your dispatch and respond shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Sylvia Earle"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#041427] border border-slate-700/80 focus:border-cyan-400 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="ocean.explorer@institution.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#041427] border border-slate-700/80 focus:border-cyan-400 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subject Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#041427] border border-slate-700/80 focus:border-cyan-400 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Species Taxonomy Feedback">Species Taxonomy Feedback</option>
                  <option value="Educational Workshop">Educational Workshop Request</option>
                  <option value="Ocean Conservation Partnership">Ocean Conservation Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message or Question
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your interest in deep sea exploration or suggested species..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#041427] border border-slate-700/80 focus:border-cyan-400 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-[0.99] transition-all"
              >
                <span>Dispatch Message</span>
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
