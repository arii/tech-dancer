import re

with open("src/pages/UXAuditor.tsx", "r") as f:
    content = f.read()

# I changed:
# <Box surface="default" radius="2xl" shadow="sm" border={true} overflow="hidden" className="divide-y divide-line">
# to <Stack ...> but the closing tag was </Box>
content = content.replace("              ))}\n            </Box>\n          </Stack>", "              ))}\n            </Stack>\n          </Stack>")

with open("src/pages/UXAuditor.tsx", "w") as f:
    f.write(content)
