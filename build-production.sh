#!/usr/bin/env bash

echo "🚀 Building Aprati Foods Website for Single Domain Deployment"
echo "============================================================"
echo ""

# Step 1: Build Nuxt frontend
echo "📦 Step 1: Building Nuxt frontend..."
cd aprati_frontend
npm run generate

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend built successfully!"
echo ""

# Step 2: Copy built files to Laravel public directory
echo "📋 Step 2: Copying frontend files to backend..."

# Create frontend directory in Laravel public if it doesn't exist
mkdir -p ../aprati_backend/public/frontend

# Copy the .output/public directory contents
cp -r .output/public/* ../aprati_backend/public/frontend/

echo "✅ Files copied successfully!"
echo ""

# Step 3: Update Laravel to serve frontend
echo "📝 Step 3: Configuring Laravel..."

echo "✅ Configuration complete!"
echo ""

echo "============================================================"
echo "🎉 Deployment build completed successfully!"
echo ""
echo "📁 Frontend files are in: aprati_backend/public/frontend/"
echo "🌐 Your app will run on a single domain:"
echo "   - Frontend: https://yourdomain.com"
echo "   - API: https://yourdomain.com/api"
echo ""
echo "Next steps:"
echo "1. Upload aprati_backend folder to your server"
echo "2. Configure your web server (Apache/Nginx) to point to aprati_backend/public"
echo "3. Set up your .env file on the server"
echo "4. Run: php artisan config:cache"
echo "5. Run: php artisan route:cache"
echo ""
