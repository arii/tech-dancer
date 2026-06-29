import os
import sys

def setup_cli_paths():
    """Centralized path resolution for Tech-Dancer CLI services."""
    _current_file = os.path.abspath(__file__)
    # boomtick-pkg/cli/utils/path.py -> boomtick-pkg/cli/
    _cli_root = os.path.abspath(os.path.join(os.path.dirname(_current_file), ".."))
    _dev_tools_dir = os.path.join(_cli_root, "dev_tools")

    for _path in [_cli_root, _dev_tools_dir]:
        if _path not in sys.path:
            sys.path.insert(0, _path)

    return _cli_root, _dev_tools_dir
