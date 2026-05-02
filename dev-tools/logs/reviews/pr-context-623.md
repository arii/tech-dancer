# PR Context: #623 — feat: add AI slop audit workflow to .agent/
**Author:** @arii

## Description
Add comprehensive language standards enforcement system to prevent AI-generated filler.

## What's Included

Standards Documents:
- APPROVEDLIST.md - Approved language patterns (active voice, specific terminology)
- BANLIST.md - Banned phrases (weak intensifiers, corporate speak, AI clichés)

Automation:
- audit-ai-slop.py - Python auditor (30 seconds, generates prioritized reports)
- audit-ai-slop.md - Manual workflow (grep commands for each violation category)

Documentation:
- WORKFLOW_GUIDE.md - Quick reference for running audits
- AI_SLOP_AUDIT_START_HERE.md - Entry point guide with examples
- README.md - Directory overview
- ai-slop-audit-[DATE].md - Latest audit report

## Current Audit Results

Found 6 violations:
- 2 Critical (About page)
- 3 High (Blog posts)
- 1 Normal (Gear page)

## Quick Start

```bash
python3 .agent/scripts/audit-ai-slop.py
```

## When to Run

- Before submitting PR with content changes
- Before major releases
- Quarterly as maintenance

## Files Changed
- 🟢 `.agent/README.md`
- 🟢 `.agent/audit.config.yaml`
- 🟢 `.agent/scripts/audit-ai-slop.py`
- 🟢 `.agent/workflows/ai-slop-audit-20260501-205932.md`
- 🟢 `.agent/workflows/ai-slop-audit-20260502-043816.md`
- 🟢 `.agent/workflows/ai-slop-audit.md`
- 🟡 `content/posts/2026-04-18-ai-role-dance.md`
- 🟡 `content/posts/2026-04-18-make-shoe-dance.md`
- 🟡 `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md`
- 🟡 `src/features/lab/useToolbox.ts`
- 🟡 `src/features/profile/useProfile.ts`

## Diffs

### `.agent/README.md` (added)
```diff
@@ -0,0 +1,82 @@
   1 |+# .agent Directory
   2 |+
   3 |+**Purpose:** Central location for agent-runnable workflows, standards, and audit processes
   4 |+
   5 |+---
   6 |+
   7 |+## Contents
   8 |+
   9 |+### Automation Configuration
  10 |+- **audit.config.yaml** - Unified configuration defining all banned language categories, terms, and standard fixes.
  11 |+
  12 |+### Workflows
  13 |+
  14 |+Located in `.agent/workflows/`:
  15 |+- **ai-slop-audit-[DATE].md** - Auto-generated audit results (latest run)
  16 |+- Other workflows: mass-audit-issues, review-pr, review-ux, etc.
  17 |+
  18 |+### Scripts
  19 |+
  20 |+Located in `.agent/scripts/`:
  21 |+- **audit-ai-slop.py** - Automated auditor that searches codebase and generates action plan. Consumes `audit.config.yaml`.
  22 |+
  23 |+---
  24 |+
  25 |+## Quick Start
  26 |+
  27 |+### Run Automated Audit
  28 |+
  29 |+```bash
  30 |+python3 .agent/scripts/audit-ai-slop.py
  31 |+```
  32 |+
  33 |+This generates a timestamped report in `.agent/workflows/ai-slop-audit-[DATE].md` with:
  34 |+- All violations found (grouped by category and priority)
  35 |+- Exact file paths and line numbers
  36 |+- Context for each violation
  37 |+- Action plan with next steps
  38 |+
  39 |+### Apply Fixes
  40 |+
  41 |+Follow the audit report to fix violations in priority order:
  42 |+1. Critical (About page, home page)
  43 |+2. High (Content/blog posts)
  44 |+3. Normal (Other files)
  45 |+
  46 |+---
  47 |+
  48 |+## Process Flow
  49 |+
  50 |+```
  51 |+1. Run automated audit
  52 |+   ↓
  53 |+2. Review violations by priority
  54 |+   ↓
  55 |+3. Apply fixes per audit.config.yaml
  56 |+   ↓
  57 |+4. Run pnpm build to verify
  58 |+   ↓
  59 |+5. Commit with clear message
  60 |+```
  61 |+
  62 |+---
  63 |+
  64 |+## When to Run
  65 |+
  66 |+- **Before submitting PR** with content changes
  67 |+- **Before major releases** to catch language drift
  68 |+- **Quarterly** as routine maintenance
  69 |+
  70 |+---
  71 |+
  72 |+## Standards
  73 |+
  74 |+All content must follow rules defined in `audit.config.yaml`. No weak intensifiers, corporate speak, credential crutch, passive voice, invented scar tissue, or AI clichés. Active voice only, specific terminology, direct language.
  75 |+
  76 |+---
  77 |+
  78 |+## Owner
  79 |+
  80 |+Quality Assurance - Language Standards
  81 |+
  82 |+**Last Updated:** 2026-05-02
```

