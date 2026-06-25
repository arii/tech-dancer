with open("dev-tools/tdw_services/services/ai_service.py", "r") as f:
    code = f.read()

import re

# Remove any previous sys/os hacks
code = re.sub(r'import sys\nimport os\nsys\.path\.append.*?\n', '', code, flags=re.DOTALL)

# Because python prioritizes the local directory of the module doing the import,
# `from utils import ...` inside `tdw_services/services/` might try to import `tdw_services/utils.py`
# since `tdw_services` is in the path or just relative resolution.
# Let's change it to an absolute import if PYTHONPATH=dev-tools
code = code.replace("from utils import (", "from utils import (")
# wait, if PYTHONPATH=dev-tools, then `utils.py` in dev-tools should be reachable via `import utils`?
# but python sees `tdw_services/utils.py` first if we are doing absolute import?
# Let's change `tdw_services/utils.py` to `tdw_services/tdw_utils.py` instead or just use `from dev_tools.utils import`
# Wait, dev-tools is not a package named dev_tools, it's just the root directory.
