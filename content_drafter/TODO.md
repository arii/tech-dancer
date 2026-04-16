you are creating a tool to assist in structured text blog posts

I have created content_drafter.html as an initial draft but you shoul make sure this is a correct site and robust.

in content_drafter.html update the todo:          this should be arii/tech-dancer or automated from github properties?
            // TODO: Replace with your actual GitHub username/org and repository name
            const repoOwner = "YOUR_GITHUB_USERNAME"; 
            const repoName = "YOUR_REPO_NAME";

The overall goal is to create an Issue-to-PR Pipeline (GitHub Action)
When you submit an issue from your Drafter, this Action will wake up, extract the Markdown, save it to a file, and open a Pull Request.

This pull request should create a new page for blog posts 


In your repository, create a new folder path: .github/workflows/.
Inside that folder, create a file named issue_to_pr.yml.
Paste the following code into the file and commit it:
name: Generate PR from Content Issue

on:
  issues:
    types: [opened, edited]

jobs:
  build-and-pr:
    runs-on: ubuntu-latest
    # SECURITY GATE: ONLY run if the issue was opened by YOU
    # Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub handle!
    if: github.event.issue.user.login == 'YOUR_GITHUB_USERNAME'
    
    permissions:
      contents: write
      pull-requests: write
      issues: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'

      - name: Parse Issue and Generate Markdown File
        env:
          ISSUE_BODY: ${{ github.event.issue.body }}
          ISSUE_TITLE: ${{ github.event.issue.title }}
        run: |
          import os
          import re
          from datetime import datetime

          body = os.environ['ISSUE_BODY']
          title = os.environ['ISSUE_TITLE'].replace('Draft: ', '').strip()
          
          # Extract the Markdown block using regex (ignoring the JSON block for now)
          match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
          if not match:
              print("No markdown block found in issue. Exiting.")
              exit(1)
              
          content = match.group(1).strip()
          
          # Create filename based on date and safe title
          date_str = datetime.now().strftime('%Y-%m-%d')
          safe_title = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
          filename = f"content/posts/{date_str}-{safe_title}.md"
          
          # Ensure target directory exists
          os.makedirs('content/posts/', exist_ok=True)
          
          # Write content to file
          with open(filename, 'w', encoding='utf-8') as f:
              f.write(content)
              
          print(f"File created: {filename}")
          
          # Save variables to environment for the next step
          with open(os.environ['GITHUB_ENV'], 'a') as f:
              f.write(f"NEW_FILE={filename}\n")
              f.write(f"SAFE_TITLE={safe_title}\n")

      - name: Commit and Create Pull Request
        env:
          GH_TOKEN: ${{ secrets.PAT_TOKEN }} # Uses your Fine-Grained Token
          ISSUE_NUMBER: ${{ github.event.issue.number }}
        run: |
          # Setup Git Identity
          git config --global user.name "Tech-Dancer Content Bot"
          git config --global user.email "bot@tech-dancer.com"

          # Create a new branch
          BRANCH_NAME="content/issue-${ISSUE_NUMBER}-${SAFE_TITLE}"
          git checkout -b $BRANCH_NAME

          # Commit the new file
          git add ${{ env.NEW_FILE }}
          git commit -m "Add new blog post draft from Issue #${ISSUE_NUMBER}"
          git push -u origin $BRANCH_NAME

          # Create the Pull Request using GitHub CLI
          gh pr create \
            --title "📝 New Post Draft: ${{ github.event.issue.title }}" \
            --body "Automated PR generated from Issue #${ISSUE_NUMBER}. Please review the markdown, formatting, and affiliate links before merging." \
            --base main \
            --head $BRANCH_NAME
            
      - name: Comment on Original Issue
        env:
          GH_TOKEN: ${{ secrets.PAT_TOKEN }}
          ISSUE_NUMBER: ${{ github.event.issue.number }}
        run: |
          gh issue comment $ISSUE_NUMBER --body "✅ Draft successfully processed! I've opened a Pull Request for your review."




----

Tech-Dancer Content Pipeline: DevOps & Security Guide
This document outlines the architecture and setup instructions for the Tech-Dancer automated content pipeline. By converting front-end form submissions into GitHub Issues, and automatically converting those Issues into Pull Requests, we maintain a strict "Human-in-the-Loop" verification process.
This prevents malicious code injection, ensures high-quality affiliate links, and maintains a clean version history.
Phase 1: Authentication & Token Generation
To allow GitHub Actions to automatically create branches and Pull Requests on your behalf, you need to ensure the action has the correct permissions.
1. Enable Workflow Read/Write Permissions
By default, GitHub Actions might only have "Read" access. You need to elevate this:
Go to your GitHub Repository Settings.
Scroll down the left sidebar to Actions > General.
Under Workflow permissions, select Read and write permissions.
Check the box that says Allow GitHub Actions to create and approve pull requests.
Click Save.
2. Creating a Personal Access Token (Optional but Recommended)
While the default GITHUB_TOKEN works for most things, if you ever want this workflow to trigger other workflows (like a site rebuild), you should use a Fine-Grained Personal Access Token (PAT):
Go to your GitHub Profile Settings > Developer Settings > Personal access tokens > Fine-grained tokens.
Click Generate new token.
Name it CONTENT_PIPELINE_TOKEN.
Under Repository Access, select your specific Tech-Dancer repository.
Under Repository Permissions, grant Read & Write access to:
Contents
Pull Requests
Issues
Generate the token and copy it.
Go to your Repository Settings > Secrets and variables > Actions.
Create a New Repository Secret named PAT_TOKEN and paste your copied token.
Phase 2: The Issue-to-Pull-Request GitHub Action
This is the core engine. When you click "Submit to GitHub Pipeline" on your drafting tool, it opens an issue. This Action listens for that issue, parses out the Markdown, commits it to a new branch, and opens a Pull Request.
Create a new file in your repository at .github/workflows/issue_to_pr.yml and paste the following:
name: Generate PR from Content Issue

