<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Tech-Dancer Content Pipeline

This repository hosts the Tech-Dancer Content Drafter and its automated CI/CD pipeline. The system provides a "Human-in-the-Loop" workflow: you draft content using the web UI, submit it as an Issue, and GitHub Actions automatically extracts the content into a Markdown file and opens a Pull Request for your final review before merging.

## Setup Instructions

### 1. Enable GitHub Pages
To use the Content Drafter tool, you need to host `index.html` via GitHub Pages:
1. Go to your repository's **Settings**.
2. On the left sidebar, click **Pages**.
3. Under "Build and deployment", set the source to **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder.
5. Click **Save**. Your drafter will be available at `https://<your-username>.github.io/<your-repo-name>/`.

### 2. Configure GitHub Actions Permissions
1. Go to **Settings**.
2. On the left sidebar, go to **Actions > General**.
3. Under "Workflow permissions", select **Read and write permissions**.
4. Check the box for **Allow GitHub Actions to create and approve pull requests**.
5. Click **Save**.

### 3. Setup the Personal Access Token (PAT_TOKEN)
The workflow requires a Fine-Grained Personal Access Token to create branches, open Pull Requests, and comment on Issues.
1. Go to your GitHub Profile **Settings > Developer Settings > Personal access tokens > Fine-grained tokens**.
2. Click **Generate new token** and name it `CONTENT_PIPELINE_TOKEN`.
3. Under "Repository Access", select **Only select repositories** and choose this repository.
4. Under "Repository Permissions", grant **Read and Write** access for:
   - `Contents`
   - `Pull Requests`
   - `Issues`
5. Generate the token and copy it.
6. Go back to this repository's **Settings > Secrets and variables > Actions**.
7. Click **New repository secret**, name it `PAT_TOKEN`, and paste the copied token.

### 4. Enable Branch Protection (Verification & Governance)
To ensure human review before content goes live:
1. Go to **Settings**.
2. On the left sidebar, click **Branches**, then **Add branch protection rule**.
3. Set "Branch name pattern" to `main`.
4. Check **Require a pull request before merging**.
5. Check **Require approvals** and set it to at least `1`.
6. Click **Create**.

## Workflow Overview

1. **Draft**: Open the GitHub Pages URL and use the Content Drafter to generate your post, SEO keywords, and affiliate links.
2. **Submit**: Click "Submit to GitHub Pipeline" to pre-fill an Issue.
3. **Automate**: The GitHub Action `.github/workflows/issue_to_pr.yml` automatically extracts the Markdown, commits it to a new branch, and opens a Pull Request.
4. **Review**: Manually verify the markdown, affiliate tracking IDs, and image paths in the Pull Request.
5. **Deploy**: Once approved, click **Squash and Merge** to publish your post.

---

*Note on Local Development (Optional):*
If you wish to run the app locally, you will need Node.js.
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
