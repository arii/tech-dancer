#!/usr/bin/env python3
"""
AI Slop Audit Script

Searches codebase for banned language per BANLIST.md and APPROVEDLIST.md
Generates actionable audit report with before/after fixes
"""

import os
import re
import subprocess
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Tuple

# Banned term categories
BANNED_TERMS = {
    "weak_intensifiers": ["actually", "really", "basically", "kind of", "sort of"],
    "corporate_speak": ["curated", "synergy", "next-level", "cutting-edge", "empower", "industry-leading"],
    "credential_crutch": ["As a PhD", "In my research", "Given my robotics", "My analysis suggests"],
    "academic_scaffolding": ["Utilize", "Facilitate", "Methodology", "Pedagogical", "It was observed"],
    "wcs_conflicts": ["The Circuit", "Circuit Points", "Point Chasing"],
    "robotics_jargon": ["Kinetics", "Signal Latency", "Actuate", "Interface"],
    "passive_voice": ["can be", "will be", "is seen", "is applied", "is facilitated"],
    "false_authority": ["Studies show", "Everyone agrees", "As we can see", "It's important to note"],
    "ai_cliches": ["Tapestry", "Vibrant", "Testament", "Unlock your potential", "Game-changing", 
                   "Unprecedented", "Journey", "Heartbeat", "Quintessential", "Strategic Vulnerability",
                   "Narrative Grounding", "In the world of", "But the reality is", "Picture this"],
}

APPROVED_FIXES = {
    "actually": "Delete",
    "really": "Delete",
    "curated": "Replace with: selected, tested, chosen",
    "fantastic": "Delete or be specific",
    "can be": "Convert to active voice",
    "utilize": "Replace with: use, do",
    "facilitate": "Replace with: fix, help, enable",
    "As a PhD": "Delete",
}

class AISlopAuditor:
    def __init__(self, root_dir: str = "."):
        self.root_dir = Path(root_dir)
        self.violations: List[Dict] = []
        self.exclude_dirs = {"node_modules", "dist", ".git", ".playwright", "test-results"}
        self.file_extensions = {".tsx", ".ts", ".md", ".jsx", ".js"}
    
    def search_violations(self) -> None:
        """Search entire codebase for banned terms"""
        print("🔍 Scanning codebase for banned language...")
        
        for category, terms in BANNED_TERMS.items():
            for term in terms:
                # Build grep pattern (case-insensitive for most terms)
                pattern = f"\\b{re.escape(term)}\\b"
                
                # Run grep
                try:
                    result = subprocess.run(
                        ["grep", "-r", "-n", pattern, "src/", "content/", 
                         "--include=*.tsx", "--include=*.ts", "--include=*.md"],
                        capture_output=True,
                        text=True,
                        cwd=str(self.root_dir)
                    )
                    
                    if result.stdout:
                        for line in result.stdout.strip().split("\n"):
                            if not line or "node_modules" in line:
                                continue
                            
                            parts = line.split(":", 2)
                            if len(parts) >= 3:
                                file_path, line_num, content = parts[0], parts[1], ":".join(parts[2:])
                                
                                self.violations.append({
                                    "file": file_path,
                                    "line": line_num,
                                    "content": content.strip(),
                                    "term": term,
                                    "category": category,
                                    "fix": APPROVED_FIXES.get(term, f"Fix per {category}")
                                })
                
                except subprocess.CalledProcessError:
                    pass  # No matches for this term
    
    def prioritize_violations(self) -> None:
        """Sort violations by priority"""
        # Critical files (About page, landing page)
        critical_files = {
            "src/features/profile/useProfile.ts",
            "src/features/dashboard/Dashboard.tsx",
            "src/pages/Home.tsx",
            "src/pages/About.tsx"
        }
        
        def priority(v):
            if v["file"] in critical_files:
                return (0, v["file"], int(v["line"]))  # Priority 0 = critical
            elif "content/" in v["file"]:
                return (1, v["file"], int(v["line"]))  # Priority 1 = high
            else:
                return (2, v["file"], int(v["line"]))  # Priority 2 = normal
        
        self.violations.sort(key=priority)
    
    def generate_report(self) -> str:
        """Generate markdown audit report"""
        now = datetime.now().isoformat()
        
        report = f"""# AI Slop Audit Report

**Generated:** {now}  
**Total Violations:** {len(self.violations)}

---

## Violations by Category

"""
        
        # Group by category
        by_category = {}
        for v in self.violations:
            cat = v["category"]
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append(v)
        
        for category in sorted(by_category.keys()):
            violations = by_category[category]
            report += f"\n### {category.replace('_', ' ').title()} ({len(violations)} violations)\n\n"
            
            for i, v in enumerate(violations, 1):
                priority = "🔴 Critical" if "profile" in v["file"] or "dashboard" in v["file"] else "🟠 High" if "content/" in v["file"] else "🟡 Normal"
                report += f"{i}. **File:** `{v['file']}` (line {v['line']})\n"
                report += f"   **Term:** `{v['term']}`\n"
                report += f"   **Priority:** {priority}\n"
                report += f"   **Fix:** {v['fix']}\n"
                report += f"   **Context:** `...{v['content'][:100]}...`\n\n"
        
        # Action plan
        report += "\n---\n\n## Action Plan\n\n"
        report += f"Total violations found: {len(self.violations)}\n\n"
        
        # Group by priority
        critical = [v for v in self.violations if "profile" in v["file"] or "dashboard" in v["file"]]
        high = [v for v in self.violations if "content/" in v["file"] and v not in critical]
        
        report += f"- **Critical (About/Landing pages):** {len(critical)} violations\n"
        report += f"- **High (Content):** {len(high)} violations\n"
        report += f"- **Normal (Other):** {len(self.violations) - len(critical) - len(high)} violations\n\n"
        
        report += "## Next Steps\n\n"
        report += "1. Review violations by priority\n"
        report += "2. Fix critical violations first\n"
        report += "3. Run `pnpm build` to verify no breaking changes\n"
        report += "4. Commit with clear message referencing this audit\n\n"
        
        report += "---\n\n"
        report += "**Reference:** See `.agent/BANLIST.md` and `.agent/APPROVEDLIST.md` for full standards\n"
        
        return report
    
    def run(self) -> str:
        """Execute full audit"""
        self.search_violations()
        self.prioritize_violations()
        return self.generate_report()

def main():
    auditor = AISlopAuditor()
    report = auditor.run()
    
    # Output report
    print(report)
    
    # Save to file
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    output_file = Path(".agent/workflows") / f"ai-slop-audit-{timestamp}.md"
    output_file.write_text(report)
    
    print(f"\n✅ Report saved to: {output_file}")
    print(f"📊 Found {len(auditor.violations)} violations")

if __name__ == "__main__":
    main()
