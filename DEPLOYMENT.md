# 🚀 Deployment Guide

This guide explains how to deploy your React Fundamentals app to Coolify with automatic CI/CD.

## 📋 Prerequisites

- Hetzner server with Coolify installed
- GitHub account
- GitHub CLI installed (`gh`)
- Docker installed (for local testing)

## 🔧 Setup Instructions

### 1. GitHub Repository Setup

```bash
# Authenticate with GitHub CLI
gh auth login

# Create GitHub repository
gh repo create react-fundamentals --public --source=. --remote=origin

# Push your code
git add .
git commit -m "Add deployment configuration"
git push -u origin main
```

### 2. Coolify Configuration

1. **Access Coolify Dashboard**: Log into your Coolify instance
2. **Create New Application**:

   - Click "New Resource" → "Application"
   - Source: GitHub
   - Repository: `your-username/react-fundamentals`
   - Branch: `main`

3. **Application Settings**:

   - **Build Pack**: Docker
   - **Dockerfile**: `./Dockerfile` (uses our multi-stage build)
   - **Port**: `80`
   - **Domain**: Set your desired domain/subdomain
   - **Environment**: Production

4. **Get Webhook URL**:
   - Go to your app settings in Coolify
   - Copy the webhook URL for GitHub Actions

### 3. GitHub Secrets Configuration

In your GitHub repository settings:

1. Navigate to: **Settings** → **Secrets and variables** → **Actions**
2. Add these repository secrets:
   - `COOLIFY_WEBHOOK_URL`: Your Coolify webhook URL
   - `COOLIFY_TOKEN`: Your Coolify API token (generate in Coolify user settings)

### 4. Deployment Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. ✅ Run on every push to `main`
2. 🔍 Lint the code
3. 🏗️ Build the application
4. 🚀 Trigger deployment to Coolify

## 🧪 Testing the Setup

1. **Local Test Build**:

   ```bash
   # Test the build locally
   npm run build

   # Test Docker build
   ./deploy.sh
   ```

2. **Test Auto-Deployment**:
   - Make any change to your code
   - Commit and push to `main`
   - Check GitHub Actions tab for build status
   - Verify deployment in Coolify dashboard

## 🔧 Manual Deployment

If you need to deploy manually:

```bash
# Build and tag
./deploy.sh

# Or manually:
docker build -t react-fundamentals:latest .
docker push your-registry/react-fundamentals:latest
```

## 📁 Project Structure

```
react-fundamentals/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── src/                        # React application source
├── public/                     # Static assets
├── Dockerfile                  # Multi-stage Docker build
├── nginx.conf                  # Nginx configuration
├── deploy.sh                   # Manual deployment script
└── .dockerignore              # Docker build context optimization
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**: Check GitHub Actions logs
2. **Deployment Doesn't Trigger**: Verify webhook URL and token
3. **App Not Loading**: Check Coolify logs and nginx configuration
4. **Port Issues**: Ensure port 80 is correctly configured

### Debug Commands:

```bash
# Check build locally
npm run build

# Test Docker build
docker build -t test-build .
docker run -p 8080:80 test-build

# Check Coolify logs
# (Access via Coolify dashboard)
```

## 🌟 Features

- ⚡ **Fast Builds**: Multi-stage Docker builds
- 🔄 **Auto-Deploy**: Push to main = automatic deployment
- 🛡️ **Security**: Nginx with security headers
- 📦 **Optimized**: Gzip compression and static asset caching
- 🎯 **SPA Support**: Proper client-side routing handling

## 🔗 URLs

After deployment, your app will be available at:

- **Production**: `https://your-domain.com` (configured in Coolify)
- **Coolify Dashboard**: `https://your-coolify-server.com`

---

Need help? Check the Coolify documentation or GitHub Actions logs for detailed error information.
