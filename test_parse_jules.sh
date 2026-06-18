PR_BODY="This is a body without Jules link"
TASK_ID=$(echo "$PR_BODY" \
            | grep -oP 'jules\.google\.com/task/\K[0-9]+' \
            | head -1)
echo "task_id: $TASK_ID"
