import { Mail, Github, Linkedin, Calendar, Terminal } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Card } from '../components/ui/BaseCard';
import { Text, Stack, Button, Box, Grid } from '@/layouts/Primitives';

export default function Contact() {
  return (
    <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 4, sm: 6, lg: 8 }} paddingY={12}>
      <SEO
        title="Contact"
        description="Get in touch with BoomTick.blog. Send your feedback, inquiries, or collaboration proposals regarding West Coast Swing and robotics."
      />

      <Box maxWidth="3xl">
        <Text variant="headline" size="4xl" weight="font-black" marginBottom={4}>
          Let's connect.
        </Text>
        <Text variant="body" size="lg" color="dim" leading="relaxed" marginBottom={12}>
          Whether you have a question about a gear review, a data study, or want to collaborate on a WCS-tech project, I'd love to hear from you.
        </Text>

        <Grid cols={{ base: 1, sm: 2 }} gap={6}>
          <Card padding={6}>
            <Stack gap={6}>
              <Box display="inline-flex" height={12} width={12} align="center" justify="center" radius="lg" className="bg-accent/10">
                <Mail className="h-6 w-6 text-accent" />
              </Box>
              <Box>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase marginBottom={2}>
                  Email
                </Text>
                <Text variant="body" weight="font-bold">
                  ariel@boomtick.blog
                </Text>
              </Box>
              <Button
                variant="secondary"
                as="a"
                href="mailto:ariel@boomtick.blog"
                width="full"
                justify="center"
              >
                Send Message
              </Button>
            </Stack>
          </Card>

          <Card padding={6}>
            <Stack gap={6}>
              <Box display="inline-flex" height={12} width={12} align="center" justify="center" radius="lg" className="bg-accent/10">
                <Github className="h-6 w-6 text-accent" />
              </Box>
              <Box>
                <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase marginBottom={2}>
                  Development
                </Text>
                <Text variant="body" weight="font-bold">
                  View the source
                </Text>
              </Box>
              <Button
                variant="secondary"
                as="a"
                href="https://github.com/arii/tech-dancer"
                target="_blank"
                rel="noopener noreferrer"
                width="full"
                justify="center"
              >
                GitHub Repository
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Box marginTop={12} border="t" paddingTop={12}>
          <Text variant="headline" size="2xl" weight="font-bold" marginBottom={6}>
            Other ways to find me
          </Text>

          <Box display="flex" wrap gap={4}>
            <Button
              variant="outline"
              as="a"
              href="https://www.linkedin.com/in/ariel-anders/"
              target="_blank"
              rel="noopener noreferrer"
              gap={2}
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
              gap={2}
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
              gap={2}
            >
              <Terminal className="h-4 w-4" />
              Personal GitHub
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
