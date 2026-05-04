import json

log_path = "/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/.system_generated/logs/overview.txt"
requests = []

with open(log_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'USER_INPUT':
                content = data.get('content', '')
                # Extract the part between <USER_REQUEST> and </USER_REQUEST>
                if '<USER_REQUEST>' in content:
                    req = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].strip()
                    requests.append(req)
        except:
            continue

print("\n".join(requests))
