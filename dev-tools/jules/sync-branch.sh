#!/bin/bash

set -e

echo "Fetching latest changes from origin..."
git fetch origin

echo "Rebasing current branch onto origin/leader..."
git rebase origin/leader

echo "Force pushing to the remote branch..."
git push -f

echo "Branch synced successfully!"
