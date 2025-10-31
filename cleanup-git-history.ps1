# Git History Cleanup Script for RCA Security Group
# This script creates a clean commit history without personal information

Write-Host "🧹 Git History Cleanup Script" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  WARNING: This will rewrite your git history!" -ForegroundColor Yellow
Write-Host "   - Your old commits will be replaced" -ForegroundColor Yellow
Write-Host "   - You'll need to force push to GitHub" -ForegroundColor Yellow
Write-Host "   - Anyone with the repo will need to re-clone" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Type 'YES' to continue (anything else will exit)"
if ($confirm -ne "YES") {
    Write-Host "❌ Cancelled. No changes made." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "📋 Checking git status..." -ForegroundColor Yellow

# Check if we're in a git repo
try {
    $gitRoot = git rev-parse --show-toplevel
    Write-Host "✅ Found git repository: $gitRoot" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Not in a git repository!" -ForegroundColor Red
    Write-Host "   Please navigate to your git repository folder first." -ForegroundColor Yellow
    exit 1
}

# Check if there are uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""
    $commit = Read-Host "Would you like to commit these changes first? (y/n)"
    if ($commit -eq "y" -or $commit -eq "Y") {
        git add .
        $message = Read-Host "Enter commit message"
        if ([string]::IsNullOrEmpty($message)) {
            $message = "Cleanup before history rewrite"
        }
        git commit -m $message
    }
}

Write-Host ""
Write-Host "🔄 Creating clean history..." -ForegroundColor Yellow

# Get current branch name
$currentBranch = git branch --show-current
if ([string]::IsNullOrEmpty($currentBranch)) {
    $currentBranch = "master"
}

Write-Host "   Current branch: $currentBranch" -ForegroundColor Gray

# Create backup branch
$backupBranch = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "   Creating backup branch: $backupBranch" -ForegroundColor Gray
git branch $backupBranch

# Get remote URL
$remoteUrl = git config --get remote.origin.url
Write-Host "   Remote: $remoteUrl" -ForegroundColor Gray

# Create orphan branch (no history)
Write-Host ""
Write-Host "📦 Creating new orphan branch..." -ForegroundColor Yellow
git checkout --orphan clean-main

# Remove all files from staging (but keep them in working directory)
git rm -rf .

# Stage all current files
Write-Host "📝 Staging all files..." -ForegroundColor Yellow
git add .

# Create single clean commit
Write-Host ""
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = "RCA Security Group website - initial release"
}

Write-Host "💾 Creating clean commit..." -ForegroundColor Yellow
git commit -m $commitMessage

# Configure clean author info
Write-Host ""
Write-Host "👤 Setting author information..." -ForegroundColor Yellow
$authorName = Read-Host "Enter author name (or press Enter for 'RCA Security Group')"
if ([string]::IsNullOrEmpty($authorName)) {
    $authorName = "RCA Security Group"
}

$authorEmail = Read-Host "Enter author email (or press Enter for 'dev@rcasecuritygroup.com')"
if ([string]::IsNullOrEmpty($authorEmail)) {
    $authorEmail = "dev@rcasecuritygroup.com"
}

# Set author for this commit
git commit --amend --author="$authorName <$authorEmail>" --no-edit

Write-Host ""
Write-Host "✅ Clean history created!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Review the changes: git log" -ForegroundColor White
Write-Host "   2. Replace your branch with clean history:" -ForegroundColor White
Write-Host "      git branch -D $currentBranch" -ForegroundColor Gray
Write-Host "      git branch -m $currentBranch" -ForegroundColor Gray
Write-Host "   3. Force push to GitHub:" -ForegroundColor White
Write-Host "      git push origin $currentBranch --force" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  Your old history is saved in branch: $backupBranch" -ForegroundColor Yellow
Write-Host "   You can delete it after confirming everything works:" -ForegroundColor Yellow
Write-Host "   git branch -D $backupBranch" -ForegroundColor Gray
Write-Host ""

$pushNow = Read-Host "Push to GitHub now? (y/n)"
if ($pushNow -eq "y" -or $pushNow -eq "Y") {
    Write-Host ""
    Write-Host "⚠️  Final warning: This will overwrite history on GitHub!" -ForegroundColor Red
    $finalConfirm = Read-Host "Type 'FORCE PUSH' to proceed"
    if ($finalConfirm -eq "FORCE PUSH") {
        # Replace old branch
        git branch -D $currentBranch 2>$null
        git branch -m $currentBranch
        
        Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
        git push origin $currentBranch --force
        
        Write-Host ""
        Write-Host "✅ Done! Your git history is now clean." -ForegroundColor Green
        Write-Host "   Visit your GitHub repo to verify." -ForegroundColor Cyan
    } else {
        Write-Host "❌ Push cancelled. Run the push commands manually when ready." -ForegroundColor Yellow
    }
} else {
    Write-Host "ℹ️  You can push later using:" -ForegroundColor Cyan
    Write-Host "   git push origin $currentBranch --force" -ForegroundColor Gray
}

