import json
import os
from typing import Dict, Any, Optional, List
from utils import run_command

class UXAuditService:
    def __init__(self, orchestrator):
        self.orch = orchestrator

    def run_ux_audit(self, route: Optional[str] = None, all_routes: bool = False, desktop: bool = False, mobile: bool = False, screenshots_only: bool = False, images_only: bool = False, contrast_only: bool = False, overflow_only: bool = False) -> Dict[str, Any]:
        """
        Runs the UX audit suite using Playwright.
        """
        # Ensure routes are discovered
        run_command(["pnpm", "exec", "tsx", "scripts/ux-discover-routes.ts"])

        routes = ["/"]
        if all_routes:
            with open("artifacts/ux-audit/routes.json", "r") as f:
                routes = json.load(f)["routes"]
        elif route:
            routes = [route]

        viewports = []
        if desktop: viewports = ["desktop-1280", "desktop-1440"]
        elif mobile: viewports = ["mobile-375", "mobile-390", "mobile-430"]

        flags = []
        if images_only: flags.append("--images-only")
        if overflow_only: flags.append("--overflow-only")
        if contrast_only: flags.append("--contrast-only")

        results = []
        for r in routes:
            cmd = ["pnpm", "exec", "tsx", "scripts/ux-audit-runner.ts", r]
            if viewports:
                for vp in viewports:
                    res = run_command(cmd + [vp] + flags, check=False)
                    results.append({"route": r, "viewport": vp, "status": "success" if res.returncode == 0 else "error"})
            else:
                res = run_command(cmd + flags, check=False)
                results.append({"route": r, "status": "success" if res.returncode == 0 else "error"})

        return {"status": "success", "results": results}

    def run_lighthouse(self, route: Optional[str] = None) -> Dict[str, Any]:
        """
        Runs Lighthouse audits.
        """
        # Ensure routes are discovered
        run_command(["pnpm", "exec", "tsx", "scripts/ux-discover-routes.ts"])

        cmd = ["pnpm", "exec", "tsx", "scripts/ux-lighthouse-runner.ts"]
        if route:
            # Note: Lighthouse runner might need updates to handle single route arg if desired,
            # but for now it uses routes.json.
            pass

        res = run_command(cmd, check=False)
        return {"status": "success" if res.returncode == 0 else "error", "output": res.stdout}

    def generate_ux_report(self) -> Dict[str, Any]:
        """
        Aggregates results into a Markdown report.
        """
        from tdw_services.ux_report import generate_report
        generate_report()
        return {"status": "success", "report": "artifacts/ux-audit/ux-audit-report.md"}
