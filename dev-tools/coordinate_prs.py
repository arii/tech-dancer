import json
import sys
import os
from collections import defaultdict

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from utils import get_github_client, get_repo_name, call_ai

def get_pr_comments_and_reviews(pr):
    comments_data = []
    for c in pr.get_issue_comments():
        comments_data.append(f"Comment by {c.user.login}: {c.body}")
    for c in pr.get_review_comments():
        comments_data.append(f"Review comment by {c.user.login} on {c.path}: {c.body}")
    for r in pr.get_reviews():
        if r.body:
            comments_data.append(f"Review by {r.user.login} ({r.state}): {r.body}")
    return "\n".join(comments_data[-10:])

def get_open_prs(limit=25):
    client = get_github_client()
    repo = client.get_repo(get_repo_name())
    pulls = repo.get_pulls(state='open')
    prs = []
    for pr in list(pulls)[:limit]:
        files = [f.filename for f in pr.get_files()]
        comments = get_pr_comments_and_reviews(pr)
        prs.append({
            "number": pr.number,
            "title": pr.title,
            "body": pr.body,
            "author": pr.user.login,
            "branch": pr.head.ref,
            "files": files,
            "comments": comments
        })
    return prs

def build_ownership_map(prs):
    ownership = defaultdict(list)
    for pr in prs:
        for f in pr['files']:
            ownership[f].append(pr['number'])
    return ownership

def analyze_overlaps(prs, ownership):
    safe_prs = []
    overlapping_prs = set()
    for pr in prs:
        is_safe = True
        for f in pr['files']:
            if len(ownership[f]) > 1:
                is_safe = False
                overlapping_prs.add(pr['number'])
                break
        if is_safe:
            safe_prs.append(pr['number'])

    graph = defaultdict(set)
    for f, pr_list in ownership.items():
        if len(pr_list) > 1:
            for i in range(len(pr_list)):
                for j in range(i + 1, len(pr_list)):
                    graph[pr_list[i]].add(pr_list[j])
                    graph[pr_list[j]].add(pr_list[i])

    visited = set()
    groups = []
    for pr_num in list(overlapping_prs):
        if pr_num not in visited:
            group = set()
            stack = [pr_num]
            while stack:
                curr = stack.pop()
                if curr not in visited:
                    visited.add(curr)
                    group.add(curr)
                    stack.extend(graph[curr] - visited)
            groups.append(sorted(list(group)))

    return safe_prs, groups

def call_llm_analysis(prs, groups, ownership):
    prompt = """You are a Parallel Development Coordination Agent.
Your goal is to intelligently consolidate overlapping work streams, identify conflicts early, and produce a safe integration plan.

Analyze the provided PR data (including titles, files changed, and reviewer comments) to determine:
1. Shared File Consolidation: Analyze overlapping files. Are the changes compatible, potential conflicts, or direct conflicts? Recommend a consolidation strategy and merge order.
2. Duplicate Work: Detect if multiple agents implemented the same feature.
3. Architectural Divergence: Detect when PRs create competing patterns or move the system in different directions.
4. Integration Branch Planning: Group overlapping PRs and assess the integration risk.
5. Agent Work Allocation: Recommend how future work should be split based on safe areas.
6. Merge Strategy: Generate specific git commands (cherry-pick, rebase, or manual) for overlapping PRs.

PR Data:
"""
    pr_lookup = {pr['number']: pr for pr in prs}
    for pr in prs:
        prompt += f"\nPR #{pr['number']} ({pr['branch']}) by {pr['author']}: {pr['title']}\n"
        prompt += f"Files: {', '.join(pr['files'][:10])}{'...' if len(pr['files']) > 10 else ''}\n"
        if pr['comments']:
            # Truncate comments to save tokens
            prompt += f"Recent Comments: {pr['comments'][:300]}\n"

    prompt += "\nOverlapping PR Groups:\n"
    for i, group in enumerate(groups, 1):
        prompt += f"Group {i}: {', '.join(map(str, group))}\n"

    prompt += """
Respond strictly with a JSON object following this schema. Do not include markdown formatting like ```json.
{
  "shared_file_consolidation": [
    {
      "file": "path/to/file",
      "prs_involved": [101, 102],
      "conflict_level": "LOW|MEDIUM|HIGH",
      "recommendation": "Explanation of how to consolidate",
      "merge_order": [101, 102],
      "estimated_risk": "Low|Medium|High"
    }
  ],
  "duplicate_work": [
    {
      "prs": [105, 110],
      "feature": "Name of feature",
      "recommendation": "Merge X, cherry pick Y"
    }
  ],
  "architectural_divergence": [
    {
      "prs": [107, 111],
      "issue": "Description of the architectural conflict",
      "recommendation": "How to standardize"
    }
  ],
  "integration_groups": [
    {
      "name": "Group A",
      "prs": [101, 102],
      "shared_area": "Feature Name",
      "integration_risk": "Medium"
    }
  ],
  "agent_work_allocation": [
    {
      "agent": "Agent A",
      "focus_area": "Path or feature",
      "risk": "Low"
    }
  ],
  "merge_strategies": [
    {
      "prs": [101, 102],
      "strategy_type": "Cherry Pick|Rebase|Manual",
      "commands": "git checkout ...\\ngit cherry-pick ...",
      "manual_steps": "Extract X from 101, keep Y from 102"
    }
  ],
  "overall_risk": {
    "low_risk_count": 0,
    "medium_risk_count": 0,
    "high_risk_count": 0,
    "auto_merge_count": 0,
    "integration_branches_needed": 0,
    "escalations_needed": 0
  }
}
"""
    # use a model with larger token limit
    response = call_ai(prompt, model="gpt-4o-mini")
    if not response:
        response = '''{
  "shared_file_consolidation": [],
  "duplicate_work": [],
  "architectural_divergence": [],
  "integration_groups": [],
  "agent_work_allocation": [],
  "merge_strategies": [],
  "overall_risk": {}
}'''
    if not response:
        response = '''{
  "shared_file_consolidation": [],
  "duplicate_work": [],
  "architectural_divergence": [],
  "integration_groups": [],
  "agent_work_allocation": [],
  "merge_strategies": [],
  "overall_risk": {}
}'''

    try:
        if response.startswith("```json"):
            response = response.split("```json")[1].split("```")[0].strip()
        elif response.startswith("```"):
            response = response.split("```")[1].split("```")[0].strip()

        return json.loads(response)
    except Exception as e:
        print(f"Failed to parse LLM response: {e}", file=sys.stderr)
        return {}

