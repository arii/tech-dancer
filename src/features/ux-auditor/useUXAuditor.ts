
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { AIWebSocketClient } from '@/lib/websocket';

// --- Configuration & Constants ---
const apiKey = ""; // Provided by environment
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

const appId = typeof __app_id !== 'undefined' ? __app_id : 'ux-auditor-v2';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;

export const VIEWPORTS = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 }
];

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
  const [url, setUrl] = useState('https://arii.github.io/tech-dancer/');
  const [isCopiedMarkdown, setIsCopiedMarkdown] = useState(false);
  const [isExportingToGithub, setIsExportingToGithub] = useState(false);
  const [streamingAnalysis, setStreamingAnalysis] = useState<Record<string, Partial<ViewportAnalysis>>>({});

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
    const auth = getAuth(app);
    // getFirestore(app);

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

  const auditMutation = useMutation({
    mutationFn: async (targetUrl: string) => {
      let reportId = Date.now().toString();

      const newReport: UXReport = {
        id: reportId,
        url: targetUrl,
        timestamp: Date.now(),
        status: 'processing',
      };

      setActiveReportId(reportId);

      // Optimistic update for immediate UI feedback
      queryClient.setQueryData(['ux-reports', user?.uid], (old: UXReport[] = []) => [newReport, ...old]);

      if (user && firebaseConfig) {
        const db = getFirestore();
        const newReportRef = await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'), newReport);
        const realId = newReportRef.id;
        newReport.id = realId;
        setActiveReportId(realId);
        reportId = realId;

        // Update optimistic item with real ID
        queryClient.setQueryData(['ux-reports', user.uid], (old: UXReport[] = []) =>
          old.map(r => r.timestamp === newReport.timestamp ? { ...newReport, id: realId } : r)
        );
      }

      for (const vp of VIEWPORTS) {
        let mockImg = `https://placehold.co/${vp.width}x${vp.height}/6366f1/ffffff?text=${vp.name}+Analysis+Pending`;
        let base64DataUri = "";

        try {
          const scaledW = Math.floor(vp.width * 0.5);
          const scaledH = Math.floor(vp.height * 0.5);
          const snapshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=${scaledW}&h=${scaledH}`;
          const res = await fetch(snapshotUrl);
          if (res.ok) {
            const blob = await res.blob();
            base64DataUri = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            mockImg = base64DataUri;
          }
        } catch {
          console.error("Failed to fetch realistic snapshot, using placeholder");
        }

        // Update image immediately in cache
        newReport[`image_${vp.name.toLowerCase()}`] = mockImg;
        queryClient.setQueryData(['ux-reports', user?.uid], (old: UXReport[] = []) =>
          old.map(r => r.id === reportId ? { ...newReport } : r)
        );

        if (user && firebaseConfig) {
          const db = getFirestore();
          await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
            [`image_${vp.name.toLowerCase()}`]: mockImg
          });
        }

        // Initialize streaming state for this viewport
        setStreamingAnalysis(prev => ({ ...prev, [vp.name.toLowerCase()]: { summary: '', improvements: [] } }));

        const analysis = await analyzeViewport(vp, targetUrl, (chunk) => {
          setStreamingAnalysis(prev => {
            const current = prev[vp.name.toLowerCase()] || { summary: '', improvements: [] };
            const nextRaw = (current as ViewportAnalysis & { _raw?: string })._raw || '';
            const updatedRaw = nextRaw + chunk;

            let parsed: Partial<ViewportAnalysis> = { ...current };

            // Heuristic-based partial JSON extraction
            // 1. Extract Summary
            if (updatedRaw.includes('"summary":')) {
              // Match content inside "summary": "..." handling some escaped quotes
              const summaryMatch = updatedRaw.match(/"summary":\s*"((?:[^"\\]|\\.)*)/);
              if (summaryMatch && summaryMatch[1]) {
                parsed.summary = summaryMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
              }
            }

            // 2. Extract Improvements
            if (updatedRaw.includes('"improvements":')) {
              const impPart = updatedRaw.split('"improvements":')[1];
              // Match individual objects in the array: { ... }
              const objMatches = impPart.match(/{[^{}]*}/g);
              if (objMatches) {
                const improvements = objMatches.map(jsonStr => {
                  try {
                    return JSON.parse(jsonStr);
                  } catch {
                    return null;
                  }
                }).filter(Boolean);
                if (improvements.length > 0) parsed.improvements = improvements;
              }
            }

            // Fallback: Full parse attempt if it looks complete
            if (updatedRaw.trim().endsWith('}')) {
              try {
                const fullParsed = JSON.parse(updatedRaw);
                parsed = { ...parsed, ...fullParsed };
              } catch { /* ignore */ }
            }

            return {
              ...prev,
              [vp.name.toLowerCase()]: { ...parsed, _raw: updatedRaw } as ViewportAnalysis
            };
          });
        }, base64DataUri);

        newReport[`findings_${vp.name.toLowerCase()}`] = analysis;

        // Clear streaming state after completion
        setStreamingAnalysis(prev => {
          const next = { ...prev };
          delete next[vp.name.toLowerCase()];
          return next;
        });

        // Update the report in cache to reflect progress
        queryClient.setQueryData(['ux-reports', user?.uid], (old: UXReport[] = []) =>
          old.map(r => r.id === reportId ? { ...newReport } : r)
        );

        if (user && firebaseConfig) {
          const db = getFirestore();
          await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
            [`findings_${vp.name.toLowerCase()}`]: analysis,
            [`image_${vp.name.toLowerCase()}`]: mockImg
          });
        }
      }

      newReport.status = 'completed';
      queryClient.setQueryData(['ux-reports', user?.uid], (old: UXReport[] = []) =>
        old.map(r => r.id === reportId ? { ...newReport } : r)
      );

      if (user && firebaseConfig) {
        const db = getFirestore();
        await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
          status: 'completed'
        });
      }

      return newReport;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ux-reports', user?.uid] });
    },
  });

  const runUXAudit = () => auditMutation.mutate(url);

  const analyzeViewport = async (
    viewport: { name: string, width: number, height: number },
    targetUrl: string,
    onStreamingUpdate?: (chunk: string, isDone: boolean) => void,
    base64DataUri?: string
  ) => {
    const systemPrompt = `You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Output JSON.`;
    const userQuery = `Analyze ${targetUrl} on ${viewport.name}.`;

    // If WebSocket is desired and enabled via env or fallback to mock
    if (onStreamingUpdate) {
      try {
        const wsClient = new AIWebSocketClient();
        let fullText = '';
        await wsClient.analyze({ viewport: viewport.name, url: targetUrl, base64DataUri }, (chunk, isDone) => {
          fullText += chunk;
          onStreamingUpdate(chunk, isDone);
        });
        return JSON.parse(fullText) as ViewportAnalysis;
      } catch (err) {
        console.warn("WebSocket analysis failed, falling back to Fetch:", err);
      }
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
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
      const result = await response.json();
      return JSON.parse(result.candidates[0].content.parts[0].text) as ViewportAnalysis;
    } catch {
      // Provide a populated prompt if API fails, as requested
      const imgContext = base64DataUri
        ? `Here is the base64 encoded snapshot:\n${base64DataUri}`
        : `[Please attach the image from scripts/ux-capture.js here]`;

      return {
        summary: "API Key missing or fetch failed. Manual analysis required. Copy the prompt below.",
        improvements: [
          {
            element: "Manual Audit Required",
            issue: "No automated analysis generated.",
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
          md += `| ${i.element} | ${i.issue} | ${i.suggestion} | ${i.severity}/10 |\n`;
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

  return {
    user,
    reports,
    isAnalyzing: auditMutation.isPending,
    activeReport,
    setActiveReport: (r: UXReport | null) => setActiveReportId(r?.id || null),
    url,
    setUrl,
    isCopiedMarkdown,
    isExportingToGithub,
    streamingAnalysis,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
    firebaseConfig // Exported just to check if it's initialized in the UI if needed
  };
}
