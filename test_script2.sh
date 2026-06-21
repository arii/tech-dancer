#!/bin/bash
          # Aggregate verdict — fail the step explicitly if any verdict file says failed
          FAILED=0
          # Ensure jq is installed
          if ! command -v jq >/dev/null 2>&1; then
            sudo apt-get update && sudo apt-get install -y jq || {
                echo "❌ Failed to install jq. Cannot parse verdict files." >&2
                FAILED=1
            }
          fi

          if [ "$FAILED" -eq 0 ]; then
            for f in artifacts/*-verdict.json; do
              [ -f "$f" ] || continue
              PASSED=$(jq -r '.passed' "$f" || echo "error")
              if [ "$PASSED" = "false" ]; then
                HIGH=$(jq -r '.highCount' "$f" || echo "unknown")
                echo "❌ Review failed: $HIGH HIGH severity issues found ($f)" >&2
                FAILED=1
              elif [ "$PASSED" = "error" ]; then
                echo "❌ Review failed: Could not parse verdict file ($f)" >&2
                FAILED=1
              fi
            done
          fi
