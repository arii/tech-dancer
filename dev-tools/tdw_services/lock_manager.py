import json
import os
from typing import Dict, List, Set

LOCK_FILE = "task_locks.json"

class LockManager:
    def __init__(self, lock_file_path: str = LOCK_FILE):
        self.lock_file_path = lock_file_path
        self._load_locks()

    def _load_locks(self):
        if os.path.exists(self.lock_file_path):
            with open(self.lock_file_path, "r") as f:
                try:
                    self.data = json.load(f)
                except json.JSONDecodeError:
                    self.data = {"task_locks": {}, "shared_readonly": []}
        else:
            self.data = {"task_locks": {}, "shared_readonly": []}

    def _save_locks(self):
        with open(self.lock_file_path, "w") as f:
            json.dump(self.data, f, indent=2)

    def lock(self, task_id: str, owns: List[str], reads: List[str] = None):
        if task_id not in self.data["task_locks"]:
            self.data["task_locks"][task_id] = {"owns": [], "reads": []}

        self.data["task_locks"][task_id]["owns"] = list(set(self.data["task_locks"][task_id]["owns"] + owns))
        if reads:
            self.data["task_locks"][task_id]["reads"] = list(set(self.data["task_locks"][task_id]["reads"] + reads))

        self._save_locks()

    def unlock(self, task_id: str):
        if task_id in self.data["task_locks"]:
            del self.data["task_locks"][task_id]
            self._save_locks()
            return True
        return False

    def get_status(self) -> Dict:
        return self.data

    def check_conflicts(self, task_id: str, files: List[str]) -> List[str]:
        conflicts = []
        for other_task, locks in self.data["task_locks"].items():
            if other_task == task_id:
                continue

            owned_by_other = locks.get("owns", [])
            for f in files:
                for owned in owned_by_other:
                    if f.startswith(owned):
                        conflicts.append(f"File '{f}' is owned by task '{other_task}'")

        for f in files:
            for shared in self.data.get("shared_readonly", []):
                if f.startswith(shared):
                    conflicts.append(f"File '{f}' is in shared_readonly and should not be modified by tasks directly.")

        return conflicts

if __name__ == "__main__":
    import sys
    manager = LockManager()
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == "status":
            print(json.dumps(manager.get_status(), indent=2))
