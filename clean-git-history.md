# How to Clean Git Commit History

## ⚠️ IMPORTANT WARNING
Rewriting git history is **destructive** and requires force pushing. Only do this if you're the only one working on the repo, or coordinate with your team first.

## Option 1: Fresh Start (RECOMMENDED - Safest)

This creates a new branch with clean history without touching the old commits.

```powershell
# Navigate to your git repository
cd "C:\Users\RCA\Documents\Code and stuff\Website"
# (or wherever your git repo is)

# Create a new orphan branch (no history)
git checkout --orphan clean-history

# Remove all files from staging
git rm -rf .

# Copy your current files
# (All your Website files should already be here)

# Stage everything
git add .

# Make a clean initial commit
git commit -m "Initial commit - RCA Security Group website"

# Force push the new branch
git push origin clean-history --force

# On GitHub, make this your default branch, then delete master branch
```

## Option 2: Rewrite Existing History (Advanced)

This rewrites ALL commit history. Use only if you understand the consequences.

```powershell
# Install git-filter-repo (if not installed)
# pip install git-filter-repo

# Navigate to repo
cd "C:\Users\RCA\Documents\Code and stuff\Website"

# Backup first!
git tag backup-before-cleanup

# Remove author names/emails from all commits
git filter-repo --name-callback 'return b"RCA Security Group"'
git filter-repo --email-callback 'return b"dev@rcasecuritygroup.com"'

# Edit commit messages (interactive)
git rebase -i --root

# Force push (DESTRUCTIVE!)
git push origin master --force
```

## Option 3: Squash All Commits (Simplest)

Squash all commits into one clean commit:

```powershell
# Create orphan branch
git checkout --orphan clean-main

# Stage all files
git add .

# One clean commit
git commit -m "RCA Security Group website - initial release"

# Replace master branch
git branch -D master
git branch -m master
git push origin master --force
```

## Recommended Approach

I recommend **Option 3** - it's the simplest and gives you a clean slate:
- One commit: "RCA Security Group website - initial release"
- No personal names or emails
- No detailed commit history

## Before You Start

1. **Backup everything** - make sure all your code is safe
2. **Check if anyone else has the repo** - coordinate with them first
3. **Make sure you have admin access** - you'll need to force push
4. **Note your GitHub repo URL** - you'll need it for the push

