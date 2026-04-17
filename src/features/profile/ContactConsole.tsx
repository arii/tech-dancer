/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Send, MessageSquare, HelpCircle, Sparkles, BarChart2, Shield, Loader2 } from 'lucide-react';
import React from 'react';
import { Box, Stack, Text, Grid, Motion, Icon, Inline, Button, Input, Select, Textarea } from '@/components/layout/Primitives';
import { useContactForm } from '@/hooks/use-contact-form';

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

  return submitted ? (
    <SuccessState onReset={reset} />
  ) : (
    <ContactForm 
      formData={formData} 
      errors={errors} 
      isSubmitting={isSubmitting} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
    />
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <Box as="section" panel height="full" overflow="y-auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
      <Stack gap="xl" align="center">
        <Box width={24} height={24} border="brand" surface="subsoil" display="flex" alignItems="center" justifyContent="center">
          <Icon icon={Sparkles} size="xl" color="brand" />
        </Box>
        <Stack gap="lg">
          <Text variant="headline" size="6xl">Transmission Received.</Text>
          <Text variant="body" maxWidth="md" marginX="auto" opacity="80">
            Data integrity verified. I've received your inquiry and will recalculate my trajectory to respond as soon as possible.
          </Text>
        </Stack>
        <Button 
          variant="outline"
          intent="default"
          onClick={onReset}
          paddingX="2xl"
          paddingY="lg"
          radius="none"
        >
          <Text variant="mono" size="sys" weight="font-bold" tracking="widest">Initialize_New_Contact</Text>
        </Button>
      </Stack>
    </Box>
  );
}

interface ContactFormProps {
  formData: any;
  errors: any;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormProps) {
  return (
    <Box as="section" panel height="full" overflow="y-auto">
      <Stack gap="lg" marginBottom="2xl" paddingX={{ base: "md", md: 0 }}>
        <Text variant="headline" size="8xl">The Network.</Text>
        <Text variant="body" size="xl" maxWidth="2xl">
          Inquiries regarding WCS statistics, mechanical physics, or gear durability analysis. Open channel for system optimization.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, md: 2 }} gap={0} border maxWidth="6xl" marginBottom="3xl" surface="muted" overflow="hidden">
        <Box surface="default" padding={{ base: "xl", md: "3xl" }} border={{ base: "b", md: "r" }}>
          <Stack gap="2xl">
            <Stack gap="lg">
              <Text as="h3" variant="display" size="2xl">Request New Data</Text>
              <Text variant="body" size="base" maxWidth="md" className="leading-[1.8]">
                The engine thrives on new puzzles. Request stress-tests for specific gear or analytical deep-dives into dance metrics.
              </Text>
            </Stack>
            
            <Stack gap="lg">
              {[
                { label: 'Statistical_Inquiry', channel: 'Analysis_01', icon: BarChart2 },
                { label: 'Hardware_Review', channel: 'Review_Log', icon: Sparkles },
                { label: 'Kinetic_Physics', channel: 'Physics_Eng', icon: Shield },
              ].map((item) => (
                <Inline key={item.label} gap="lg" className="group">
                  <Box width={12} height={12} border surface="subsoil" display="flex" alignItems="center" justifyContent="center" color="dim" className="group-hover:border-accent-brand group-hover:bg-accent-brand/5 group-hover:text-accent-brand transition-colors">
                    <Icon icon={item.icon} size="md" />
                  </Box>
                  <Stack gap={0}>
                    <Text variant="mono" weight="font-bold" color="brand">{item.label}</Text>
                    <Text variant="mono" color="dim" size="micro">{item.channel}</Text>
                  </Stack>
                </Inline>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Box surface="default" padding={{ base: "xl", md: "3xl" }}>
          <Box as="form" onSubmit={onSubmit}>
            <Stack gap="xl">
              <Stack gap="sm">
                <Inline justify="between" align="center">
                  <Text as="label" variant="mono" weight="font-bold" color="dim" size="sys">Personnel_Name</Text>
                  {errors.name && <Text variant="mono" weight="font-bold" color="brand" size="micro">{errors.name}</Text>}
                </Inline>
                <Motion 
                  as={Input}
                  name="name"
                  whileFocus={{ scale: 1.01 }}
                  placeholder="ID_VERIFICATION_REQUIRED"
                  value={formData.name}
                  onChange={onChange}
                  border={errors.name ? "brand" : "default"}
                />
              </Stack>
              <Stack gap="sm">
                <Inline justify="between" align="center">
                  <Text as="label" variant="mono" weight="font-bold" color="dim" size="sys">Email_Destination</Text>
                  {errors.email && <Text variant="mono" weight="font-bold" color="brand" size="micro">{errors.email}</Text>}
                </Inline>
                <Motion 
                  as={Input}
                  name="email"
                  type="email"
                  whileFocus={{ scale: 1.01 }}
                  placeholder="CONNECTION_ADDRESS"
                  value={formData.email}
                  onChange={onChange}
                  border={errors.email ? "brand" : "default"}
                />
              </Stack>
              <Stack gap="sm">
                <Text as="label" variant="mono" weight="font-bold" color="dim" size="sys">Mission_Objective</Text>
                <Motion 
                  as={Select}
                  name="subject"
                  whileFocus={{ scale: 1.01 }}
                  value={formData.subject}
                  onChange={onChange}
                >
                  <option>General Feedback</option>
                  <option>Content Request</option>
                  <option>Gear Review Request</option>
                  <option>Science/Data Inquiry</option>
                </Motion>
              </Stack>
              <Stack gap="sm">
                <Inline justify="between" align="center">
                  <Text as="label" variant="mono" weight="font-bold" color="dim" size="sys">Data_Payload</Text>
                  {errors.message && <Text variant="mono" weight="font-bold" color="brand" size="micro">{errors.message}</Text>}
                </Inline>
                <Motion 
                  as={Textarea}
                  name="message"
                  whileFocus={{ scale: 1.01 }}
                  rows={5}
                  placeholder="TRANSMIT_INQUIRY_HERE"
                  value={formData.message}
                  onChange={onChange}
                  border={errors.message ? "brand" : "default"}
                />
              </Stack>
              <Button 
                type="submit"
                variant="solid"
                intent="default"
                disabled={isSubmitting}
                paddingY="xl"
                radius="none"
              >
                {isSubmitting ? (
                  <Inline gap="md">
                    <Motion
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon icon={Loader2} size="sm" />
                    </Motion>
                    <Text variant="mono" size="sys" className="animate-pulse">Calibrating Variance...</Text>
                  </Inline>
                ) : (
                  <Inline gap="md">
                    <Icon icon={Send} size="sm" />
                    <Text variant="mono" size="sys" weight="font-bold" tracking="widest">Transmit_Data</Text>
                  </Inline>
                )}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}


