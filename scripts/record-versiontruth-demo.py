import os
import sys
import json
import urllib.request
import urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT_DIR = Path("demo-assets")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# We will record a separate video for each "shot" to make editing easier.

def fetch_api(path, post_data=None):
    url = f"http://localhost:3000{path}"
    req = urllib.request.Request(url)
    if post_data:
        req.add_header("Content-Type", "application/json")
        req.data = json.dumps(post_data).encode("utf-8")

    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode("utf-8")
    except Exception as e:
        return str(e)

def format_json_response(raw_json):
    try:
        parsed = json.loads(raw_json)
        formatted = json.dumps(parsed, indent=2)
        # Escape for HTML insertion in our fake terminal
        return formatted.replace("\n", "<br>").replace(" ", "&nbsp;")
    except:
        return raw_json.replace("\n", "<br>").replace(" ", "&nbsp;")

def record_shot(p, shot_name, action_fn, width=1920, height=1080):
    print(f"Recording shot: {shot_name}...")
    browser = p.chromium.launch(headless=True)

    # We want a clean video for each shot, so we create a new context
    context = browser.new_context(
        record_video_dir=str(OUTPUT_DIR),
        record_video_size={"width": width, "height": height},
        viewport={"width": width, "height": height}
    )
    page = context.new_page()

    # Initial hydration wait
    try:
        page.goto("http://localhost:3000/")
        page.wait_for_selector("#loading-spinner", state="detached", timeout=5000)
    except:
        pass

    action_fn(page)

    context.close()
    browser.close()

    # Playwright generates random names for videos. Let's rename the most recently created one.
    videos = sorted(OUTPUT_DIR.glob("*.webm"), key=os.path.getmtime)
    if videos:
        latest_video = videos[-1]
        target_name = OUTPUT_DIR / f"{shot_name}.webm"
        if target_name.exists():
            target_name.unlink()
        latest_video.rename(target_name)
        print(f"Saved: {target_name}")

def shot1_problem(page):
    page.goto("http://localhost:3000/research/confidently-incorrect-v4")
    page.wait_for_selector("#loading-spinner", state="detached", timeout=5000)
    page.wait_for_timeout(2000)
    # Scroll slightly to show the post content clearly
    page.mouse.wheel(0, 400)
    page.wait_for_timeout(4000)
    page.screenshot(path=str(OUTPUT_DIR / "shot1_problem.png"))

def shot2_fix(page):
    page.goto("http://localhost:3000/skill.md")
    page.wait_for_timeout(2000)
    page.screenshot(path=str(OUTPUT_DIR / "shot2_fix.png"))
    page.wait_for_timeout(3000)

def shot3_live_demo(page):
    terminal_path = Path(__file__).parent / "terminal_mock.html"
    page.goto(f"file://{terminal_path.absolute()}")
    page.wait_for_timeout(1000)

    # 1. What's the real latest version?
    cmd1 = "curl -s \"https://boomtick.blog/api/latest-version?ecosystem=gh-action&name=actions/checkout\""
    resp1 = fetch_api("/api/latest-version?ecosystem=gh-action&name=actions/checkout")
    resp1_esc = format_json_response(resp1)
    page.evaluate(f"window.executeCommand(`{cmd1}`, `{resp1_esc}`)")
    page.wait_for_timeout(4000)
    page.screenshot(path=str(OUTPUT_DIR / "shot3_demo_part1.png"))

    # 2. Is v4 actually outdated?
    cmd2 = "curl -s \"https://boomtick.blog/api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4\" | jq"
    resp2 = fetch_api("/api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4")
    resp2_esc = format_json_response(resp2)
    page.evaluate(f"window.executeCommand(`{cmd2}`, `{resp2_esc}`)")
    page.wait_for_timeout(5000)
    page.screenshot(path=str(OUTPUT_DIR / "shot3_demo_part2.png"))

    # 3. Batch check
    cmd3_body = [
        {"ecosystem":"npm","name":"pnpm","candidate":"9.0.0"},
        {"ecosystem":"gh-action","name":"actions/checkout","candidate":"v4"}
    ]
    cmd3 = 'curl -s -X POST -H "Content-Type: application/json" -d \'[{"ecosystem":"npm","name":"pnpm","candidate":"9.0.0"},{"ecosystem":"gh-action","name":"actions/checkout","candidate":"v4"}]\' "https://boomtick.blog/api/batch-compare" | jq'
    resp3 = fetch_api("/api/batch-compare", cmd3_body)
    resp3_esc = format_json_response(resp3)
    page.evaluate(f"window.executeCommand(`{cmd3}`, `{resp3_esc}`)")
    page.wait_for_timeout(6000)
    page.screenshot(path=str(OUTPUT_DIR / "shot3_demo_part3.png"))

def shot4_agent_usage(page):
    page.goto("http://localhost:3000/skill.md")
    page.wait_for_timeout(1000)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight / 3)")
    page.wait_for_timeout(4000)
    page.screenshot(path=str(OUTPUT_DIR / "shot4_agent_usage.png"))

def shot5_safety(page):
    # Mocking curl -i for rate limits since our local dev server might not have the rate limiting middleware active,
    # or it might be hard to trip intentionally without spamming.
    terminal_path = Path(__file__).parent / "terminal_mock.html"
    page.goto(f"file://{terminal_path.absolute()}")
    page.wait_for_timeout(1000)

    cmd = "curl -i \"https://boomtick.blog/api/health\""
    headers_mock = """HTTP/1.1 200 OK<br>
Date: Fri, 10 Jul 2026 09:30:00 GMT<br>
Content-Type: application/json<br>
X-RateLimit-Limit: 100<br>
X-RateLimit-Remaining: 99<br>
X-RateLimit-Reset: 1783675800<br>
<br>
{"status":"ok","service":"VersionTruth"}"""

    page.evaluate(f"window.executeCommand(`{cmd}`, `{headers_mock}`)")
    page.wait_for_timeout(4000)
    page.screenshot(path=str(OUTPUT_DIR / "shot5_safety.png"))

def shot6_close(page):
    page.goto("http://localhost:3000/versiontruth")
    page.wait_for_selector("#loading-spinner", state="detached", timeout=5000)
    page.wait_for_timeout(4000)
    page.screenshot(path=str(OUTPUT_DIR / "shot6_close.png"))

def main():
    print(f"Generating clean VersionTruth demo videos in ./{OUTPUT_DIR}...")

    # Wait for the dev server to be responsive
    import socket
    server_ready = False
    for _ in range(30):
        try:
            with urllib.request.urlopen("http://localhost:3000/") as r:
                if r.status == 200:
                    server_ready = True
                    break
        except Exception:
            time.sleep(1)

    if not server_ready:
        print("Error: Dev server not running on http://localhost:3000. Start it with `pnpm dev` first.")
        sys.exit(1)

    with sync_playwright() as p:
        record_shot(p, "shot1_problem", shot1_problem)
        record_shot(p, "shot2_fix", shot2_fix)
        record_shot(p, "shot3_live_demo", shot3_live_demo)
        record_shot(p, "shot4_agent_usage", shot4_agent_usage)
        record_shot(p, "shot5_safety", shot5_safety)
        record_shot(p, "shot6_close", shot6_close)

    print("\n✅ All shots recorded successfully. You can find the individual .webm videos and .png screenshots in:")
    print(OUTPUT_DIR.absolute())

if __name__ == "__main__":
    import time
    main()
