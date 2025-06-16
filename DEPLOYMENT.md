# MediScan AI - Deployment Guide

This guide will help you deploy your MediScan AI application to Vercel.

## 🚀 Quick Deployment to Vercel

### Prerequisites
- A GitHub account
- A Vercel account (free tier available)
- Your Google Gemini API key

### Step 1: Prepare Your Repository

1. **Commit all your changes:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Connect your GitHub account if not already connected
   - Select your MediScan repository
   - Click "Import"

4. **Configure the project:**
   - **Project Name:** `mediscan-ai` (or your preferred name)
   - **Framework Preset:** Vite (should be auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (should be auto-filled)
   - **Output Directory:** `dist` (should be auto-filled)

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `VITE_GEMINI_API_KEY` = `your_actual_gemini_api_key`
   - Make sure to use your real API key from Google AI Studio

6. **Click "Deploy"**

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project? No
   - Project name: mediscan-ai
   - Directory: ./
   - Override settings? No

5. **Set environment variables:**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```
   Enter your Gemini API key when prompted.

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Step 3: Configure Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain if you have one

### Step 4: Verify Deployment

1. **Check the deployment URL** provided by Vercel
2. **Test all features:**
   - Image upload
   - Analysis functionality
   - PDF generation
   - All navigation links

## 🔧 Environment Variables

Make sure to set these environment variables in Vercel:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 📁 Project Structure for Deployment

```
MediScan/
├── dist/                 # Build output (auto-generated)
├── public/              # Static assets
├── src/                 # Source code
├── .env.example         # Environment variables template
├── vercel.json          # Vercel configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Build Configuration

The project is configured with:
- **Vite** for building and bundling
- **ChromaDB Mock** for production (real ChromaDB in development)
- **Environment-specific imports** for optimal performance

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check that all dependencies are installed
   - Verify environment variables are set correctly
   - Check the build logs in Vercel dashboard

2. **API Key Issues:**
   - Ensure `VITE_GEMINI_API_KEY` is set in Vercel environment variables
   - Verify the API key is valid and has proper permissions

3. **ChromaDB Issues:**
   - The app automatically uses a mock version in production
   - Real ChromaDB only works in development mode

4. **Large Bundle Size:**
   - The build includes AI libraries which are naturally large
   - Consider implementing code splitting if needed

### Getting Help:

- Check Vercel deployment logs
- Verify environment variables in Vercel dashboard
- Test the build locally with `npm run build && npm run preview`

## 🎯 Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] Image upload works
- [ ] AI analysis functions
- [ ] PDF generation works
- [ ] All pages are accessible
- [ ] Environment variables are set
- [ ] Custom domain configured (if applicable)

## 🔄 Continuous Deployment

Once set up, Vercel will automatically:
- Deploy when you push to the main branch
- Run builds and tests
- Update the live site with new changes

Your MediScan AI application is now live and ready to use! 🚀
