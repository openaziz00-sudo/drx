#!/bin/bash

# Gentle AI - Vercel Deployment Script
# =====================================

echo "🚀 Gentle AI - Vercel Deployment Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Build the frontend
echo "📦 Building frontend..."
cd gentle-ai-frontend
pnpm install
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend built successfully"
cd ..
echo ""

# Check API files
echo "🔍 Checking API files..."
if [ -d "api" ] && [ -f "api/chat.py" ] && [ -f "api/deepseek.py" ] && [ -f "api/models.py" ]; then
    echo "✅ All API files present"
else
    echo "❌ API files missing!"
    exit 1
fi
echo ""

# Verify environment variables
echo "🔐 Checking environment variables..."
if [ -f ".env" ]; then
    echo "✅ .env file found"
    
    # Check for required variables
    if grep -q "OPENAI_API_KEY" .env; then
        echo "✅ OPENAI_API_KEY configured"
    else
        echo "⚠️  Warning: OPENAI_API_KEY not found in .env"
    fi
else
    echo "⚠️  Warning: .env file not found"
fi
echo ""

# Summary
echo "📊 Deployment Summary"
echo "===================="
echo "✅ Frontend: Built and ready"
echo "✅ API: 3 serverless functions configured"
echo "✅ Configuration: vercel.json present"
echo ""

echo "🎯 Next Steps:"
echo "-------------"
echo "1. Go to https://vercel.com"
echo "2. Click 'Add New Project'"
echo "3. Import from GitHub: openaziz00-sudo/drx"
echo "4. Configure environment variables from .env file"
echo "5. Deploy!"
echo ""

echo "📚 Documentation:"
echo "----------------"
echo "- Quick Start: QUICK_START.md"
echo "- Full Guide: README-DEPLOYMENT.md"
echo "- Migration Report: MIGRATION_REPORT.md"
echo ""

echo "✨ Project is ready for Vercel deployment!"
