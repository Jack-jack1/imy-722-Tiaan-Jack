# Git & GitHub Setup Cheat Sheet

## 1. Installation & Configuration
- **Download Git:** [git-scm.com/install](https://git-scm.com/install/)
- **Configure Username:** `git config --global user.name "Your Name"`
- **Configure Email:** `git config --global user.email "your.email@example.com"`

## 2. Setting Up SSH Authentication
*Follow these steps to securely connect your local machine to GitHub without typing your password every time.*

1. **Generate SSH Key:**
   `ssh-keygen -t ed25519 -C "email@gmail.com"`
2. **Start SSH Agent:**
   `eval "$(ssh-agent -s)"`
3. **Add Key to Agent:**
   `ssh-add ~/.ssh/id_ed25519`
4. **Copy Public Key to Clipboard (Windows):**
   `cat ~/.ssh/id_ed25519.pub | clip`
   *(Paste this key into GitHub Settings > SSH and GPG Keys)*
5. **Test Connection:**
   `ssh -T git@github.com`

## 3. Basic Git Commands

### Starting & Staging
- **Initialize a new local repository:** `git init`
- **Clone an existing repository:** `git clone <url>`
- **Check status of files:** `git status`
- **Add a specific file to staging:** `git add <file_name>`
- **Add all changed files to staging:** `git add .`

### Committing & Branching
- **Commit changes with a message:** `git commit -m "Your descriptive commit message"`
- **Create a new branch:** `git branch <branch-name>`
- **Switch to a branch:** `git checkout <branch-name>` (or `git switch <branch-name>`)
- **Rename current branch (e.g., to main):** `git branch -M main`

### Remote Connections (Pushing & Pulling)
- **Link local repo to GitHub:** `git remote add origin <ssh-url>`
- **Push changes to GitHub (first time):** `git push -u origin main`
- **Push changes to GitHub (after first time):** `git push`
- **Pull latest changes from GitHub:** `git pull origin main`

## 4. Helpful Resources
- **Video Tutorial:** [Connecting Git to GitHub](https://youtu.be/KhORHy58Q-s?si=B7G6q-ugCrIW9xXd)