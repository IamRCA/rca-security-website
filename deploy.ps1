# RCA Security Group Website Deployment Script
# This script makes it easy to push updates to GitHub Pages

Write-Host "🚀 RCA Security Group Website Deployment" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check git status
Write-Host "📊 Checking git status..." -ForegroundColor Yellow
git status

# Add all changes
Write-Host "📝 Adding all changes..." -ForegroundColor Yellow
git add .

# Get commit message from user
$commitMessage = Read-Host "💬 Enter commit message (or press Enter for 'Updated website')"
if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = "Updated website"
}

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

# Push to GitHub
Write-Host "🌐 Pushing to GitHub..." -ForegroundColor Yellow
git push

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌍 Your website is live at: https://iamrca.github.io/rca-security-website/" -ForegroundColor Cyan
Write-Host "⏱️  Changes will be live in 2-3 minutes" -ForegroundColor Yellow
