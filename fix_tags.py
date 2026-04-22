import re

with open("src/pages/UXAuditor.tsx", "r") as f:
    content = f.read()

# I changed:
# <Box height="full" display="flex" direction="col" align="center" justify="center" surface="default" radius="3xl" border={true} padding={20} minHeight={500} className="border-2 border-dashed text-center">
# to <Stack ...> but the closing tag was </Box>
content = content.replace("            </Box>\n          )}\n        </Stack>\n      </Grid>", "            </Stack>\n          )}\n        </Stack>\n      </Grid>")

with open("src/pages/UXAuditor.tsx", "w") as f:
    f.write(content)
