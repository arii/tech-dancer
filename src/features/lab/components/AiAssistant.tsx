import React, { useState } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Send, Terminal, CheckCircle2 } from 'lucide-react';
import { DraftData } from '../useBlogDrafter';

interface AiAssistantProps {
  data: DraftData;
  applyAIResponse: (jsonString: string) => boolean;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ data, applyAIResponse }) => {
  const [aiInput, setAiInput] = useState('');
  const [showAppliedSuccess, setShowAppliedSuccess] = useState(false);

  const handleApply = () => {
    if (!aiInput.trim()) {
      alert("Please paste the AI's JSON response first.");
      return;
    }
    const success = applyAIResponse(aiInput);
    if (success) {
      setShowAppliedSuccess(true);
      setAiInput("");
      setTimeout(() => setShowAppliedSuccess(false), 3000);
    } else {
      alert("Invalid JSON format. Please make sure you pasted a valid JSON object.");
    }
  };

  const handleCopyPrompt = () => {
    const prompt = `Objective: Expand the following blog post draft JSON for Tech-Dancer.
Requirements:
1. Respond ONLY with a valid JSON object.
2. DO NOT include any explanatory text, commentary, or markdown markers (like [cite:x] or [cite_start]) outside or inside the JSON values.
3. Ensure the JSON strictly matches the keys: title, excerpt, affiliateLink, commentary.
4. The 'commentary' should be rich markdown content.

Draft Data: ${JSON.stringify(data, null, 2)}`;
    navigator.clipboard.writeText(prompt);
    alert("AI Prompt Copied!");
  };

  return (
    <Stack gap={6}>
      <Box border="b" paddingBottom={2} display="flex" justify="between" align="center" borderColor="line">
        <Text variant="mono" size="tiny" color="accent" tracking="widest">AI_INTEGRATION</Text>
        {showAppliedSuccess && (
          <Box display="flex" align="center" gap={2}>
            <CheckCircle2 className="w-3 h-3 text-accent" />
            <Text variant="mono" size="micro" color="brand" weight="bold">APPLIED_SUCCESSFULLY</Text>
          </Box>
        )}
      </Box>
      
      <Grid cols={{ base: 1, md: 2 }} gap={6}>
        <Stack gap={4}>
          <Box 
            as="textarea"
            variant="mono"
            padding={4}
            surface="muted"
            radius="lg"
            border
            width="full"
            height={40}
            value={aiInput}
            onChange={(e: any) => setAiInput(e.target.value)}
            placeholder="Paste AI JSON response here..."
            className="focus:border-accent transition-all duration-200 outline-none resize-none opacity-90 focus:opacity-100"
          />
          <Box 
            as="button"
            onClick={handleApply}
            display="flex"
            align="center"
            justify="center"
            gap={3}
            surface="contrast"
            radius="lg"
            paddingY={4}
            shadow="standard"
            className="hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer font-bold uppercase tracking-widest text-xs"
          >
            <Send className="w-4 h-4" />
            APPLY_RESPONSE
          </Box>
        </Stack>

        <Box border surface="muted" padding={6} radius="lg" display="flex" align="center" justify="center">
           <Stack gap={4} align="center">
              <Terminal className="w-8 h-8 text-accent/30" />
              <Text variant="body" size="xs" color="dim" align="center">
                Need help expanding your draft? Copy the prompt below and paste into Gemini or Claude.
              </Text>
              <Box 
                as="button"
                onClick={handleCopyPrompt}
                paddingX={8}
                paddingY={3}
                border
                radius="lg"
                surface="default"
                shadow="standard"
                className="hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
              >
                 <Text variant="mono" size="micro" weight="bold">COPY_PROMPT</Text>
              </Box>
           </Stack>
        </Box>
      </Grid>
    </Stack>
  );
};
