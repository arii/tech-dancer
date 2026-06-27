import sys
import os

# Add the dev-tools directory to sys.path so we can import tdw_services
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import CLI after path adjustment
try:
    from tdw_services.cli import cli
    from utils import log_error
except ImportError:
    cli = None
    def log_error(msg): print(f"❌ Error: {msg}", file=sys.stderr)

def main():
    if not cli:
        log_error("Could not import tdw_services. Ensure PYTHONPATH is set correctly.")
        sys.exit(1)

    try:
        cli(obj={})
    except Exception as e:
        code = getattr(e, 'code', 1)

        # Mirror errors to stderr in CI
        if os.environ.get("CI") == "true":
            log_error(str(e))

        # JSON output mode check
        is_json = "--no-json" not in sys.argv
        if is_json:
            import json
            print(json.dumps({
                "status": "error",
                "message": str(e),
                "type": e.__class__.__name__,
                "code": code
            }, indent=2))
        elif os.environ.get("CI") != "true":
            log_error(str(e))

        sys.exit(code)

if __name__ == "__main__":
    main()
