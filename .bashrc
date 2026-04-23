export GIT_AUTHOR_NAME="Antigravity Agent"
export GIT_AUTHOR_EMAIL="ariandersrobotics@gmail.com"
export GIT_COMMITTER_NAME="Antigravity Agent"
export GIT_COMMITTER_EMAIL="ariandersrobotics@gmail.com"

# Ensure local git config is set for this repo
git config --local user.name "$GIT_AUTHOR_NAME"
git config --local user.email "$GIT_AUTHOR_EMAIL"

# Safety alias to prevent accidental main pushes
alias git-push-main='echo "Direct push to main is disabled for this agent profile."'