def main():
    prs = get_open_prs(limit=30)
    ownership = build_ownership_map(prs)
    safe_prs, groups = analyze_overlaps(prs, ownership)
    llm_analysis = call_llm_analysis(prs, groups, ownership)

    if not llm_analysis:
        print("Error: Could not generate analysis.", file=sys.stderr)
        sys.exit(1)

    print("# Parallel Work Coordination Report\n")
    print(f"## Open PRs\n\n{len(prs)}\n")

    print("## Safe Independent PRs\n")
    if safe_prs:
        for pr_num in sorted(safe_prs):
            print(f"- #{pr_num}")
    else:
        print("None\n")
    print()

    print("## Overlapping PR Groups\n")
    igroups = llm_analysis.get('integration_groups', [])
    if not igroups:
        print("None detected.\n")
    else:
        for group in igroups:
            print(f"### {group.get('name', 'Group')}\n")
            print("PRs:")
            for pr in group.get('prs', []):
                print(f"- #{pr}")
            print(f"\nShared Area:\n{group.get('shared_area', 'Unknown')}\n")
            print(f"Integration Risk:\n{group.get('integration_risk', 'Unknown')}\n")

    print("---\n")

    print("## Shared File Consolidation\n")
    shared = llm_analysis.get('shared_file_consolidation', [])
    if not shared:
        print("No shared file conflicts requiring complex consolidation.\n")
    else:
        for item in shared:
            print(f"### File\n\n{item.get('file', 'Unknown')}\n")
            print(f"Conflict Level:\n{item.get('conflict_level', 'Unknown')}\n")
            print(f"Recommended Consolidation:\n{item.get('recommendation', 'None')}\n")
            print(f"Merge Order:\n" + "\n".join([f"{i+1}. PR #{pr}" for i, pr in enumerate(item.get('merge_order', []))]) + "\n")
            print(f"Estimated Risk:\n{item.get('estimated_risk', 'Unknown')}\n")

    print("---\n")

    print("## Duplicate Work\n")
    dups = llm_analysis.get('duplicate_work', [])
    if not dups:
        print("None detected.\n")
    else:
        for dup in dups:
            for pr in dup.get('prs', []):
                print(f"PR #{pr}")
            print(f"\nFeature:\n{dup.get('feature', 'Unknown')}\n")
            print(f"Recommendation:\n{dup.get('recommendation', 'None')}\n")

    print("---\n")

    print("## Architectural Conflicts\n")
    arch = llm_analysis.get('architectural_divergence', [])
    if not arch:
        print("None detected.\n")
    else:
        for conf in arch:
            for pr in conf.get('prs', []):
                print(f"PR #{pr}")
            print(f"\nIssue:\n{conf.get('issue', 'Unknown')}\n")
            print(f"Recommendation:\n{conf.get('recommendation', 'None')}\n")

    print("---\n")

    print("## Merge Strategy Generation\n")
    strats = llm_analysis.get('merge_strategies', [])
    if not strats:
        print("No specific merge strategies required.\n")
    else:
        for strat in strats:
            print(f"### Strategy for PRs: {', '.join(map(str, strat.get('prs', [])))}\n")
            print(f"Type: {strat.get('strategy_type', 'Manual')}\n")
            if strat.get('commands'):
                print(f"```bash\n{strat.get('commands')}\n```\n")
            if strat.get('manual_steps'):
                print(f"Manual Consolidation:\n{strat.get('manual_steps')}\n")

    print("---\n")

    print("## Agent Work Allocation\n")
    allocs = llm_analysis.get('agent_work_allocation', [])
    if not allocs:
        print("No specific allocations recommended.\n")
    else:
        print("Safe Parallelization Opportunities\n")
        for alloc in allocs:
            print(f"{alloc.get('agent', 'Agent')}\n- {alloc.get('focus_area', 'Area')}\nRisk: {alloc.get('risk', 'Unknown')}\n")

    print("---\n")

    print("## Recommended Merge Order\n")
    # A simple fallback if we don't have a global merge order from LLM
    merge_order = sorted(safe_prs)
    for i, pr_num in enumerate(merge_order, 1):
        print(f"{i}. #{pr_num}")
    print("\n---\n")

    risk = llm_analysis.get('overall_risk', {})
    print("## Risk Assessment\n")
    print(f"Low Risk: {risk.get('low_risk_count', len(safe_prs))} PRs")
    print(f"Medium Risk: {risk.get('medium_risk_count', 0)} PRs")
    print(f"High Risk: {risk.get('high_risk_count', 0)} PRs\n")
    print("---\n")

    print("## Consolidation Actions\n")
    print(f"- Auto-merge {risk.get('auto_merge_count', len(safe_prs))} PRs")
    print(f"- Create {risk.get('integration_branches_needed', len(groups))} integration branches")
    print(f"- Escalate {risk.get('escalations_needed', len(arch))} architectural conflicts for review")

if __name__ == '__main__':
    main()
