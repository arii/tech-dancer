import React from 'react';
import { Mail, Github, Linkedin, Calendar, Terminal } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Card } from '../components/ui/BaseCard';
import { Typography } from '../components/ui/Typography';
import { Stack } from '../components/ui/Stack';
import { Button } from '../components/ui/Button';

export default function Contact() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Contact"
        description="Get in touch with BoomTick.blog. Send your feedback, inquiries, or collaboration proposals regarding West Coast Swing and robotics."
      />

      <div className="max-w-3xl">
        <Typography variant="headline" size="4xl" weight="font-black" marginBottom={4}>
          Let's connect.
        </Typography>
        <Typography variant="body" size="lg" color="dim" leading="relaxed" marginBottom={12}>
          Whether you have a question about a gear review, a data study, or want to collaborate on a WCS-tech project, I'd love to hear from you.
        </Typography>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card padding={6}>
            <Stack gap={6}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Typography variant="mono" size="xs" color="accent" weight="font-bold" uppercase marginBottom={2}>
                  Email
                </Typography>
                <Typography variant="body" weight="font-bold">
                  ariel@boomtick.blog
                </Typography>
              </div>
              <Button
                variant="secondary"
                as="a"
                href="mailto:ariel@boomtick.blog"
                className="w-full justify-center"
              >
                Send Message
              </Button>
            </Stack>
          </Card>

          <Card padding={6}>
            <Stack gap={6}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Github className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Typography variant="mono" size="xs" color="accent" weight="font-bold" uppercase marginBottom={2}>
                  Development
                </Typography>
                <Typography variant="body" weight="font-bold">
                  View the source
                </Typography>
              </div>
              <Button
                variant="secondary"
                as="a"
                href="https://github.com/arii/tech-dancer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center"
              >
                GitHub Repository
              </Button>
            </Stack>
          </Card>
        </div>

        <div className="mt-12 border-t border-line pt-12">
          <Typography variant="headline" size="2xl" weight="font-bold" marginBottom={6}>
            Other ways to find me
          </Typography>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              as="a"
              href="https://www.linkedin.com/in/ariel-anders/"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              as="a"
              href="https://calendar.app.google/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book a Call
            </Button>
            <Button
              variant="outline"
              as="a"
              href="https://github.com/arii"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Terminal className="h-4 w-4" />
              Personal GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