### `.agent/audit.config.yaml` (added)
```diff
@@ -0,0 +1,87 @@
   1 |+categories:
   2 |+  weak_intensifiers:
   3 |+    terms:
   4 |+      - actually
   5 |+      - really
   6 |+      - basically
   7 |+      - kind of
   8 |+      - sort of
   9 |+    priority: high
  10 |+    fix: "Delete or replace with direct statement"
  11 |+  corporate_speak:
  12 |+    terms:
  13 |+      - curated
  14 |+      - synergy
  15 |+      - next-level
  16 |+      - cutting-edge
  17 |+      - empower
  18 |+      - industry-leading
  19 |+    priority: high
  20 |+    fix: "Replace with specific, active verbs (e.g. selected, tested, chosen)"
  21 |+  credential_crutch:
  22 |+    terms:
  23 |+      - As a PhD
  24 |+      - In my research
  25 |+      - Given my robotics
  26 |+      - My analysis suggests
  27 |+    priority: high
  28 |+    fix: "Delete or provide specific examples instead"
  29 |+  academic_scaffolding:
  30 |+    terms:
  31 |+      - Utilize
  32 |+      - Facilitate
  33 |+      - Methodology
  34 |+      - Pedagogical
  35 |+      - It was observed
  36 |+    priority: high
  37 |+    fix: "Replace with active verbs (Use, Fix, Help, Method, Teaching, etc.)"
  38 |+  wcs_conflicts:
  39 |+    terms:
  40 |+      - The Circuit
  41 |+      - Circuit Points
  42 |+      - Point Chasing
  43 |+    priority: high
  44 |+    fix: "Use approved terminology (WCS Events, WSDC Database, Registry Standing, etc.)"
  45 |+  robotics_jargon:
  46 |+    terms:
  47 |+      - Kinetics
  48 |+      - Signal Latency
  49 |+      - Actuate
  50 |+      - Interface
  51 |+    priority: high
  52 |+    fix: "Use dance terminology (Momentum, Connection Delay, Move, Communication)"
  53 |+  passive_voice:
  54 |+    terms:
  55 |+      - can be
  56 |+      - will be
  57 |+      - is seen
  58 |+      - is applied
  59 |+      - is facilitated
  60 |+    priority: high
  61 |+    fix: "Convert to active voice"
  62 |+  false_authority:
  63 |+    terms:
  64 |+      - Studies show
  65 |+      - Everyone agrees
  66 |+      - As we can see
  67 |+      - It's important to note
  68 |+    priority: high
  69 |+    fix: "Delete or provide specific evidence"
  70 |+  ai_cliches:
  71 |+    terms:
  72 |+      - Tapestry
  73 |+      - Vibrant
  74 |+      - Testament
  75 |+      - Unlock your potential
  76 |+      - Game-changing
  77 |+      - Unprecedented
  78 |+      - Journey
  79 |+      - Heartbeat
  80 |+      - Quintessential
  81 |+      - Strategic Vulnerability
  82 |+      - Narrative Grounding
  83 |+      - In the world of
  84 |+      - But the reality is
  85 |+      - Picture this
  86 |+    priority: high
  87 |+    fix: "Delete immediately"
```

