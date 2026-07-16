# Comprehensive Guide: Isolating boomtick-pkg into the arii/boomtick Submodule

Isolating the existing `boomtick-pkg` folder into a Git submodule without breaking your current repository requires moving the folder's history into a new repository, then linking it back to the main project.

Follow these exact steps to execute this cleanly on your codebase.

---

## Part 1: Submodule Migration & Setup

### Step 1: Create the New Repo for the Submodule

We will extract the `boomtick-pkg` folder and its complete commit history, placing it into the new repository directory at `/home/ari/boomtick`.

Open your terminal and navigate to your main repository (located at `/home/ari/tech-dancer`):

```bash
cd /home/ari/tech-dancer
```

Run the following commands to extract the target folder and its commit history into a temporary branch, then pull it into the new local directory at `/home/ari/boomtick`:

```bash
# Extract the directory history into an isolated temporary branch
git subtree split -P "boomtick-pkg" -b temp-boomtick-branch

# Create the new repository directory
mkdir -p /home/ari/boomtick
cd /home/ari/boomtick
git init

# Pull the history from your main repository's temporary branch
git pull /home/ari/tech-dancer temp-boomtick-branch
```

Link this local repository to your remote hosting service (GitHub) under the namespace `arii/boomtick` and push the code:

```bash
git remote add origin git@github.com:arii/boomtick.git
git branch -M main
git push -u origin main
```

### Step 2: Delete the Old Folder from the Main Repo

Now, clean up the original folder from your main project so it doesn't cause conflicts during the submodule registration.

Return to your main repository:

```bash
cd /home/ari/tech-dancer
```

Remove the original folder from Git's tracking (without deleting it from your local disk just yet, preserving any uncommitted work):

```bash
git rm -r --cached "boomtick-pkg"
```

Commit this change:

```bash
git commit -m "Remove boomtick-pkg to prepare for submodule"
```

### Step 3: Add the Folder Back as a Submodule

Link your new remote repository `arii/boomtick` back into the main project at its original path.

Add the submodule using the remote URL:

```bash
git submodule add git@github.com:arii/boomtick.git "boomtick-pkg"
```

Commit the new `.gitmodules` file configuration and the updated submodule pointer:

```bash
git commit -m "Add boomtick-pkg as a submodule"
```

> [!NOTE]
> To ensure your teammates do not encounter broken builds, remind them to pull and initialize submodules after fetching by running:
> `git submodule update --init --recursive`

---

## Part 2: Pull Request Workflow

Handling Pull Requests (PRs) that involve changes to both the parent repository (`tech-dancer`) and the `arii/boomtick` submodule requires a strict workflow. Because Git submodules track specific commit hashes (pointers) rather than live branches, a mismatch can easily break CI/CD pipelines.

### The Golden Rule: Submodule First, Parent Second
Never merge a parent repository PR that points to a submodule commit that only exists locally or on an unmerged submodule branch.
If you merge the parent first, your teammates and CI/CD pipelines will fail with a "commit not found" error when they attempt to fetch the new submodule commit hash.

### Step-by-Step PR Workflow

1. **Make Changes and Push the Submodule**
   Always start your work inside the submodule directory:
   ```bash
   cd /home/ari/tech-dancer/boomtick-pkg
   git checkout -b feature/your-submodule-change
   # ... make your code changes (e.g., in boomtick-pkg/lib/codeReviewOrchestrator.ts) ...
   git add .
   git commit -m "Fix bug in boomtick-pkg core orchestrator"
   git push origin feature/your-submodule-change
   ```

2. **Create the Submodule PR**
   Go to GitHub and open a Pull Request for the `arii/boomtick` repository, merging `feature/your-submodule-change` into `main`.

3. **Update the Parent Repository**
   Once the submodule changes are pushed (and ideally merged), return to the parent repository to update its pointer:
   ```bash
   cd /home/ari/tech-dancer
   git checkout -b feature/parent-integration
   # Git will notice that the submodule is pointing to a new commit hash
   git add boomtick-pkg
   git commit -m "Update boomtick-pkg submodule pointer"
   git push origin feature/parent-integration
   ```

4. **Create the Parent PR and Link Them**
   Open a PR for the parent repository. In the description of both PRs, cross-reference them (e.g., "This PR depends on `arii/boomtick` PR #12"). Do not merge the parent PR until the submodule PR is approved and merged.

### Automation and CI/CD Best Practices
Enforce on-demand submodule push checks. Block pushes to the parent repo if you forgot to push your submodule changes. Run this in your parent repository:
```bash
git config push.recurseSubmodules check
```

---

## Part 3: GitHub Actions & Reusable Workflows

GitHub Actions cannot natively call a reusable workflow via a local folder path of a submodule (e.g., `./boomtick-pkg/.github/...` is invalid). You must use one of the two strategies below. 

