# Commercial Lender Database - Cloud Deployment

## Quick Start (Render.com - Recommended)

### Step 1: Prepare Files
All files are in this folder and ready to deploy.

### Step 2: Deploy to Render
1. Go to https://render.com and sign up (free, no credit card)
2. Click "New +" → "Web Service"
3. Choose "Deploy from Git" or "Public Git Repository"
4. Or use "Deploy without Git" option:
   - Upload this entire folder as a ZIP
   - Render will auto-detect Node.js

### Step 3: Configuration
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node

That's it! Render will give you a URL like:
`https://lender-portal-abc123.onrender.com`

## Alternative: Railway.app

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub" or upload folder
3. Railway auto-configures everything
4. Get URL like: `https://lender-portal.up.railway.app`

## Files Included

- `server.js` - Backend API server
- `package.json` - Dependencies
- `lenders.json` - Your 29 lenders (pre-loaded)
- `public/index.html` - Frontend portal
- `public/styles.css` - Styling

## How It Works

- Backend API stores/retrieves lenders
- Frontend connects to API automatically
- Data persists in `lenders.json` file
- Everyone sees the same data in real-time

## Updating Data

1. Open your deployed URL
2. Use Admin mode to add/edit/delete lenders
3. Changes save automatically
4. All team members see updates instantly

## Sharing with Team

Just send them the URL! No installation needed.

## Support

If you need help deploying, I can:
1. Create a GitHub repo for you
2. Deploy it myself and share the URL
3. Walk you through any step

