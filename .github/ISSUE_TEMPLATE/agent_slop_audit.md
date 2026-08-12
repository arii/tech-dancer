---
name: 'Agent: AI Slop & Code Drift Audit'
about: Scan the codebase for banned language/patterns and prevent drift.
title: 'feat: AI Slop & Code Drift Audit'
labels: agent-workflow, slop-audit
assignees: ''

---

# AI Slop & Code Drift Audit Instructions

This workflow targets and resolves AI slop (unnecessary, weak, or AI-generated cliches) and codebase/runtime configuration drift within the repository.

Before executing, review `.agents/AGENT_CONTRACT.md` and `.agents/INSTRUCTION_LAYERS.md`.

## 1. Goal
Identify and systematically replace banned phrases, weak intensifiers, corporate jargon, and mismatched terminology with clear, direct, and repository-compliant wording. Prevent configuration, runtime, or schema drift across the workspaces.

## 2. Standard Audit Process

### Step 1: Execute the AI Slop Auditor
Run the auditor script to generate the current findings and build a prioritization list:

```bash
python3 .agents/scripts/audit-ai-slop.py
```

### Step 2: Read the Generated Report
Locate the generated report under `.agents/workflows/ai-slop-audit-<TIMESTAMP>.md` or the console output.
The report will categorize findings and assign priorities:
- **🔴 Critical**: About / Landing pages (`src/pages/About.tsx`, `src/pages/Home.tsx`, etc.)
- **🟠 High**: Blog or reference content (`content/`)
- **🟡 Normal**: Other source/test/config files

### Step 3: Map and Resolve Violations
For each detected violation, replace the banned term with its approved alternative as defined in `.agents/audit.config.yaml`:
- **Weak Intensifiers** (e.g., actually, really, basically, kind of, sort of): Delete or replace with direct statements.
- **Corporate Speak** (e.g., curated, synergy, next-level, cutting-edge, empower, industry-leading): Replace with specific, active verbs (selected, tested, chosen).
- **Credential Crutch** (e.g., As a PhD, In my research, Given my robotics, My analysis suggests): Delete or provide specific examples instead.
- **Academic Scaffolding** (e.g., Utilize, Facilitate, Methodology, Pedagogical, It was observed): Replace with active verbs (Use, Fix, Help, Method, Teaching).
- **WCS Conflicts** (e.g., The Circuit, Circuit Points, Point Chasing): Use approved terminology (WCS Events, WSDC Database, Registry Standing, etc.).
- **Robotics Jargon** (e.g., Kinetics, Signal Latency, Actuate, Interface): Use dance terminology (Momentum, Connection Delay, Move, Communication).
- **Passive Voice** (e.g., can be, will be, is seen, is applied, is facilitated): Convert to active voice.
- **False Authority** (e.g., Studies show, Everyone agrees, As we can see, It's important to note): Delete or provide specific evidence.
- **AI Cliches** (e.g., Tapestry, Vibrant, Testament, Unlock your potential, Game-changing, Unprecedented, Journey, Heartbeat, Quintessential, Strategic Vulnerability, Narrative Grounding, In the world of, But the reality is, Picture this): Delete immediately.

### Step 4: Verify Workspace and Schema Consistency
Prevent configuration and schema drift:
1. Ensure runtime consistency by running:
   ```bash
   pnpm run doctor
   ```
2. Verify that there is no configuration or schema drift.
3. Run project build and tests to verify that no layout, component, or config files were broken by cleanups:
   ```bash
   pnpm run build
   pnpm run test
   ```

## 3. Reporting and Submission
Once changes are made and verified, document findings in a pull request or audit log.
- Do not commit changes if tests, lints, or builds fail.
- All commits must follow clean, standardized Git messages.
