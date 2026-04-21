import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
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
    const app = initializeApp(firebaseConfig);
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
    if (!url || !user) return;
    setIsAnalyzing(true);

    try {
      const db = getFirestore();
      const newReportRef = await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'), {
        url,
        timestamp: Date.now(),
        status: 'processing',
      });

      for (const vp of VIEWPORTS) {
        // Mock image for simulation if real agent isn't running
        const mockImg = `https://placehold.co/${vp.width}x${vp.height}/6366f1/ffffff?text=${vp.name}+Analysis+Pending`;

        // Analyze using the multimodal prompt
        const analysis = await analyzeViewport(vp, url);

        await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', newReportRef.id), {
          [`findings_${vp.name.toLowerCase()}`]: analysis,
          [`image_${vp.name.toLowerCase()}`]: mockImg
        });
      }

      await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', newReportRef.id), {
        status: 'completed'
      });
    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeViewport = async (viewport: { name: string, width: number, height: number }, targetUrl: string) => {
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
      return { summary: "Analysis fallback", improvements: [] } as ViewportAnalysis;
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
      if (urlObj.hostname.endsWith('github.io')) {
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
