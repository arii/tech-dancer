
import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnapshotManager } from './useSnapshotManager';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  query,
  orderBy,
  initializeFirestore,
  persistentLocalCache
} from 'firebase/firestore';


// --- Configuration & Constants ---
const env = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}) as Record<string, string>;
const apiKey = env.VITE_OPENAI_API_KEY || env.VITE_GEMINI_API_KEY || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ux-auditor-api-key') : "") || "";
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

const appId = typeof __app_id !== 'undefined' ? __app_id : 'ux-auditor-v2';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;

import { VIEWPORTS } from '@/constants/visual-viewports';
import { DEFAULT_GEMINI_MODEL } from '@/lib/geminiModelConfig';

export { VIEWPORTS };

export interface Improvement {
  element: string;
  issue: string;
  suggestion: string;
  severity: number;
}

export interface ViewportAnalysis {
  summary: string;
  improvements: Improvement[];
}

export interface UXReport {
  id: string;
  url: string;
  timestamp: number;
  status: 'processing' | 'completed';
  [key: string]: string | number | ViewportAnalysis | undefined; // Allow dynamic keys like findings_mobile, image_mobile
}

export function useUXAuditor() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [url, setUrl] = useState(import.meta.env.VITE_APP_URL || 'https://boomtick.blog/');
  const [customApiKey, setCustomApiKey] = useState(sessionStorage.getItem('ux-auditor-api-key') || "");
  const { snapshotService, setSnapshotService, getSnapshotUrl, fetchSnapshot } = useSnapshotManager();
  const [isCopiedMarkdown, setIsCopiedMarkdown] = useState(false);
  const [isExportingToGithub, setIsExportingToGithub] = useState(false);

  // Transient state resets with cleanup
  useEffect(() => {
    if (!isCopiedMarkdown) return;
    const timer = setTimeout(() => setIsCopiedMarkdown(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopiedMarkdown]);

  useEffect(() => {
    if (!isExportingToGithub) return;
    const timer = setTimeout(() => setIsExportingToGithub(false), 1000);
    return () => clearTimeout(timer);
  }, [isExportingToGithub]);

  // Firebase Init
  useEffect(() => {
    if (!firebaseConfig) return;
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    // Enable local persistence for offline support
    try {
      initializeFirestore(app, {
        localCache: persistentLocalCache({})
      });
    } catch {
      // ignore if already initialized
    }

    const auth = getAuth(app);

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Firebase auth error:", err);
      }
    };
    initAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, setUser);
    return () => unsubscribeAuth();
  }, []);

  // Fetch Reports (Real-time with TanStack Query)
  const { data: reports = [] } = useQuery({
    queryKey: ['ux-reports', user?.uid],
    queryFn: () => queryClient.getQueryData(['ux-reports', user?.uid]) ?? [],
    enabled: !!user && !!firebaseConfig,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Real-time listener that updates TanStack Query cache
  useEffect(() => {
    if (!user || !firebaseConfig) return;
    const db = getFirestore();
    const q = query(
      collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UXReport));
      queryClient.setQueryData(['ux-reports', user.uid], data);
    }, (err) => console.error("Firestore error:", err));

    return () => unsubscribe();
  }, [user, queryClient]);

  const updateReport = useCallback(async (reportId: string, updates: Partial<UXReport>) => {
    // Update local cache
    queryClient.setQueryData(['ux-reports', user?.uid], (old: UXReport[] = []) =>
      old.map(r => r.id === reportId ? { ...r, ...updates } : r)
    );

    // Update Firestore if available
    if (user && firebaseConfig) {
      const db = getFirestore();
      await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), updates);
    }
  }, [user, queryClient]);

  const auditMutation = useMutation({
    mutationFn: async (targetUrl: string) => {
      const reportId = Date.now().toString();

      const newReport: UXReport = {
        id: reportId,
        url: targetUrl,
        timestamp: Date.now(),
        status: 'processing',
      };

      setActiveReportId(reportId);

      // Initial local state
      queryClient.setQueryData(['ux-reports', user?.uid], (old: UXReport[] = []) => [newReport, ...old]);

      if (user && firebaseConfig) {
        const db = getFirestore();
        await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), newReport);
      }

      for (const vp of VIEWPORTS) {
        let mockImg = `https://placehold.co/${vp.width}x${vp.height}/6366f1/ffffff?text=${vp.name}+Analysis+Pending`;
        let base64DataUri = "";

        try {
          const snapshotUrl = getSnapshotUrl(targetUrl, vp);
          base64DataUri = await fetchSnapshot(snapshotUrl);
          mockImg = base64DataUri;
        } catch {
          console.error("Failed to fetch snapshot, using placeholder");
        }

        const analysis = await analyzeViewport(vp, targetUrl, base64DataUri);

        await updateReport(reportId, {
          [`findings_${vp.name.toLowerCase()}`]: analysis,
          [`image_${vp.name.toLowerCase()}`]: mockImg
        });
      }

      await updateReport(reportId, { status: 'completed' });
      return { ...newReport, status: 'completed' } as UXReport;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ux-reports', user?.uid] });
    },
  });

  const runUXAudit = useCallback((targetUrl: string) => {
    if (auditMutation.isPending) return;

    auditMutation.mutate(targetUrl);
  }, [auditMutation]);

  const analyzeViewport = async (viewport: { name: string, width: number, height: number }, targetUrl: string, base64DataUri?: string) => {
    const systemPrompt = `You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations. Output JSON.`;
    const userQuery = `Analyze the provided snapshot of ${targetUrl} for ${viewport.name} viewport issues.`;

    try {
      const effectiveApiKey = customApiKey || apiKey;
      if (!effectiveApiKey) {
        throw new Error("API Key missing");
      }

      const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [{ text: userQuery }];
      if (base64DataUri) {
        // Extract data and mimeType from data URI: data:image/png;base64,xxxx
        const match = base64DataUri.match(/^data:(image\/[a-z]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inline_data: {
              mime_type: match[1],
              data: match[2]
            }
          });
        }
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': effectiveApiKey
        },
        body: JSON.stringify({
          contents: [{ parts }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                summary: { type: "STRING" },
                improvements: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      element: { type: "STRING" },
                      issue: { type: "STRING" },
                      suggestion: { type: "STRING" },
                      severity: { type: "NUMBER" }
                    }
                  }
                }
              }
            }
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid API response structure");
      }

      return JSON.parse(result.candidates[0].content.parts[0].text) as ViewportAnalysis;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      // Provide a populated prompt if API fails, as requested
      const imgContext = base64DataUri
        ? `Here is the base64 encoded snapshot:\n${base64DataUri}`
        : `[Please attach the image from scripts/ux-capture.js here]`;

      return {
        summary: `Analysis failed: ${errorMessage}. Manual analysis required. Copy the prompt below.`,
        improvements: [
          {
            element: "Manual Audit Required",
            issue: `The Gemini API returned an error: ${errorMessage}`,
            suggestion: `Prompt: You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations.\n\n${imgContext}`.trim(),
            severity: 5
          }
        ]
      } as ViewportAnalysis;
    }
  };

  const activeReport = reports.find(r => r.id === activeReportId) || null;

  const getMarkdown = () => {
    if (!activeReport) return "";
    let md = `# Visual UX Audit for ${activeReport.url}\n\n`;
    VIEWPORTS.forEach(vp => {
      const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
      if (data) {
        md += `## ${vp.name} Analysis\n${data.summary}\n\n`;
        md += `| Element | Issue | Suggestion | Severity |\n|---|---|---|---|\n`;
        data.improvements?.forEach(i => {
          // Sanitize suggestions to remove large base64 strings that break GitHub URL exports
          const sanitizedSuggestion = i.suggestion.replace(/data:image\/[^;]+;base64,[^\s|)]+/g, '[Base64 Image Omitted]');
          md += `| ${i.element} | ${i.issue} | ${sanitizedSuggestion} | ${i.severity}/10 |\n`;
        });
        md += `\n`;
      }
    });
    return md;
  };

  const exportToGithub = async () => {
    if (!activeReport) return;
    setIsExportingToGithub(true);
    const body = encodeURIComponent(getMarkdown());
    const title = encodeURIComponent(`UX Audit Findings: ${activeReport.url}`);

    // Attempt to parse repository from URL
    let repoBase = "https://github.com/new";
    try {
      const urlObj = new URL(activeReport.url);
      if (urlObj.hostname.endsWith('.github.io')) {
        const userPart = urlObj.hostname.split('.')[0];
        const repo = urlObj.pathname.split('/')[1];
        if (userPart && repo) repoBase = `https://github.com/${userPart}/${repo}/issues/new`;
      }
    } catch {
      // Ignore URL parsing errors
    }

    window.open(`${repoBase}?title=${title}&body=${body}`, '_blank');
  };

  const copyMarkdown = async () => {
    const md = getMarkdown();
    try {
      await navigator.clipboard.writeText(md);
      setIsCopiedMarkdown(true);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  };

  const updateApiKey = (key: string) => {
    setCustomApiKey(key);
    sessionStorage.setItem('ux-auditor-api-key', key);
  };

  return {
    user,
    reports,
    isAnalyzing: auditMutation.isPending,
    activeReport,
    setActiveReport: (r: UXReport | null) => setActiveReportId(r?.id || null),
    url,
    setUrl,
    customApiKey,
    setCustomApiKey: updateApiKey,
    snapshotService,
    setSnapshotService,
    isCopiedMarkdown,
    isExportingToGithub,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
    firebaseConfig // Exported just to check if it's initialized in the UI if needed
  };
}
