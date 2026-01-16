# Deployment Guide for is-a.dev

This guide will help you deploy your portfolio website and get a free `yourname.is-a.dev` domain.

## Prerequisites

1. ✅ Your website is complete (it is!)
2. ✅ It's a personal portfolio (it is!)
3. ✅ It's non-commercial (it is!)
4. You need a GitHub account
5. Your code should be in a GitHub repository

## Step 1: Deploy to GitHub Pages

### Option A: Automatic Deployment (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow file (`.github/workflows/deploy.yml`) will automatically deploy your site

3. **Wait for deployment:**
   - Go to **Actions** tab in your repository
   - Wait for the workflow to complete
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Option B: Manual Deployment

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to your repository → **Settings** → **Pages**
3. Select **Source**: Deploy from a branch
4. Select **Branch**: `main` and folder: `/dist`
5. Click **Save**

## Step 2: Get Your is-a.dev Domain

Based on the [is-a.dev quickstart guide](https://docs.is-a.dev/quickstart/):

### 1. Fork the is-a.dev Repository

- Go to: https://github.com/is-a-dev/register
- Click **Fork** (top right)

### 2. Create Your Domain File

1. In your fork, navigate to the `domains` folder
2. Create a new file named: `yourname.json` (replace `yourname` with your desired subdomain)
   - Example: `sutharsan.json` or `sutha.json`
   - Must be lowercase
   - Must end with `.json`

### 3. Add Domain Configuration

Copy this template and fill in your details:

```json
{
    "owner": {
        "username": "YOUR_GITHUB_USERNAME"
    },
    "records": {
        "CNAME": "YOUR_USERNAME.github.io"
    }
}
```

**For GitHub Pages:**
- If your repo is `username.github.io`, use: `"CNAME": "YOUR_USERNAME.github.io"`
- If your repo has a different name, use: `"CNAME": "YOUR_USERNAME.github.io"` (GitHub Pages will handle the subpath)

**Important:** If your site is at `username.github.io/repo-name`, you'll need to configure the base path in `vite.config.ts` first (see below).

### 4. Create Pull Request

1. Commit your new domain file
2. Push to your fork
3. Create a Pull Request to the main is-a.dev repository
4. Fill out the PR template completely
5. Add a preview link and screenshot of your website
6. Wait for maintainer approval (usually takes a few days)

### 5. Connect the Domain

After your PR is merged:
1. Go to your GitHub repository → **Settings** → **Pages**
2. Add your custom domain: `yourname.is-a.dev`
3. Wait for DNS propagation (can take a few hours)
4. Your site will be live at `https://yourname.is-a.dev`! 🎉

## Alternative: Deploy to Vercel/Netlify

If you prefer Vercel or Netlify instead of GitHub Pages:

### Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. For is-a.dev, use: `"CNAME": "YOUR_PROJECT.vercel.app"`

### Netlify:
1. Drag and drop your `dist` folder to [Netlify](https://app.netlify.com)
2. For is-a.dev, use: `"CNAME": "YOUR_PROJECT.netlify.app"`

## Troubleshooting

### If your site is in a subdirectory (e.g., `/repo-name`)

Update `vite.config.ts` to include:
```typescript
base: '/repo-name/',
```

Then rebuild and redeploy.

### Domain not working?

1. Check DNS propagation: https://dnschecker.org
2. Verify your CNAME record in GitHub Pages settings
3. Make sure your PR was merged in is-a.dev repository
4. Wait 24-48 hours for full propagation

## Quick Reference

- **is-a.dev Docs**: https://docs.is-a.dev/quickstart/
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Domain Structure**: https://docs.is-a.dev/domain-structure/
- **Valid Filenames**: https://docs.is-a.dev/valid-filenames/

Good luck with your deployment! 🚀
