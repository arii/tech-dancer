/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Send, MessageSquare, HelpCircle, Sparkles, BarChart2, Shield } from 'lucide-react';
import React from 'react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useContactForm } from '@/hooks/use-contact-form';
import { cn } from '@/lib/utils';

export default function Contact() {
  const { 
    formData, 
    handleChange, 
    errors, 
    isSubmitting, 
    submitted, 
    submit, 
    reset 
  } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  if (submitted) {
    return (
      <Box as="section" panel className="flex flex-col items-center justify-center text-center">
        <Stack gap={12} align="center">
          <Box className="w-24 h-24 border border-accent-brand bg-accent-brand/5 flex items-center justify-center text-accent-brand">
            <Sparkles className="w-12 h-12 stroke-1" />
          </Box>
          <Stack gap={4}>
            <Text variant="headline" size="text-4xl md:text-6xl">Transmission Received.</Text>
            <Text variant="body" className="max-w-md mx-auto">
              Data integrity verified. I've received your inquiry and will recalculate my trajectory to respond as soon as possible.
            </Text>
          </Stack>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="text-accent-brand font-mono font-bold uppercase tracking-[3px] text-xs border border-accent-brand/20 px-8 py-4 hover:bg-accent-brand/5 transition-colors"
          >
            Initialize_New_Contact
          </motion.button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" panel>
      <Stack gap={8} className="mb-16 px-4 md:px-0">
        <Text variant="headline" size="text-5xl md:text-8xl">The Network.</Text>
        <Text variant="body" size="text-lg md:text-xl" className="max-w-2xl">
          Inquiries regarding WCS statistics, mechanical physics, or gear durability analysis. Open channel for system optimization.
        </Text>
      </Stack>

      <Grid cols={1} md={2} gap={0} border className="max-w-6xl mb-20 bg-line overflow-hidden">
        <Box surface="default" className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line">
          <Stack gap={12}>
            <Stack gap={6}>
              <Text as="h3" size="text-2xl" weight="font-bold" className="uppercase">Request New Data</Text>
              <Text variant="body" size="text-[15px]" className="max-w-md">
                The engine thrives on new puzzles. Request stress-tests for specific gear or analytical deep-dives into dance metrics.
              </Text>
            </Stack>
            
            <Stack gap={6}>
              {[
                { label: 'Statistical_Inquiry', channel: 'Analysis_01', icon: BarChart2 },
                { label: 'Hardware_Review', channel: 'Review_Log', icon: Sparkles },
                { label: 'Kinetic_Physics', channel: 'Physics_Eng', icon: Shield },
              ].map((item) => (
                <Box key={item.label} className="flex items-center gap-6 group">
                  <Box className="w-12 h-12 border border-line bg-line flex items-center justify-center text-accent group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors">
                    <item.icon className="w-6 h-6 stroke-1" />
                  </Box>
                  <Stack gap={1}>
                    <Text variant="mono" weight="font-bold" className="text-text-main">{item.label}</Text>
                    <Text variant="mono" color="dim" size="text-[9px]">{item.channel}</Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Box surface="default" className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Stack gap={3}>
              <Box className="flex justify-between items-center">
                <Text as="label" variant="mono" weight="font-bold" color="dim">Personnel_Name</Text>
                {errors.name && <Text variant="mono" weight="font-bold" color="brand" size="text-[9px]">{errors.name}</Text>}
              </Box>
              <motion.input 
                name="name"
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent-brand)' }}
                transition={{ duration: 0.2 }}
                type="text" 
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
                  errors.name ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.name}
                onChange={handleChange}
              />
            </Stack>
            <Stack gap={3} as={motion.div} animate={errors.email ? { x: [-2, 2, -2, 2, 0] } : {}}>
              <Box className="flex justify-between items-center">
                <Text as="label" variant="mono" weight="font-bold" color="dim">Email_Destination</Text>
                {errors.email && <Text variant="mono" weight="font-bold" color="brand" size="text-[9px]">{errors.email}</Text>}
              </Box>
              <motion.input 
                name="email"
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent-brand)' }}
                transition={{ duration: 0.2 }}
                type="email" 
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
                  errors.email ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.email}
                onChange={handleChange}
              />
            </Stack>
            <Stack gap={3}>
              <Text as="label" variant="mono" weight="font-bold" color="dim">Mission_Objective</Text>
              <motion.select 
                name="subject"
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent-brand)' }}
                transition={{ duration: 0.2 }}
                className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors"
                value={formData.subject}
                onChange={handleChange}
              >
                <option>General Feedback</option>
                <option>Content Request</option>
                <option>Gear Review Request</option>
                <option>Science/Data Inquiry</option>
              </motion.select>
            </Stack>
            <Stack gap={3} as={motion.div} animate={errors.message ? { x: [-2, 2, -2, 2, 0] } : {}}>
              <Box className="flex justify-between items-center">
                <Text as="label" variant="mono" weight="font-bold" color="dim">Data_Payload</Text>
                {errors.message && <Text variant="mono" weight="font-bold" color="brand" size="text-[9px]">{errors.message}</Text>}
              </Box>
              <motion.textarea 
                name="message"
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-accent-brand)' }}
                transition={{ duration: 0.2 }}
                rows={5}
                className={cn(
                  "w-full bg-bg border px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent-brand transition-colors resize-none",
                  errors.message ? 'border-accent-brand' : 'border-line'
                )}
                value={formData.message}
                onChange={handleChange}
              />
            </Stack>
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full bg-text-main text-bg py-5 font-bold uppercase tracking-[3px] text-xs hover:bg-accent-brand transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Stack direction="row" align="center" gap={3}>
                  <div className="w-4 h-4 border-2 border-bg/30 border-t-bg animate-spin" />
                  <Text variant="mono" color="body" size="text-[10px]" className="animate-pulse">Calibrating Variance...</Text>
                </Stack>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Transmit_Data
                </>
              )}
            </motion.button>
          </form>
        </Box>
      </Grid>
    </Box>
  );
}


