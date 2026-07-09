import click
import json

def get_type_name(param):
    t = param.type
    if isinstance(t, click.Choice):
        return "choice"

    t_str = str(t).lower()
    if hasattr(t, "name"):
        t_str = t.name.lower()

    if "int" in t_str:
        return "integer"
    if "bool" in t_str:
        return "boolean"
    return "string"

def collect_commands(root_cmd, prefix="", max_depth=10):
    """
    Collects leaves of the command tree iteratively to avoid recursion limits.
    """
    subcmds = {}
    # stack elements: (cmd_obj, current_prefix, depth)
    stack = [(root_cmd, prefix, 0)]

    while stack:
        cmd, pfx, depth = stack.pop()

        if depth > max_depth:
            continue

        if isinstance(cmd, click.Group):
            # Sort items to maintain deterministic output
            items = sorted(cmd.commands.items(), reverse=True) # reverse because it's a stack
            for sub_name, sub_cmd in items:
                new_prefix = f"{pfx} {sub_name}".strip()
                stack.append((sub_cmd, new_prefix, depth + 1))
        else:
            cmd_name = pfx
            cmd_help = cmd.help or ""

            args_str = []
            req_args = []
            opt_flags = []
            req_flags = []

            for param in cmd.params:
                param_type = get_type_name(param)
                if isinstance(param, click.Argument):
                    arg_name = param.name.upper()
                    if param.nargs == -1:
                        args_str.append(f"<{arg_name}...>")
                    else:
                        args_str.append(f"<{arg_name}>")
                    req_args.append({
                        "name": param.name,
                        "type": param_type,
                        "description": getattr(param, "help", "") or ""
                    })
                elif isinstance(param, click.Option):
                    flag_name = param.opts[0]
                    flag_desc = param.help or ""
                    option_dict = {
                        "flag": flag_name,
                        "type": param_type,
                        "description": flag_desc
                    }
                    if param.required:
                        req_flags.append(option_dict)
                    else:
                        opt_flags.append(option_dict)

            usage = f"td-cli {cmd_name}"
            if req_flags:
                usage += " " + " ".join([f"{f['flag']} <{f['flag'].lstrip('-').upper()}>" for f in req_flags])
            if opt_flags:
                usage_parts = []
                for f in opt_flags:
                    if f['type'] == 'boolean':
                        usage_parts.append(f"{f['flag']}")
                    else:
                        usage_parts.append(f"{f['flag']} <{f['flag'].lstrip('-').upper()}>")
                usage += " " + " ".join([f"[{u}]" for u in usage_parts])
            if args_str:
                usage += " " + " ".join(args_str)

            cmd_info = {
                "description": cmd_help,
                "exact_usage": usage
            }
            if req_args:
                cmd_info["required_arguments"] = req_args
            if req_flags:
                cmd_info["required_flags"] = req_flags
            if opt_flags:
                cmd_info["optional_flags"] = opt_flags

            subcmds[cmd_name] = cmd_info

    return subcmds

def get_command_by_path(cli_root, path_str):
    """
    Finds a command object by its path (e.g. "gh audit-pr")
    """
    if not path_str:
        return cli_root

    parts = path_str.split()
    current = cli_root
    for part in parts:
        if isinstance(current, click.Group) and part in current.commands:
            current = current.commands[part]
        else:
            return None
    return current
