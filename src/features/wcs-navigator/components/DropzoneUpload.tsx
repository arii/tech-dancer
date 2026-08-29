import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Upload, Link as LinkIcon, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { ActionButton } from '@/components/ui/ActionButton';

interface DropzoneUploadProps {
  onIngestPdf: (file: File) => void;
  onIngestUrl: (url: string) => void;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

export const DropzoneUpload = ({
  onIngestPdf,
  onIngestUrl
}: DropzoneUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndHandleFile = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setErrorMsg('Invalid file type. Please upload a PDF schedule file (.pdf).');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg('File size exceeds maximum limit of 10MB.');
      return;
    }

    setPdfFile(file);
    setSuccessMsg(`Loaded schedule PDF: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    onIngestPdf(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!urlInput.trim()) {
      setErrorMsg('Please enter a valid schedule URL.');
      return;
    }

    try {
      const parsedUrl = new URL(urlInput.trim());
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        setErrorMsg('URL must start with http:// or https://');
        return;
      }
      setSuccessMsg(`Submitted schedule URL: ${parsedUrl.toString()}`);
      onIngestUrl(parsedUrl.toString());
    } catch {
      setErrorMsg('Invalid URL format. Please enter a full URL (e.g. https://example.com/schedule.pdf).');
    }
  };

  const clearFile = () => {
    setPdfFile(null);
    setSuccessMsg(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Stack gap={4} width="full">
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
          Custom Ingestion (PDF / Schedule URL)
        </Text>
        <Text size="sm" color="dim">
          Upload an official event schedule PDF or paste a schedule URL to parse custom weekend tracks.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, md: 2 }} gap={4} width="full">
        {/* PDF Drag & Drop Zone */}
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          padding={6}
          surface="surface"
          radius="lg"
          border
          display="flex"
          align="center"
          justify="center"
          cursor="pointer"
          className={`border-dashed transition-colors duration-200 text-center ${
            isDragOver ? 'border-brand-cyan bg-brand-cyan/10' : 'border-line hover:border-brand-cyan/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {pdfFile ? (
            <Stack gap={2} align="center">
              <Icon icon={FileText} size="lg" color="accent" />
              <Text weight="font-bold" size="sm" color="main">
                {pdfFile.name}
              </Text>
              <Text size="xs" color="dim">
                {(pdfFile.size / 1024).toFixed(1)} KB
              </Text>
              <ActionButton
                variant="secondary"
                paddingX={3}
                paddingY={1}
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                <Icon icon={X} size="xs" />
                Remove PDF
              </ActionButton>
            </Stack>
          ) : (
            <Stack gap={2} align="center">
              <Box width={12} height={12} radius="full" surface="muted" display="flex" align="center" justify="center">
                <Icon icon={Upload} size="md" color="accent" />
              </Box>
              <Stack gap={0.5} align="center">
                <Text weight="font-bold" size="sm" color="main">
                  Drop Event Schedule PDF here
                </Text>
                <Text size="xs" color="dim">
                  or click to browse (.pdf up to 10MB)
                </Text>
              </Stack>
            </Stack>
          )}
        </Box>

        {/* Schedule URL Input Form */}
        <Box padding={6} surface="surface" radius="lg" border className="border-line">
          <Box as="form" onSubmit={handleUrlSubmit} height="full" display="flex" flex="col" justify="between" gap={4}>
            <Stack gap={2}>
              <Box display="flex" align="center" gap={2}>
                <Icon icon={LinkIcon} size="sm" color="accent" />
                <Text weight="font-bold" size="sm" color="main">
                  Ingest Schedule via URL
                </Text>
              </Box>
              <Box position="relative" width="full">
                <Box
                  as="input"
                  type="url"
                  placeholder="https://event.com/schedule.pdf"
                  value={urlInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
                  onBlur={() => setUrlInput((prev) => prev.trim())}
                  paddingX={3.5}
                  paddingY={2.5}
                  radius="lg"
                  border
                  width="full"
                  className="bg-surface border-white/20 text-sm font-mono text-white placeholder-text-dim/60 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                />
                {urlInput && (
                  <Box
                    as="button"
                    type="button"
                    onClick={() => setUrlInput('')}
                    position="absolute"
                    right={3}
                    top="50%"
                    padding={0.5}
                    title="Clear URL"
                    className="-translate-y-1/2 text-text-dim hover:text-white cursor-pointer"
                  >
                    <Icon icon={X} size="xs" />
                  </Box>
                )}
              </Box>
            </Stack>
            <ActionButton type="submit" variant="primary" paddingX={4} paddingY={2} width="full">
              Fetch & Ingest URL
            </ActionButton>
          </Box>
        </Box>
      </Grid>

      {/* Validation Feedback Banners */}
      {errorMsg && (
        <Box padding={3} surface="muted" radius="md" border className="border-error/40 bg-error/10" display="flex" align="center" gap={2}>
          <Icon icon={AlertCircle} size="sm" color="accent" className="shrink-0" />
          <Text size="xs" color="dim" weight="font-semibold">{errorMsg}</Text>
        </Box>
      )}

      {successMsg && (
        <Box padding={3} surface="muted" radius="md" border className="border-brand-green/40 bg-brand-green/10" display="flex" align="center" gap={2}>
          <Icon icon={CheckCircle2} size="sm" color="accent" className="shrink-0" />
          <Text size="xs" color="dim" weight="font-semibold">{successMsg}</Text>
        </Box>
      )}
    </Stack>
  );
};
