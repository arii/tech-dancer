import { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';

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
  [key: string]: any; // Allow dynamic keys like findings_mobile, image_mobile
}

export function useUXAuditor() {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<UXReport[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeReport, setActiveReport] = useState<UXReport | null>(null);
  const [url, setUrl] = useState('https://arii.github.io/tech-dancer/');
  const [isExporting, setIsExporting] = useState(false);

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

  // Fetch Reports
  useEffect(() => {
    if (!user || !firebaseConfig) return;
    const db = getFirestore();
    const q = collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UXReport));
      setReports(data.sort((a, b) => b.timestamp - a.timestamp));
    }, (err) => console.error("Firestore error:", err));

    return () => unsubscribe();
  }, [user]);

  const runUXAudit = async () => {
    if (!url) return;
    setIsAnalyzing(true);

    try {
      let reportId = Date.now().toString();

      const newReport: UXReport = {
        id: reportId,
        url,
        timestamp: Date.now(),
        status: 'processing',
      };

      // Add to local state immediately for optimistic UI
      setReports(prev => [newReport, ...prev].sort((a, b) => b.timestamp - a.timestamp));
      setActiveReport(newReport);

      if (user && firebaseConfig) {
        const db = getFirestore();
        const newReportRef = await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'), newReport);
        reportId = newReportRef.id;
        newReport.id = reportId;
      }

      for (const vp of VIEWPORTS) {
        // Attempt to fetch a real snapshot using a free public proxy API
        // This is a best effort. If it fails due to CORS, we will handle it.
        let mockImg = `https://placehold.co/${vp.width}x${vp.height}/6366f1/ffffff?text=${vp.name}+Analysis+Pending`;
        let base64DataUri = "";

        try {
          // A simple way to get a snapshot (mshots API from WP is free and fast for public URLs)
          // Reduce the dimensions by 50% to save base64 character count
          const scaledW = Math.floor(vp.width * 0.5);
          const scaledH = Math.floor(vp.height * 0.5);
          const snapshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${scaledW}&h=${scaledH}`;
          const res = await fetch(snapshotUrl);
          if (res.ok) {
            const blob = await res.blob();
            // Convert to base64 Data URI
            base64DataUri = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            mockImg = base64DataUri;
          }
        } catch (e) {
          console.error("Failed to fetch realistic snapshot, using placeholder", e);
        }

        const analysis = await analyzeViewport(vp, url, base64DataUri);

        newReport[`findings_${vp.name.toLowerCase()}`] = analysis;
        newReport[`image_${vp.name.toLowerCase()}`] = mockImg;

        setReports(prev => prev.map(r => r.id === reportId ? { ...newReport } : r));

        if (user && firebaseConfig) {
          const db = getFirestore();
          await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
            [`findings_${vp.name.toLowerCase()}`]: analysis,
            [`image_${vp.name.toLowerCase()}`]: mockImg
          });
        }
      }

      newReport.status = 'completed';
      setReports(prev => prev.map(r => r.id === reportId ? { ...newReport } : r));
      setActiveReport({ ...newReport });

      if (user && firebaseConfig) {
        const db = getFirestore();
        await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
          status: 'completed'
        });
      }
    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeViewport = async (viewport: { name: string, width: number, height: number }, targetUrl: string, base64DataUri?: string) => {
    const systemPrompt = `You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Output JSON.`;
    const userQuery = `Analyze ${targetUrl} on ${viewport.name}.`;

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
    } catch (err) {
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
            suggestion: `Prompt: You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations.\n\n${imgContext}`,
            severity: 5
          }
        ]
      } as ViewportAnalysis;
    }
  };

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

  const exportToGithub = () => {
    if (!activeReport) return;
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
    } catch (e) {}

    window.open(`${repoBase}?title=${title}&body=${body}`, '_blank');
  };

  const copyMarkdown = () => {
    const md = getMarkdown();
    const el = document.createElement('textarea');
    el.value = md;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return {
    user,
    reports,
    isAnalyzing,
    activeReport,
    setActiveReport,
    url,
    setUrl,
    isExporting,
    runUXAudit,
    exportToGithub,
    copyMarkdown,
    firebaseConfig // Exported just to check if it's initialized in the UI if needed
  };
}
