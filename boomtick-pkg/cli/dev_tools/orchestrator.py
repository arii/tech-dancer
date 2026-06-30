import hashlib
import os
import re
import json
import sys
import shutil
import subprocess
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional, Tuple
from collections import defaultdict

from dev_tools.services.github import GitHubClient
from dev_tools.services.ai_service import AIClient
from dev_tools.services.jules import JulesClient
from dev_tools.services.repair_service import RepairService
from dev_tools.services.vision_service import VisionService
from dev_tools.services.pr_service import PRService
from dev_tools.services.audit_service import AuditService
from dev_tools.services.remediation_service import RemediationService

from dev_tools.utils import log_error, log_warn, get_or_create_log_dir, CLIError, run_command, get_gha_variable
from dev_tools.config import get_config

PROJECT_CONFIG = get_config()

class Orchestrator:
    _CMD_PATTERNS = {
        "conflict_resolve": r"(?<!\w)@conflict-resolve\b",
        "update_snapshots": r"(?<!\w)@update-snapshots\b",
        "ai_chatops": r"(?<!\w)/(ai-fix|ai-review)\b",
        "jules_fix_ci": r"(?<!\w)@jules-fix-ci\b",
    }

    def __init__(self) -> None:
        self._github = None
        self._ai = None
        self._jules = None
        self._pr_service = None
        self._audit_service = None
        self._remediation_service = None

    @property
    def github(self) -> GitHubClient:
        if self._github is None: self._github = GitHubClient()
        return self._github

    @property
    def ai(self) -> AIClient:
        if self._ai is None: self._ai = AIClient()
        return self._ai

    @property
    def jules(self) -> JulesClient:
        if self._jules is None: self._jules = JulesClient()
        return self._jules

    @property
    def pr_service(self) -> PRService:
        if self._pr_service is None: self._pr_service = PRService(self.github)
        return self._pr_service

    @property
    def audit_service(self) -> AuditService:
        if self._audit_service is None: self._audit_service = AuditService(self)
        return self._audit_service

    @property
    def remediation_service(self) -> RemediationService:
        if self._remediation_service is None: self._remediation_service = RemediationService(self)
        return self._remediation_service

    def get_env_or_gha(self, env_var: str) -> Optional[str]:
        if env_var in os.environ: return os.environ[env_var]
        return get_gha_variable(env_var)

    def resolve_baseline(self, file_path: Optional[str], env_var: str, fallback_value: int) -> int:
        if file_path and os.path.exists(file_path):
            with open(file_path, 'r') as f: return int(f.read().strip() or fallback_value)
        val = self.get_env_or_gha(env_var)
        return int(val) if val is not None and str(val).strip() != "" else fallback_value

    # Delegation to PRService
    def list_prs(self, *args, **kwargs): return self.pr_service.list_prs(*args, **kwargs)
    def get_ci_logs(self, *args, **kwargs): return self.pr_service.get_ci_logs(*args, **kwargs)
    def stream_ci_logs(self, *args, **kwargs): return self.pr_service.stream_ci_logs(*args, **kwargs)
    def get_merge_conflicts(self, *args, **kwargs): return self.pr_service.get_merge_conflicts(*args, **kwargs)
    def get_pr_diff_shapen(self, *args, **kwargs): return self.pr_service.get_pr_diff_shapen(*args, **kwargs)
    def aggregate_prs(self, *args, **kwargs): return self.pr_service.aggregate_prs(*args, **kwargs)
    def update_issue(self, *args, **kwargs): return self.pr_service.update_issue(*args, **kwargs)
    def post_comment(self, entity_number: int, body: Optional[str]) -> Dict[str, Any]:
        if body is None or not body.strip(): raise CLIError("Comment body cannot be empty.")
        return self.github.create_issue_comment(entity_number, body)

    # Delegation to AuditService
    def get_audit_results(self, *args, **kwargs): return self.audit_service.get_audit_results(*args, **kwargs)
    def validate_issue(self, *args, **kwargs): return self.audit_service.validate_issue(*args, **kwargs)
    def handle_audit_gate(self, *args, **kwargs): return self.audit_service.handle_audit_gate(*args, **kwargs)

    # Delegation to RemediationService
    def fix_ci(self, *args, **kwargs): return self.remediation_service.fix_ci(*args, **kwargs)

    def parse_comment(self, body: str, author_association: str) -> Dict[str, Any]:
        results = {k: bool(re.search(v, body)) for k, v in self._CMD_PATTERNS.items()}
        return {
            "conflict_resolve": results["conflict_resolve"],
            "update_snapshots": results["update_snapshots"],
            "ai_chatops": results["ai_chatops"],
            "jules_fix_ci": results["jules_fix_ci"] and author_association in ['OWNER', 'MEMBER', 'COLLABORATOR']
        }
