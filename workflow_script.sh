          # 0. Pre-deploy guard: Skip if superseded
          echo "Checking if $GITHUB_SHA is still the latest for $REF_NAME..."
          LATEST_SHA=$(git ls-remote origin "refs/heads/${REF_NAME}" | awk '{print $1}')
          if [ -n "$LATEST_SHA" ] && [ "$LATEST_SHA" != "$GITHUB_SHA" ]; then
            echo "Skipping stale deploy: $GITHUB_SHA is not latest for $REF_NAME ($LATEST_SHA)"
            exit 0
          fi

          # Deployment parameters
          if [ "$REF_NAME" = "main" ]; then
            DEST_DIR="."
          else
            DEST_DIR="$REF_NAME"
          fi
          REPO_URL="https://x-access-token:${GH_TOKEN}@github.com/${REPOSITORY}.git"
          MAX_RETRIES=5

          # Prepare Open PR branches list for pruning
          echo "Fetching open PRs for pruning..."
          gh pr list --state open --json headRefName --jq '.[].headRefName' > ../open_prs.txt

          for i in $(seq 1 "$MAX_RETRIES"); do
            echo "Deployment attempt $i..."
            rm -rf ../gh-pages-repo

            # 1. Clone or initialize gh-pages
            if git clone --depth=1 --branch gh-pages "$REPO_URL" ../gh-pages-repo; then
              cd ../gh-pages-repo || exit
            else
              echo "gh-pages branch not found or clone failed. Initializing new repo..."
              mkdir -p ../gh-pages-repo
              cd ../gh-pages-repo || exit
              git init
              git checkout -b gh-pages
              git remote add origin "$REPO_URL"
            fi

            # 2. Sync build artifacts
            if [ "$DEST_DIR" != "." ]; then
              # Clean sync for branch subdirectories
              rm -rf "$DEST_DIR"
              mkdir -p "$DEST_DIR"
              cp -r ../dist-assets/* "$DEST_DIR/"
            else
              # Root deployment for main branch
              # We use selective copy to avoid deleting other branch folders
              cp -r ../dist-assets/* ./
            fi
            touch .nojekyll

            # 3. Handle Main-specific requirements (tech-dancer/ subfolder and SEO)
            if [ "$REF_NAME" = "main" ]; then
              # Also deploy to tech-dancer/ subdirectory for root domain support
              mkdir -p tech-dancer
              # Clean sync to tech-dancer
              rm -rf tech-dancer/*
              cp -r ../dist-assets/* tech-dancer/

              # Ensure SEO assets are at the root
              cp ../dist-assets/sitemap.xml ./sitemap.xml 2>/dev/null || true
              cp ../dist-assets/robots.txt ./robots.txt 2>/dev/null || true
            fi

            # 4. Update root 404.html for redirects (only for previews)
            if [ "$REF_NAME" != "main" ]; then
              cp "$DEST_DIR/404.html" ./404.html
            fi

            # 5. Prune stale previews and update metadata
            # We copy the script to the current directory to run it easily
            cp "$GITHUB_WORKSPACE/scripts/manage-previews.sh" ./manage-previews.sh
            chmod +x ./manage-previews.sh
            ./manage-previews.sh ../open_prs.txt
            rm ./manage-previews.sh

            # Use the latest dashboard UI from the current deployment
            cp ../dist-assets/previews/index.html previews/index.html

            # 6. Commit and Push
            git config user.name "github-actions[bot]"
            git config user.email "github-actions[bot]@users.noreply.github.com"
            git add .
            if git commit -m "deploy: $GITHUB_SHA [skip ci]"; then
              if git push origin gh-pages; then
                echo "Push successful! Waiting for GitHub Pages to publish..."
                echo "PUSH_COMPLETE=true" >> "$GITHUB_ENV"

                # 7. Post-deploy verification
                # Actually we should use the public URL
                if [ "$REF_NAME" = "main" ]; then
                  PUBLIC_VERIFY_URL="https://${OWNER}.github.io/${REPO_NAME}/.deploy.json"
                else
                  PUBLIC_VERIFY_URL="https://${OWNER}.github.io/${REPO_NAME}/${REF_NAME}/.deploy.json"
                fi

                echo "Verifying publish at $PUBLIC_VERIFY_URL"
                ATTEMPTS=0
                MAX_ATTEMPTS=30 # 5 minutes with 10s sleep
                while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
                  RESPONSE=$(curl -sSL "$PUBLIC_VERIFY_URL" || echo "{}")
                  REMOTE_SHA=$(echo "$RESPONSE" | jq -r '.sha' 2>/dev/null || echo "none")
                  if [ "$REMOTE_SHA" = "$GITHUB_SHA" ]; then
                    echo "Publish verified! SHA $GITHUB_SHA is live."
                    echo "VERIFIED=true" >> "$GITHUB_ENV"
                    exit 0
                  fi
                  echo "Attempt $((ATTEMPTS+1))/$MAX_ATTEMPTS: SHA $REMOTE_SHA does not match $GITHUB_SHA. Retrying in 10s..."
                  sleep 10
                  ATTEMPTS=$((ATTEMPTS+1))
                done

                echo "Verification timed out. Pushed but not yet verified."
                echo "VERIFIED=false" >> "$GITHUB_ENV"
                exit 0
              fi
            else
              echo "No changes to commit."
              exit 0
            fi

            echo "Attempt $i failed. Retrying in $((i * 5))s..."
            sleep $((i * 5))
            cd - || exit
          done

          echo "Failed to deploy after $MAX_RETRIES attempts."
          exit 1