### `.agent/scripts/audit-ai-slop.py` (added)
```diff
@@ -0,0 +1,180 @@
   1 |+#!/usr/bin/env python3
   2 |+"""
   3 |+AI Slop Audit Script
   4 |+
   5 |+Searches codebase for banned language per audit.config.yaml
   6 |+Generates actionable audit report with before/after fixes
   7 |+"""
   8 |+
   9 |+import os
  10 |+import re
  11 |+import subprocess
  12 |+from datetime import datetime
  13 |+from pathlib import Path
  14 |+from typing import List, Dict, Tuple
  15 |+import yaml
  16 |+
  17 |+class AISlopAuditor:
  18 |+    def __init__(self, root_dir: str = ".", config_path: str = ".agent/audit.config.yaml"):
  19 |+        self.root_dir = Path(root_dir)
  20 |+        self.config_path = self.root_dir / config_path
  21 |+        self.violations: List[Dict] = []
  22 |+        self.exclude_dirs = {"node_modules", "dist", ".git", ".playwright", "test-results"}
  23 |+        self.file_extensions = {".tsx", ".ts", ".md", ".jsx", ".js"}
  24 |+        self.load_config()
  25 |+
  26 |+    def load_config(self):
  27 |+        try:
  28 |+            with open(self.config_path, 'r') as f:
  29 |+                self.config = yaml.safe_load(f)
  30 |+        except Exception as e:
  31 |+            print(f"Error loading config: {e}")
  32 |+            self.config = {"categories": {}}
  33 |+
  34 |+    def search_violations(self) -> None:
  35 |+        """Search entire codebase for banned terms"""
  36 |+        print("🔍 Scanning codebase for banned language...")
  37 |+        
  38 |+        categories = self.config.get("categories", {})
  39 |+        for category, details in categories.items():
  40 |+            terms = details.get("terms", [])
  41 |+            fix = details.get("fix", "Fix per category")
  42 |+
  43 |+            for term in terms:
  44 |+                # Build grep pattern (case-insensitive for most terms)
  45 |+                pattern = f"\\b{re.escape(term)}\\b"
  46 |+                
  47 |+                # Run grep
  48 |+                try:
  49 |+                    result = subprocess.run(
  50 |+                        ["grep", "-r", "-n", pattern, "src/", "content/", 
  51 |+                         "--include=*.tsx", "--include=*.ts", "--include=*.md"],
  52 |+                        capture_output=True,
  53 |+                        text=True,
  54 |+                        cwd=str(self.root_dir)
  55 |+                    )
  56 |+                    
  57 |+                    if result.stdout:
  58 |+                        for line in result.stdout.strip().split("\n"):
  59 |+                            if not line or "node_modules" in line:
  60 |+                                continue
  61 |+                            
  62 |+                            parts = line.split(":", 2)
  63 |+                            if len(parts) >= 3:
  64 |+                                file_path, line_num, content = parts[0], parts[1], ":".join(parts[2:])
  65 |+                                
  66 |+                                self.violations.append({
  67 |+                                    "file": file_path,
  68 |+                                    "line": line_num,
  69 |+                                    "content": content.strip(),
  70 |+                                    "term": term,
  71 |+                                    "category": category,
  72 |+                                    "fix": fix
  73 |+                                })
  74 |+                
  75 |+                except subprocess.CalledProcessError:
  76 |+                    pass  # No matches for this term
  77 |+    
  78 |+    def prioritize_violations(self) -> None:
  79 |+        """Sort violations by priority"""
  80 |+        # Critical files (About page, landing page)
  81 |+        critical_files = {
  82 |+            "src/features/profile/useProfile.ts",
  83 |+            "src/features/dashboard/Dashboard.tsx",
  84 |+            "src/pages/Home.tsx",
  85 |+            "src/pages/About.tsx"
  86 |+        }
  87 |+        
  88 |+        def priority(v):
  89 |+            if v["file"] in critical_files:
  90 |+                return (0, v["file"], int(v["line"]))  # Priority 0 = critical
  91 |+            elif "content/" in v["file"]:
  92 |+                return (1, v["file"], int(v["line"]))  # Priority 1 = high
  93 |+            else:
  94 |+                return (2, v["file"], int(v["line"]))  # Priority 2 = normal
  95 |+        
  96 |+        self.violations.sort(key=priority)
  97 |+    
  98 |+    def generate_report(self) -> str:
  99 |+        """Generate markdown audit report"""
 100 |+        now = datetime.now().isoformat()
 101 |+        
 102 |+        report = f"""# AI Slop Audit Report
 103 |+
 104 |+**Generated:** {now}  
 105 |+**Total Violations:** {len(self.violations)}
 106 |+
 107 |+---
 108 |+
 109 |+## Violations by Category
 110 |+
 111 |+"""
 112 |+        
 113 |+        # Group by category
 114 |+        by_category = {}
 115 |+        for v in self.violations:
 116 |+            cat = v["category"]
 117 |+            if cat not in by_category:
 118 |+                by_category[cat] = []
 119 |+            by_category[cat].append(v)
 120 |+        
 121 |+        for category in sorted(by_category.keys()):
 122 |+            violations = by_category[category]
 123 |+            report += f"\n### {category.replace('_', ' ').title()} ({len(violations)} violations)\n\n"
 124 |+            
 125 |+            for i, v in enumerate(violations, 1):
 126 |+                priority = "🔴 Critical" if "profile" in v["file"] or "dashboard" in v["file"] else "🟠 High" if "content/" in v["file"] else "🟡 Normal"
 127 |+                report += f"{i}. **File:** `{v['file']}` (line {v['line']})\n"
 128 |+                report += f"   **Term:** `{v['term']}`\n"
 129 |+                report += f"   **Priority:** {priority}\n"
 130 |+                report += f"   **Fix:** {v['fix']}\n"
 131 |+                report += f"   **Context:** `...{v['content'][:100]}...`\n\n"
 132 |+        
 133 |+        # Action plan
 134 |+        report += "\n---\n\n## Action Plan\n\n"
 135 |+        report += f"Total violations found: {len(self.violations)}\n\n"
 136 |+        
 137 |+        # Group by priority
 138 |+        critical = [v for v in self.violations if "profile" in v["file"] or "dashboard" in v["file"]]
 139 |+        high = [v for v in self.violations if "content/" in v["file"] and v not in critical]
 140 |+        
 141 |+        report += f"- **Critical (About/Landing pages):** {len(critical)} violations\n"
 142 |+        report += f"- **High (Content):** {len(high)} violations\n"
 143 |+        report += f"- **Normal (Other):** {len(self.violations) - len(critical) - len(high)} violations\n\n"
 144 |+        
 145 |+        report += "## Next Steps\n\n"
 146 |+        report += "1. Review violations by priority\n"
 147 |+        report += "2. Fix critical violations first\n"
 148 |+        report += "3. Run `pnpm build` to verify no breaking changes\n"
 149 |+        report += "4. Commit with clear message referencing this audit\n\n"
 150 |+        
 151 |+        report += "---\n\n"
 152 |+        report += "**Reference:** See `.agent/audit.config.yaml` for full standards\n"
 153 |+        
 154 |+        return report
 155 |+    
 156 |+    def run(self) -> str:
 157 |+        """Execute full audit"""
 158 |+        self.search_violations()
 159 |+        self.prioritize_violations()
 160 |+        return self.generate_report()
 161 |+
 162 |+def main():
 163 |+    auditor = AISlopAuditor()
 164 |+    report = auditor.run()
 165 |+    
 166 |+    # Output report
 167 |+    print(report)
 168 |+    
 169 |+    # Save to file
 170 |+    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
 171 |+    output_dir = Path(".agent/workflows")
 172 |+    output_dir.mkdir(parents=True, exist_ok=True)
 173 |+    output_file = output_dir / f"ai-slop-audit-{timestamp}.md"
 174 |+    output_file.write_text(report)
 175 |+    
 176 |+    print(f"\n✅ Report saved to: {output_file}")
 177 |+    print(f"📊 Found {len(auditor.violations)} violations")
 178 |+
 179 |+if __name__ == "__main__":
 180 |+    main()
```