### Option A: The Global Reference Strategy (Reusable Workflows)

1. **Set Up the Reusable Workflow in the Submodule (arii/boomtick)**
   In `arii/boomtick`, configure `.github/workflows/release-logic.yml` to support the `workflow_call` trigger.

   ```yaml
   # Inside arii/boomtick: .github/workflows/release-logic.yml
   name: Reusable Release Logic
   on:
     workflow_call:

   jobs:
     build-and-validate:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Caller Repo & Submodules
           uses: actions/checkout@v7
           with:
             submodules: recursive

         - name: Install pnpm
           uses: pnpm/action-setup@v4
           with:
             version: 10.28.2 # Strictly pinned repository manager version

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version-file: '.node-version' # Use .node-version file for strict contract matching
             cache: 'pnpm'

         - name: Install Dependencies
           run: pnpm install --frozen-lockfile

         - name: Run Lint & Typecheck
           run: pnpm --filter mcp run lint-typecheck
   ```

2. **Reference the Submodule Workflow Globally in the Parent Repo**
   In `tech-dancer`, reference the submodule workflow using its global coordinate:

   ```yaml
   # Inside tech-dancer: .github/workflows/ci.yml
   name: Execute Shared Pipeline
   on:
     push:
       branches: [ main ]

   jobs:
     call-shared-workflow:
       # Syntax: {owner}/{submodule-repo-name}/{path}@{ref}
       uses: arii/boomtick/.github/workflows/release-logic.yml@main
   ```

   > [!NOTE]
   > If `arii/boomtick` is private, navigate to the repo's Settings -> Actions -> General and check "Allow access to repositories in the organization" to grant permissions to `tech-dancer`.

3. **Testing Workflows during PRs**
   When updating a workflow on a feature branch, you must temporarily point the parent's `uses` statement to your submodule feature branch:
   `uses: arii/boomtick/.github/workflows/release-logic.yml@feature/your-submodule-change`

   Change this back to `@main` right before merging the parent PR.

### Option B: The Local Path Strategy (Composite Actions)

Since your submodule already contains real composite actions inside `boomtick-pkg/mcp/actions/`, this is the most elegant approach. You can reference them locally without changing branch pointers back and forth in your YAML files.

1. **Analyze your Submodule's Composite Action**
   Your submodule has actions configured locally, such as `boomtick-pkg/mcp/actions/lint-typecheck/action.yml`:

   ```yaml
   # Inside arii/boomtick: mcp/actions/lint-typecheck/action.yml
   name: Submodule Lint and Typecheck
   description: Run lint and typechecking inside the submodule MCP environment
   runs:
     using: "composite"
     steps:
       - name: Install pnpm
         uses: pnpm/action-setup@v4
         with:
           version: 10.28.2 # Pinned repository manager version

       - name: Set up Node.js
         uses: actions/setup-node@v4
         with:
           node-version-file: '.node-version'
           cache: 'pnpm'

       - name: Install Dependencies
         shell: bash
         run: pnpm install --frozen-lockfile

       - name: Run Lint
         shell: bash
         run: pnpm --filter mcp run lint
   ```

2. **Call the Action Locally from the Parent Repo**
   Because the submodule code is checked out locally, the parent can reference the action directly using a local file path. It will automatically run the exact version of the action currently pinned by the parent submodule pointer.

   ```yaml
   # Inside tech-dancer: .github/workflows/ci.yml
   name: Parent CI Workflow
   on: [push]

   jobs:
     run-submodule-tasks:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Parent with Submodules
           uses: actions/checkout@v7
           with:
             submodules: recursive # Grabs the submodule files first

         - name: Run Submodule Lint & Typecheck
           uses: ./boomtick-pkg/mcp/actions/lint-typecheck # Works locally!
   ```

---

## Part 4: Handling Secrets in Shared CI Pipelines

### Method A: If Using Reusable Workflows (Option A)

1. **Secret Inheritance (Simplest)**
   If both repositories belong to the same GitHub Organization or user account, pass all secrets implicitly using `secrets: inherit`:
   ```yaml
   # Inside Parent Repository Workflow:
   jobs:
     run-pipeline:
       uses: arii/boomtick/.github/workflows/release-logic.yml@main
       secrets: inherit # Automatically passes parent secrets down (e.g., GEMINI_API_KEY)
   ```

2. **Explicit Secret Mapping (Granular Control)**
   Alternatively, define and map secrets explicitly:
   ```yaml
   # 1. Inside the SUBMODULE repo workflow file (.github/workflows/release-logic.yml)
   on:
     workflow_call:
       secrets:
         GEMINI_API_KEY:
           required: true

   # 2. Inside the PARENT repo workflow file
   jobs:
     run-pipeline:
       uses: arii/boomtick/.github/workflows/release-logic.yml@main
       secrets:
         GEMINI_API_KEY: ${{ secrets.PARENT_GEMINI_API_KEY }}
   ```

