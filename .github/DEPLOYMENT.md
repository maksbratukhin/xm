# Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages on every push to the `main` or `master` branch.

### Setup Steps

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push Your Code:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Monitor Deployment:**
   - Go to **Actions** tab in your repository
   - Watch the CI/CD pipeline run
   - Once complete, your app will be live at: `https://[username].github.io/xm-task/`

### CI/CD Pipeline

The pipeline includes three jobs:

1. **Test** - Runs all unit tests with coverage
2. **Build** - Builds the production Angular app
3. **Deploy** - Deploys to GitHub Pages

### Manual Deployment

If you need to deploy manually:

```bash
# Build for production
npm run build:prod

# The output will be in dist/photo-library/browser/
# You can deploy this folder to any static hosting service
```

### Environment Configuration

The production build is configured with:
- Base href: `/xm-task/`
- Production optimizations enabled
- AOT compilation
- Source maps disabled for smaller bundle size

### Storybook Deployment

Storybook builds are also generated in CI and stored as artifacts. To deploy Storybook separately:

```bash
# Build Storybook
npm run build-storybook

# Deploy storybook-static/ folder to your preferred hosting
```

### Troubleshooting

**Issue:** 404 on GitHub Pages
- **Solution:** Ensure base-href in build:prod script matches your repository name

**Issue:** Pipeline fails on test
- **Solution:** Check the Actions log, ensure all tests pass locally first

**Issue:** Assets not loading
- **Solution:** Verify base-href is set correctly and assets use relative paths