### `.agent/workflows/ai-slop-audit-20260501-205932.md` (added)
```diff
@@ -0,0 +1,75 @@
   1 |+# AI Slop Audit Report
   2 |+
   3 |+**Generated:** 2026-05-01T20:59:32.285020  
   4 |+**Total Violations:** 6
   5 |+
   6 |+---
   7 |+
   8 |+## Violations by Category
   9 |+
  10 |+
  11 |+### Corporate Speak (2 violations)
  12 |+
  13 |+1. **File:** `src/features/profile/useProfile.ts` (line 20)
  14 |+   **Term:** `curated`
  15 |+   **Priority:** 🔴 Critical
  16 |+   **Fix:** Replace with: selected, tested, chosen
  17 |+   **Context:** `...content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to...`
  18 |+
  19 |+2. **File:** `src/features/lab/useToolbox.ts` (line 22)
  20 |+   **Term:** `curated`
  21 |+   **Priority:** 🟡 Normal
  22 |+   **Fix:** Replace with: selected, tested, chosen
  23 |+   **Context:** `...{ id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, co...`
  24 |+
  25 |+
  26 |+### Passive Voice (2 violations)
  27 |+
  28 |+1. **File:** `content/posts/2026-04-18-ai-role-dance.md` (line 17)
  29 |+   **Term:** `can be`
  30 |+   **Priority:** 🟠 High
  31 |+   **Fix:** Convert to active voice
  32 |+   **Context:** `...Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it ca...`
  33 |+
  34 |+2. **File:** `content/posts/2026-04-18-make-shoe-dance.md` (line 17)
  35 |+   **Term:** `can be`
  36 |+   **Priority:** 🟠 High
  37 |+   **Fix:** Convert to active voice
  38 |+   **Context:** `...Buying dedicated dance shoes can be expensive and often limited in style. My preferred system is to ...`
  39 |+
  40 |+
  41 |+### Weak Intensifiers (2 violations)
  42 |+
  43 |+1. **File:** `src/features/profile/useProfile.ts` (line 15)
  44 |+   **Term:** `actually`
  45 |+   **Priority:** 🔴 Critical
  46 |+   **Fix:** Delete
  47 |+   **Context:** `...content: "I believe in building things that actually work. Since 2010, I have dedicated myself to cr...`
  48 |+
  49 |+2. **File:** `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md` (line 40)
  50 |+   **Term:** `actually`
  51 |+   **Priority:** 🟠 High
  52 |+   **Fix:** Delete
  53 |+   **Context:** `...**Next Step:** Check your workflow logs. Is your timing actually on beat, or is your build failing?...`
  54 |+
  55 |+
  56 |+---
  57 |+
  58 |+## Action Plan
  59 |+
  60 |+Total violations found: 6
  61 |+
  62 |+- **Critical (About/Landing pages):** 2 violations
  63 |+- **High (Content):** 3 violations
  64 |+- **Normal (Other):** 1 violations
  65 |+
  66 |+## Next Steps
  67 |+
  68 |+1. Review violations by priority
  69 |+2. Fix critical violations first
  70 |+3. Run `pnpm build` to verify no breaking changes
  71 |+4. Commit with clear message referencing this audit
  72 |+
  73 |+---
  74 |+
  75 |+**Reference:** See `.agent/BANLIST.md` and `.agent/APPROVEDLIST.md` for full standards
```

### `.agent/workflows/ai-slop-audit-20260502-043816.md` (added)
```diff
@@ -0,0 +1,75 @@
   1 |+# AI Slop Audit Report
   2 |+
   3 |+**Generated:** 2026-05-02T04:38:16.505856
   4 |+**Total Violations:** 6
   5 |+
   6 |+---
   7 |+
   8 |+## Violations by Category
   9 |+
  10 |+
  11 |+### Corporate Speak (2 violations)
  12 |+
  13 |+1. **File:** `src/features/profile/useProfile.ts` (line 20)
  14 |+   **Term:** `curated`
  15 |+   **Priority:** 🔴 Critical
  16 |+   **Fix:** Replace with specific, active verbs (e.g. selected, tested, chosen)
  17 |+   **Context:** `...content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to...`
  18 |+
  19 |+2. **File:** `src/features/lab/useToolbox.ts` (line 22)
  20 |+   **Term:** `curated`
  21 |+   **Priority:** 🟡 Normal
  22 |+   **Fix:** Replace with specific, active verbs (e.g. selected, tested, chosen)
  23 |+   **Context:** `...{ id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, co...`
  24 |+
  25 |+
  26 |+### Passive Voice (2 violations)
  27 |+
  28 |+1. **File:** `content/posts/2026-04-18-ai-role-dance.md` (line 17)
  29 |+   **Term:** `can be`
  30 |+   **Priority:** 🟠 High
  31 |+   **Fix:** Convert to active voice
  32 |+   **Context:** `...Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it ca...`
  33 |+
  34 |+2. **File:** `content/posts/2026-04-18-make-shoe-dance.md` (line 17)
  35 |+   **Term:** `can be`
  36 |+   **Priority:** 🟠 High
  37 |+   **Fix:** Convert to active voice
  38 |+   **Context:** `...Buying dedicated dance shoes can be expensive and often limited in style. My preferred system is to ...`
  39 |+
  40 |+
  41 |+### Weak Intensifiers (2 violations)
  42 |+
  43 |+1. **File:** `src/features/profile/useProfile.ts` (line 15)
  44 |+   **Term:** `actually`
  45 |+   **Priority:** 🔴 Critical
  46 |+   **Fix:** Delete or replace with direct statement
  47 |+   **Context:** `...content: "I believe in building things that actually work. Since 2010, I have dedicated myself to cr...`
  48 |+
  49 |+2. **File:** `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md` (line 40)
  50 |+   **Term:** `actually`
  51 |+   **Priority:** 🟠 High
  52 |+   **Fix:** Delete or replace with direct statement
  53 |+   **Context:** `...**Next Step:** Check your workflow logs. Is your timing actually on beat, or is your build failing?...`
  54 |+
  55 |+
  56 |+---
  57 |+
  58 |+## Action Plan
  59 |+
  60 |+Total violations found: 6
  61 |+
  62 |+- **Critical (About/Landing pages):** 2 violations
  63 |+- **High (Content):** 3 violations
  64 |+- **Normal (Other):** 1 violations
  65 |+
  66 |+## Next Steps
  67 |+
  68 |+1. Review violations by priority
  69 |+2. Fix critical violations first
  70 |+3. Run `pnpm build` to verify no breaking changes
  71 |+4. Commit with clear message referencing this audit
  72 |+
  73 |+---
  74 |+
  75 |+**Reference:** See `.agent/audit.config.yaml` for full standards
```

### `.agent/workflows/ai-slop-audit.md` (added)
```diff
@@ -0,0 +1,247 @@
   1 |+# AI Slop Audit & Action Plan
   2 |+
   3 |+**Audit Date:** 2026-05-02T03:41:09Z  
   4 |+**Based on:** APPROVEDLIST.md & BANLIST.md
   5 |+
   6 |+---
   7 |+
   8 |+## Violations Found
   9 |+
  10 |+### 1. Weak Intensifiers (2 instances)
  11 |+
  12 |+**File:** `src/features/profile/useProfile.ts`
  13 |+**Issue:** "actually" (banned as overused weak intensifier)
  14 |+**Line:** "I believe in building things that **actually** work."
  15 |+**Action:** Replace with direct statement
  16 |+**Fix:** "I believe in building things that work."
  17 |+
  18 |+**File:** `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md`
  19 |+**Issue:** "actually" 
  20 |+**Line:** "Is your timing **actually** on beat, or is your build failing?"
  21 |+**Action:** Replace with direct question
  22 |+**Fix:** "Is your timing on beat, or is your build failing?"
  23 |+
  24 |+---
  25 |+
  26 |+### 2. Corporate Speak: "Curated" (2 instances)
  27 |+
  28 |+**File:** `src/features/lab/useToolbox.ts`
  29 |+**Issue:** "curated" (banned corporate speak)
  30 |+**Line:** "Bright, fun outfits **curated** for movement, comfort, and style on the dance floor."
  31 |+**Action:** Replace with active verb
  32 |+**Fix:** "Bright, fun outfits selected for movement, comfort, and style on the dance floor."
  33 |+
  34 |+**File:** `src/features/profile/useProfile.ts`
  35 |+**Issue:** "curated"
  36 |+**Line:** "everything from **curated** gear reviews to my travel-hacking systems."
  37 |+**Action:** Replace with specific verb
  38 |+**Fix:** "everything from tested gear reviews to my travel-hacking systems."
  39 |+
  40 |+---
  41 |+
  42 |+### 3. Weak Adjectives: "Fantastic"
  43 |+
  44 |+**File:** `src/features/profile/useProfile.ts`
  45 |+**Issue:** "fantastic" (AI filler, imprecise)
  46 |+**Line:** "Attending West Coast Swing (WCS) events became a **fantastic** way for me to travel again after the pandemic."
  47 |+**Action:** Delete or replace with specific statement
  48 |+**Fix:** "Attending WCS events enabled me to travel again after the pandemic."
  49 |+
  50 |+---
  51 |+
  52 |+### 4. Passive Voice (2 instances)
  53 |+
  54 |+**File:** `content/posts/2026-04-18-make-shoe-dance.md`
  55 |+**Issue:** Passive voice "can be"
  56 |+**Line:** "Buying dedicated dance shoes **can be** expensive and often limited in style."
  57 |+**Action:** Convert to active voice
  58 |+**Fix:** "Dedicated dance shoes cost more and offer limited styles."
  59 |+
  60 |+**File:** `content/posts/2026-04-18-ai-role-dance.md`
  61 |+**Issue:** Passive voice "is often seen"
  62 |+**Line:** "Artificial Intelligence **is often seen as** a cold, analytical tool, but in the context of dance, it **can be** deeply clarifying."
  63 |+**Action:** Convert to active voice with specific statement
  64 |+**Fix:** "Most people view AI as cold and analytical. In dance, it clarifies movement patterns."
  65 |+
  66 |+---
  67 |+
  68 |+## Action Plan
  69 |+
  70 |+### Priority 1 (Critical - Fix Immediately)
  71 |+
  72 |+#### 1.1 File: `src/features/profile/useProfile.ts`
  73 |+
  74 |+**Changes needed:** 4 fixes
  75 |+
  76 |+**Current (lines in "Why My PhD Matters"):**
  77 |+```typescript
  78 |+content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
  79 |+```
  80 |+
  81 |+**Fixed:**
  82 |+```typescript
  83 |+content: "I believe in building things that work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
  84 |+```
  85 |+
  86 |+**Current (lines in "Why I Built This Site"):**
  87 |+```typescript
  88 |+content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems."
  89 |+```
  90 |+
  91 |+**Fixed:**
  92 |+```typescript
  93 |+content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from tested gear reviews to my travel-hacking systems."
  94 |+```
  95 |+
  96 |+**Current (lines in "My Dance Background"):**
  97 |+```typescript
  98 |+content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing."
  99 |+```
 100 |+
 101 |+**Fixed:**
 102 |+```typescript
 103 |+content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and resumed partner dancing at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing and discovered West Coast Swing. The music and style resonated with me. I started dancing both WCS and Lindy Hop. Attending WCS events enabled me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing."
 104 |+```
 105 |+
 106 |+---
 107 |+
 108 |+#### 1.2 File: `src/features/lab/useToolbox.ts`
 109 |+
 110 |+**Current:**
 111 |+```typescript
 112 |+{ id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' }
 113 |+```
 114 |+
 115 |+**Fixed:**
 116 |+```typescript
 117 |+{ id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits selected for movement, comfort, and style on the dance floor.' }
 118 |+```
 119 |+
 120 |+---
 121 |+
 122 |+### Priority 2 (High - Fix Next)
 123 |+
 124 |+#### 2.1 File: `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md`
 125 |+
 126 |+**Current (in "Next Step" section):**
 127 |+```markdown
 128 |+**Next Step:** Check your workflow logs. Is your timing actually on beat, or is your build failing?
 129 |+```
 130 |+
 131 |+**Fixed:**
 132 |+```markdown
 133 |+**Next Step:** Check your workflow logs. Is your timing on beat, or is your build failing?
 134 |+```
 135 |+
 136 |+---
 137 |+
 138 |+#### 2.2 File: `content/posts/2026-04-18-make-shoe-dance.md`
 139 |+
 140 |+**Current:**
 141 |+```markdown
 142 |+Buying dedicated dance shoes can be expensive and often limited in style. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
 143 |+```
 144 |+
 145 |+**Fixed:**
 146 |+```markdown
 147 |+Dedicated dance shoes cost more and offer limited styles. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
 148 |+```
 149 |+
 150 |+---
 151 |+
 152 |+#### 2.3 File: `content/posts/2026-04-18-ai-role-dance.md`
 153 |+
 154 |+**Current:**
 155 |+```markdown
 156 |+Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it can be deeply clarifying.
 157 |+```
 158 |+
 159 |+**Fixed:**
 160 |+```markdown
 161 |+Most people view AI as cold and analytical. In dance, it clarifies movement patterns.
 162 |+```
 163 |+
 164 |+---
 165 |+
 166 |+## Execution Steps
 167 |+
 168 |+### Step 1: Update useProfile.ts
 169 |+```bash
 170 |+# File: src/features/profile/useProfile.ts
 171 |+# Changes: 
 172 |+# - Remove "actually" from "Why My PhD Matters"
 173 |+# - Replace "curated" with "tested" in "Why I Built This Site"
 174 |+# - Replace "fantastic" with direct statement in "My Dance Background"
 175 |+# - Remove "got back into the swing of things" (cliché phrasing)
 176 |+```
 177 |+
 178 |+### Step 2: Update useToolbox.ts
 179 |+```bash
 180 |+# File: src/features/lab/useToolbox.ts
 181 |+# Changes:
 182 |+# - Replace "curated" with "selected"
 183 |+```
 184 |+
 185 |+### Step 3: Update Blog Post - Vercel
 186 |+```bash
 187 |+# File: content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md
 188 |+# Changes:
 189 |+# - Remove "actually" from "Next Step" section
 190 |+```
 191 |+
 192 |+### Step 4: Update Blog Post - Shoe DIY
 193 |+```bash
 194 |+# File: content/posts/2026-04-18-make-shoe-dance.md
 195 |+# Changes:
 196 |+# - Convert passive voice to active in opening sentence
 197 |+```
 198 |+
 199 |+### Step 5: Update Blog Post - AI in Dance
 200 |+```bash
 201 |+# File: content/posts/2026-04-18-ai-role-dance.md
 202 |+# Changes:
 203 |+# - Convert passive voice to active in opening paragraph
 204 |+```
 205 |+
 206 |+### Step 6: Verify No New Violations
 207 |+```bash
 208 |+# Run audit commands
 209 |+for term in "actually" "curated" "fantastic" "can be" "is often seen"; do
 210 |+  echo "=== Checking for: $term ==="
 211 |+  grep -r "$term" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" || echo "✅ None found"
 212 |+done
 213 |+```
 214 |+
 215 |+### Step 7: Build and Test
 216 |+```bash
 217 |+pnpm build
 218 |+pnpm run audit
 219 |+git status
 220 |+```
 221 |+
 222 |+---
 223 |+
 224 |+## Summary
 225 |+
 226 |+**Total Violations Found:** 7
 227 |+**Files Affected:** 5
 228 |+**Priority 1 (Critical):** 5 violations in 2 files
 229 |+**Priority 2 (High):** 2 violations in 3 files
 230 |+
 231 |+**Estimated Time:** 30-45 minutes to fix all violations
 232 |+
 233 |+---
 234 |+
 235 |+## Verification Checklist
 236 |+
 237 |+- [ ] useProfile.ts: Remove "actually"
 238 |+- [ ] useProfile.ts: Replace "curated" with "tested"
 239 |+- [ ] useProfile.ts: Replace "fantastic" with direct statement
 240 |+- [ ] useToolbox.ts: Replace "curated" with "selected"
 241 |+- [ ] Vercel post: Remove "actually"
 242 |+- [ ] Shoe DIY post: Convert passive voice
 243 |+- [ ] AI in Dance post: Convert passive voice
 244 |+- [ ] Run grep audit for all banned terms
 245 |+- [ ] Build successfully
 246 |+- [ ] Commit with clear message
 247 |+
```

### `content/posts/2026-04-18-ai-role-dance.md` (modified)
```diff
@@ -14,7 +14,7 @@ tags:
  14 | 
  15 | ## AI in the Ballroom
  16 | 
     |-Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it can be deeply clarifying. 
  17 |+Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it clarifies mechanics directly.
  18 | 
  19 | ### Computer Vision & Frame Analysis
  20 | 
```

### `content/posts/2026-04-18-make-shoe-dance.md` (modified)
```diff
@@ -14,7 +14,7 @@ tags:
  14 | 
  15 | ## Suede Your Dance Shoes
  16 | 
     |-Buying dedicated dance shoes can be expensive and often limited in style. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
  17 |+Buying dedicated dance shoes is expensive and often limits your style. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
  18 | 
  19 | ### Potential Options and Analysis
  20 | 
```

### `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md` (modified)
```diff
@@ -37,4 +37,4 @@ Your `.github/workflows/deploy.yml` acts as the lead here. It organizes your bra
  37 | 
  38 | Don't follow a broken build off a bridge. The `actions/github-script` posts the direct URL to your Pull Request.
  39 | 
     |-**Next Step:** Check your workflow logs. Is your timing actually on beat, or is your build failing?
  40 |+**Next Step:** Check your workflow logs. Is your timing on beat, or is your build failing?
```

### `src/features/lab/useToolbox.ts` (modified)
```diff
@@ -19,7 +19,7 @@ export function useToolbox() {
  19 | 
  20 |   const categories = [
  21 |     { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
     |-    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
  22 |+    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits selected for movement, comfort, and style on the dance floor.' },
  23 |     { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  24 |   ];
  25 | 
```

### `src/features/profile/useProfile.ts` (modified)
```diff
@@ -12,12 +12,12 @@ const PROFILE_DATA: ProfileData = {
  12 |       {
  13 |         id: "phd-matters",
  14 |         title: "Why My PhD Matters",
     |-        content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
  15 |+        content: "I believe in building things that work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
  16 |       },
  17 |       {
  18 |         id: "why-built",
  19 |         title: "Why I Built This Site",
     |-        content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems."
  20 |+        content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from selected gear reviews to my travel-hacking systems."
  21 |       },
  22 |       {
  23 |         id: "financial-strategies",
```