### Method B: If Using Composite Actions (Option B)

Composite Actions do not support the `secrets` or `secrets: inherit` blocks. You must pass secrets as standard input variables (`inputs` / `with` block).

1. **Define Secret Input in Submodule Action**
   ```yaml
   # Inside arii/boomtick: mcp/actions/ai-review/action.yml
   inputs:
     gemini-api-key:
       description: 'Gemini API Key for model calls'
       required: true
   runs:
     using: "composite"
     steps:
       - name: Run AI Agent Tasks
         shell: bash
         env:
           GEMINI_API_KEY: ${{ inputs.gemini-api-key }}
         run: |
           pnpm --filter mcp run start
   ```

2. **Pass Parent Secret in Parent Workflow**
   ```yaml
   # Inside Parent Repository Workflow (tech-dancer)
   jobs:
     execute-composite:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
           with:
             submodules: recursive

         - name: Run Submodule Action
           uses: ./boomtick-pkg/mcp/actions/ai-review
           with:
             gemini-api-key: ${{ secrets.PARENT_GEMINI_API_KEY }} # Pass secret into input
   ```

---

## Part 5: Seamless Submodule Development via td

To abstract the complexity of submodules for your team, you can add helper scripts or configurations to your internal command-line tool, `td`. This lowers developer overhead and ensures consistent environments.

Below are configurations to integrate into your `td` wrapper (whether it is built in Bash, Python, or Node).

### 1. td Subcommands to Implement

| Command | Action Performed | Benefit |
| :--- | :--- | :--- |
| `td submodule setup` | Runs `bash .githooks/setup-hooks.sh` | Configures local hooks in one command. |
| `td submodule sync` | Runs `git submodule update --init --recursive` | Quickly synchronizes local files after a checkout/pull if automatic hooks are bypassed. |
| `td submodule status` | Runs `git submodule status` | Visualizes the current commit state of `boomtick-pkg` and displays if it is ahead/dirty. |

### 2. Implementation Reference (Bash-based CLI Wrapper)

If your `td` is managed via a shell script runner, add this block to route submodule actions:

```bash
# Inside td command routing:
case "$1" in
  submodule)
    subcommand="$2"
    case "$subcommand" in
      setup)
        echo "Configuring repository Git hooks..."
        bash .githooks/setup-hooks.sh
        ;;
      sync)
        echo "Updating and synchronizing all submodules..."
        git submodule update --init --recursive
        echo "Submodule synchronization complete."
        ;;
      status)
        git submodule status
        ;;
      *)
        echo "Usage: td submodule {setup|sync|status}"
        exit 1
        ;;
    esac
    ;;
esac
```

---

## Part 6: Updating and Reloading the MCP Agent

Your `boomtick-pkg` codebase functions as an MCP (Model Context Protocol) agent server. When making active changes inside `boomtick-pkg`, you must rebuild and restart your local agent process for the changes to apply to your local development client (such as Claude Desktop, Cursor, or your custom `tech-dancer` orchestrator).

### Step 1: Update the Code
Navigate into the submodule, checkout your feature branch, and update the TypeScript codebase (e.g., adding custom tools or enhancing prompt templates):
```bash
cd /home/ari/tech-dancer/boomtick-pkg
# Make changes to the agent logic...
```

### Step 2: Build the Submodule
Since the submodule package is built inside a workspace, compile the build targets using pnpm:
```bash
# Recompile the MCP bundle
pnpm --filter mcp run build
```

### Step 3: Local Process Reload (The Development Cycle)

#### Case A: If Using Claude Desktop (Desktop Client)
If Claude Desktop is running your MCP server locally, it holds a persistent link to the built binary. You must completely restart the desktop client to pick up the updated code:
1. Quit Claude Desktop (Cmd + Q or Alt + F4).
2. Reopen Claude Desktop.

#### Case B: If Running as a Live Local Service
If your agent runs as a daemonized or active system service (e.g., PM2, Docker, or Node daemon):
```bash
# PM2 Restart
pm2 restart tech-dancer-mcp

# Or direct CLI restart
td agent restart
```

### Step 4: Automate the Cycle with td
Combine editing, compiling, and reloading into a single command by extending `td`:

```bash
# Inside td command routing:
case "$1" in
  agent)
    subcommand="$2"
    case "$subcommand" in
      update)
        echo "Fetching newest submodule changes..."
        git submodule update --remote --merge
        echo "Rebuilding MCP Agent bundle..."
        pnpm --filter mcp run build
        echo "✓ Agent updated successfully. Please restart your client."
        ;;
      restart)
        echo "Restarting local agent runtime..."
        # Insert specific PM2, Docker, or Node execution relaunch processes here
        pnpm --filter mcp run restart
        ;;
    esac
    ;;
esac
```
