import { motion } from 'motion/react';
import { useState } from 'react';
import { Github, FileText, Terminal, ExternalLink, Info, Check } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Button } from '@/layouts/Primitives';

export function BlogDrafter() {
  const [prompt, setPrompt] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const handleDraft = async () => {
    if (!prompt.trim()) return;
    setIsDrafting(true);
    // Simulation of AI drafting
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDraft(`## AI Generated Draft for: ${prompt}\n\nThis is a simulated draft based on your technical prompt. In a production environment, this would call the Gemini API via our ETL pipeline.\n\n### Key Technical Points\n- System integration patterns\n- Performance benchmarks\n- Architecture decisions`);
    setIsDrafting(false);
  };

  return (
    <Stack gap={12}>
      <Stack gap={4}>
        <Box display="flex" align="center" gap={3}>
           <Terminal className="w-6 h-6 text-accent" />
           <Text variant="display" size="2xl" weight="font-black">Drafting Engine</Text>
        </Box>
        <Text variant="body" color="dim">
          Input your technical research notes or a raw concept. Our LLM-powered engine will transform them into a structured blog post adhering to our design system and editorial guidelines.
        </Text>
      </Stack>

      <Box border padding={8} surface="muted" className="relative overflow-hidden">
        <Stack gap={6}>
          <Stack gap={2}>
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="widest">Input Parameters</Text>
            <textarea
              className="w-full bg-surface border border-line p-6 font-sans text-sm focus:outline-none focus:border-accent min-h-[160px] transition-all"
              placeholder="Paste research data, URLs, or abstract concepts here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Stack>

          <Box display="flex" justify="end" gap={4}>
             <Button
               variant="outline"
               size="md"
               onClick={() => setPrompt('')}
               disabled={isDrafting || !prompt}
             >
               Clear
             </Button>
             <Button
               variant="primary"
               size="md"
               onClick={handleDraft}
               loading={isDrafting}
               disabled={!prompt}
             >
               {isDrafting ? 'Synthesizing...' : 'Generate Draft'}
             </Button>
          </Box>
        </Stack>
      </Box>

      {draft && (
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          border
          padding={8}
          surface="default"
        >
          <Stack gap={8}>
            <Box display="flex" justify="between" align="center" className="border-b border-line pb-4">
              <Box display="flex" align="center" gap={3}>
                 <FileText className="w-5 h-5 text-accent" />
                 <Text variant="mono" size="xs" weight="font-bold">DRAFT_OUTPUT.md</Text>
              </Box>
              <Box display="flex" gap={2}>
                <Box as="button" className="p-2 hover:bg-muted transition-colors rounded-sm" title="Copy to Clipboard">
                  <Check className="w-4 h-4" />
                </Box>
                <Box as="button" className="p-2 hover:bg-muted transition-colors rounded-sm" title="Export to GitHub">
                  <Github className="w-4 h-4" />
                </Box>
              </Box>
            </Box>

            <div className="prose prose-invert max-w-none">
               <Text variant="body" className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                 {draft}
               </Text>
            </div>

            <Box border surface="accent" padding={6} display="flex" align="center" gap={4} className="bg-accent/5 border-dashed">
               <Info className="w-5 h-5 text-accent shrink-0" />
               <Text variant="body" size="sm" color="dim">
                 This draft is a starting point. Review for technical accuracy and tone before publishing to the main repository.
               </Text>
               <Box as="a" href="#" display="flex" align="center" gap={2} className="ml-auto text-accent hover:underline">
                  <Text variant="mono" size="micro" weight="font-bold">Guidelines</Text>
                  <ExternalLink className="w-3 h-3" />
               </Box>
            </Box>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