on:
  issues:
    types: [opened, edited]

jobs:
  build-and-pr:
    runs-on: ubuntu-latest
    # SECURITY GATE: ONLY run if the issue was opened by the authorized repository owner!
    # Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub handle.
    if: github.event.issue.user.login == 'YOUR_GITHUB_USERNAME'
    
    permissions:
      contents: write
      pull-requests: write
      issues: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'

      - name: Parse Issue and Generate Markdown File
        env:
          ISSUE_BODY: ${{ github.event.issue.body }}
          ISSUE_TITLE: ${{ github.event.issue.title }}
          ISSUE_NUMBER: ${{ github.event.issue.number }}
        run: |
          import os
          import re
          from datetime import datetime

          body = os.environ['ISSUE_BODY']
          title = os.environ['ISSUE_TITLE'].replace('Draft: ', '').strip()
          
          # Extract the Markdown block using regex
          match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
          if not match:
              print("No markdown block found in issue.")
              exit(1)
              
          content = match.group(1)
          
          # Create filename based on date and title
          date_str = datetime.now().strftime('%Y-%m-%d')
          safe_title = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
          filename = f"content/posts/{date_str}-{safe_title}.md"
          
          # Ensure directory exists
          os.makedirs('content/posts/', exist_ok=True)
          
          # Write content to file
          with open(filename, 'w') as f:
              f.write(content)
              
          print(f"File created: {filename}")
          
          # Save filename to environment for next steps
          with open(os.environ['GITHUB_ENV'], 'a') as f:
              f.write(f"NEW_FILE={filename}\n")
              f.write(f"SAFE_TITLE={safe_title}\n")

      - name: Commit and Create Pull Request
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Or secrets.PAT_TOKEN
          ISSUE_NUMBER: ${{ github.event.issue.number }}
        run: |
          # Setup Git Identity
          git config --global user.name "Tech-Dancer Content Bot"
          git config --global user.email "bot@tech-dancer.com"

          # Create a new branch
          BRANCH_NAME="content/issue-${ISSUE_NUMBER}-${SAFE_TITLE}"
          git checkout -b $BRANCH_NAME

          # Commit the new file
          git add ${{ env.NEW_FILE }}
          git commit -m "Add new blog post draft from Issue #${ISSUE_NUMBER}"
          git push -u origin $BRANCH_NAME

          # Create the Pull Request using GitHub CLI
          gh pr create \
            --title "📝 New Post Draft: ${{ github.event.issue.title }}" \
            --body "Automated PR generated from Issue #${ISSUE_NUMBER}. Please review the markdown and affiliate links before merging." \
            --base main \
            --head $BRANCH_NAME
            
      - name: Comment on Issue
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ISSUE_NUMBER: ${{ github.event.issue.number }}
        run: |
          gh issue comment $ISSUE_NUMBER --body "✅ I've processed this draft and opened a Pull Request for your review!"


Phase 3: Intermediate Steps for Verification (Human-in-the-Loop)
To ensure maximum security and quality control, do not allow this pipeline to merge automatically. You must enforce verification steps.
1. Repository Branch Protection
You need to prevent accidental or malicious pushes directly to your live site.
Go to Settings > Branches.
Click Add branch protection rule.
Set Branch name pattern to main (or master).
Check Require a pull request before merging.
Check Require approvals (set to at least 1).
Click Create.
2. The Verification Workflow
When the GitHub Action completes, you will have a shiny new Pull Request. Before clicking "Merge", follow this checklist:
[ ] Review the Diff: Go to the "Files changed" tab in the PR. Ensure the Markdown is clean and exactly what you expect.
[ ] Verify Affiliate Links: Check the href tags in your markdown to ensure your Amazon/affiliate tracking tags haven't been altered or stripped.
[ ] Check Image Paths: Ensure the image placeholders (e.g., ![Product Name](image_filename.jpg)) match the actual image files you are uploading to your /assets/images/ directory.
[ ] Preview Deploy (Optional but Recommended): If you use Netlify, Vercel, or Cloudflare Pages to host your static site, ensure their GitHub integration is set up to generate "Preview Deployments" for Pull Requests. This allows you to click a link and see exactly what the post looks like on your live site before you actually merge it.
3. Merging and Deployment
Once the PR is reviewed and approved, click Squash and Merge.
This will merge the content into your main branch, automatically close the original tracking Issue, and trigger your hosting provider to rebuild the live website.
