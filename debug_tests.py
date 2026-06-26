import sys
import os
sys.path.append(os.path.abspath('dev-tools'))
import td_cli
import utils
print(f"td_cli.CLIError: {td_cli.CLIError}")
print(f"utils.CLIError: {utils.CLIError}")
print(f"to_standard_schema: {utils.to_standard_schema}")
