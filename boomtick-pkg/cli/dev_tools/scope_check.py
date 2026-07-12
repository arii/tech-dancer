# pylint: disable=line-too-long,missing-docstring,no-value-for-parameter
import sys
import click
from dev_tools.utils import log_info
from dev_tools.scope_utils import verify_pr_scope


@click.command()
@click.argument("files", nargs=-1)
def main(files):
    """Checks if a PR touches too many core files or mixes content scopes."""
    file_list = list(files)

    # If no files provided as arguments, check stdin (piped input)
    if not file_list and not sys.stdin.isatty():
        file_list = sys.stdin.read().splitlines()

    # If still no files, auto-detect from git
    if not file_list:
        warning = verify_pr_scope()
    else:
        warning = verify_pr_scope(file_list)

    if warning:
        log_info(warning)
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
