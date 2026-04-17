/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Send, MessageSquare, HelpCircle, Sparkles, BarChart2, Shield } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Feedback', message: '' });
    }, 1500);
  };

  if (submitted) {
    return (
      <section className="panel h-full flex flex-col items-center justify-center text-center space-y-12">
        <div className="w-24 h-24 border border-accent bg-accent/5 flex items-center justify-center text-accent">
          <Sparkles className="w-12 h-12 stroke-1" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text-main uppercase tracking-tighter">Transmission Received.</h2>
          <p className="text-text-body max-w-md mx-auto font-sans leading-relaxed">
            Data integrity verified. I've received your inquiry and will recalculate my trajectory to respond as soon as possible.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-accent font-mono font-bold uppercase tracking-[3px] text-xs border border-accent/20 px-8 py-4 hover:bg-accent/5 transition-colors"
        >
          Initialize_New_Contact
        </button>
      </section>
    );
  }

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="space-y-8 mb-16 px-4 md:px-0">
        <h1 className="font-display uppercase text-5xl md:text-8xl leading-[1.0] text-text-main font-bold tracking-tighter">
          The Network.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
          Inquiries regarding WCS statistics, mechanical physics, or gear durability analysis. Open channel for system optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line bg-line max-w-6xl mb-20">
        <div className="bg-bg p-8 md:p-12 border-b md:border-b-0 md:border-r border-line space-y-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-text-main uppercase">Request New Data</h3>
            <p className="text-[15px] text-text-body leading-relaxed font-sans max-w-md">
              The engine thrives on new puzzles. Request stress-tests for specific gear or analytical deep-dives into dance metrics.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-line bg-line flex items-center justify-center text-accent group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                <BarChart2 className="w-6 h-6 stroke-1" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-text-main">Statistical_Inquiry</span>
                <div className="text-[9px] text-text-dim uppercase tracking-widest leading-none font-mono">Channel: Analysis_01</div>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-line bg-line flex items-center justify-center text-accent group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                <Sparkles className="w-6 h-6 stroke-1" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-text-main">Hardware_Review</span>
                <div className="text-[9px] text-text-dim uppercase tracking-widest leading-none font-mono">Channel: Review_Log</div>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-line bg-line flex items-center justify-center text-accent group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                <Shield className="w-6 h-6 stroke-1" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-text-main">Kinetic_Physics</span>
                <div className="text-[9px] text-text-dim uppercase tracking-widest leading-none font-mono">Channel: Physics_Eng</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Personnel_Name</label>
                {errors.name && <span className="text-[9px] text-accent font-mono font-bold uppercase">{errors.name}</span>}
              </div>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent)' }}
                transition={{ duration: 0.2 }}
                type="text"
                className={`w-full bg-bg border ${errors.name ? 'border-accent' : 'border-line'} px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <motion.div
              animate={errors.email ? { x: [-2, 2, -2, 2, 0] } : {}}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Email_Destination</label>
                {errors.email && <span className="text-[9px] text-accent font-mono font-bold uppercase">{errors.email}</span>}
              </div>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent)' }}
                transition={{ duration: 0.2 }}
                type="email"
                className={`w-full bg-bg border ${errors.email ? 'border-accent' : 'border-line'} px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </motion.div>
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Mission_Objective</label>
              <motion.select
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent)' }}
                transition={{ duration: 0.2 }}
                className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>General Feedback</option>
                <option>Content Request</option>
                <option>Gear Review Request</option>
                <option>Science/Data Inquiry</option>
              </motion.select>
            </div>
            <motion.div
              animate={errors.message ? { x: [-2, 2, -2, 2, 0] } : {}}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">Data_Payload</label>
                {errors.message && <span className="text-[9px] text-accent font-mono font-bold uppercase">{errors.message}</span>}
              </div>
              <motion.textarea
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent)' }}
                transition={{ duration: 0.2 }}
                rows={5}
                className={`w-full bg-bg border ${errors.message ? 'border-accent' : 'border-line'} px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent transition-colors resize-none`}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></motion.textarea>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full bg-text-main text-bg py-5 font-bold uppercase tracking-[3px] text-xs hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-bg/30 border-t-bg animate-spin" />
                  <span className="font-mono text-[10px] animate-pulse uppercase">Calibrating Variance...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Transmit_Data
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
