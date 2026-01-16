# Register sutharsan.is-a.dev Domain

This guide will help you register the domain **sutharsan.is-a.dev** for your portfolio.

## Step-by-Step Instructions

### Step 1: Deploy Your Website First

Before registering the domain, make sure your website is deployed and accessible:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Wait for the deployment to complete
   - Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 2: Fork the is-a.dev Repository

1. Go to: **https://github.com/is-a-dev/register**
2. Click the **Fork** button (top right)
3. Wait for the fork to complete

### Step 3: Create the Domain File

1. In your fork, navigate to the **`domains`** folder
2. Click **Add file** → **Create new file**
3. Name the file: **`sutharsan.json`** (must be exactly this name, lowercase)
4. Copy the contents from `sutharsan.json` in this repository
5. **Replace the placeholders**:
   - `YOUR_GITHUB_USERNAME` → Your actual GitHub username
   - `YOUR_USERNAME.github.io` → Your GitHub Pages URL
   
   **Example:**
   ```json
   {
       "owner": {
           "username": "sutharsan"
       },
       "records": {
           "CNAME": "sutharsan.github.io"
       }
   }
   ```
   
   **Note:** If your repo is NOT named `username.github.io`, you still use `YOUR_USERNAME.github.io` in the CNAME record.

6. Click **Commit new file**

### Step 4: Create Pull Request

1. Go to your fork on GitHub
2. Click **Contribute** → **Open pull request**
3. **Fill out the PR template completely**:
   - Add a preview link to your website
   - Add a screenshot of your website
   - Don't remove or replace the template
4. Click **Create pull request**

### Step 5: Wait for Approval

- Maintainers will review your PR (usually takes 1-3 days)
- They may request changes - make sure to respond
- Once merged, proceed to Step 6

### Step 6: Connect the Domain

After your PR is merged:

1. Go to your GitHub repository → **Settings** → **Pages**
2. Scroll to **Custom domain** section
3. Enter: **`sutharsan.is-a.dev`**
4. Click **Save**
5. Wait for DNS propagation (can take a few hours to 24 hours)

### Step 7: Verify It Works

1. Visit: **https://sutharsan.is-a.dev**
2. If it doesn't work immediately, wait a few hours and check again
3. You can check DNS propagation at: https://dnschecker.org

## Important Notes

- ✅ Domain name must be **lowercase**: `sutharsan.json`
- ✅ File must be valid JSON (validate at https://jsonlint.com)
- ✅ Your website must be live before creating the PR
- ✅ Include a screenshot and preview link in your PR
- ⏰ DNS propagation can take 24-48 hours

## Troubleshooting

**Domain not working after PR merge?**
- Wait 24 hours for DNS propagation
- Check if you added the domain in GitHub Pages settings
- Verify your CNAME record is correct

**PR was closed?**
- Make sure you filled out the PR template completely
- Ensure your website is actually live and accessible
- Check that the JSON format is valid

## Quick Checklist

- [ ] Website deployed and accessible on GitHub Pages
- [ ] Forked is-a.dev/register repository
- [ ] Created `sutharsan.json` in the `domains` folder
- [ ] Replaced placeholders with your GitHub username
- [ ] Created PR with preview link and screenshot
- [ ] PR merged by maintainers
- [ ] Added `sutharsan.is-a.dev` in GitHub Pages settings
- [ ] Domain is live! 🎉

## Resources

- [is-a.dev Quickstart Guide](https://docs.is-a.dev/quickstart/)
- [Domain Structure Documentation](https://docs.is-a.dev/domain-structure/)
- [Valid Filenames](https://docs.is-a.dev/valid-filenames/)
- [is-a.dev Discord](https://discord.gg/is-a-dev) (for questions)

Good luck! Your domain **sutharsan.is-a.dev** will be live soon! 🚀
