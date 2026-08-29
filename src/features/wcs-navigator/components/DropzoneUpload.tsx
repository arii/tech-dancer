import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface DropzoneUploadProps {
  onIngestPdf: (file: File) => void;
  onIngestUrl?: (url: string) => void;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

export const DropzoneUpload = ({
  onIngestPdf,
}: DropzoneUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndHandleFile = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setErrorMsg('Please upload a PDF schedule file (.pdf).');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg('File size exceeds 10MB limit.');
      return;
    }

    setPdfFile(file);
    setSuccessMsg(`Loaded ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
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

  const clearFile = () => {
    setPdfFile(null);
    setSuccessMsg(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Stack gap={3} width="full">
      {/* PDF Drag & Drop Zone */}
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        padding={6}
        surface="surface"
        radius="xl"
        border
        display="flex"
        align="center"
        justify="center"
        cursor="pointer"
        className={`border-dashed transition-all duration-200 text-center bg-surface-alt/80 ${
          isDragOver ? 'border-brand-cyan bg-brand-cyan/10' : 'border-line/80 hover:border-brand-cyan/60 hover:bg-surface'
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
            <FileText className="w-8 h-8 text-brand-cyan" />
            <Text weight="font-bold" size="sm" color="main">
              {pdfFile.name}
            </Text>
            <Text size="xs" color="dim">
              {(pdfFile.size / 1024).toFixed(1)} KB
            </Text>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="flex items-center gap-1 px-3 py-1 text-xs text-text-dim hover:text-white rounded-lg bg-surface border border-line/60 hover:bg-surface-alt transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove PDF</span>
            </button>
          </Stack>
        ) : (
          <Stack gap={2} align="center">
            <Box width={10} height={10} radius="full" className="bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <Upload className="w-5 h-5" />
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

      {/* Validation Feedback Banners */}
      {errorMsg && (
        <Box padding={3} radius="md" border className="border-error/40 bg-error/10 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-error shrink-0" />
          <Text size="xs" color="dim" weight="font-semibold">{errorMsg}</Text>
        </Box>
      )}

      {successMsg && (
        <Box padding={3} radius="md" border className="border-brand-green/40 bg-brand-green/10 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
          <Text size="xs" color="dim" weight="font-semibold">{successMsg}</Text>
        </Box>
      )}
    </Stack>
  );
};

