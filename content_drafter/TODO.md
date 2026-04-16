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


