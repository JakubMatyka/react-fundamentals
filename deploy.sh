#!/bin/bash

# Build the application
echo "🏗️  Building application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t react-fundamentals:latest .

# Tag image for deployment
echo "🏷️  Tagging image..."
docker tag react-fundamentals:latest react-fundamentals:$(date +%Y%m%d-%H%M%S)

echo "✅ Build complete!"
echo "📦 Ready for deployment to Coolify" 