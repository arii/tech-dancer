import os
def get_audit_path():
    script_path = "scripts/detect-antipatterns.mjs"
    if not os.path.exists(script_path):
        script_path = "boomtick-pkg/scripts/detect-antipatterns.mjs"
    return script_path
print(get_audit_path())
