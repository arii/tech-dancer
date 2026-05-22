with open('src/components/ui/GearCard.tsx', 'r') as f:
    content = f.read()

new_content = content.replace(
"""  image,
  // Content metadata props to be ignored""",
"""  image,
  externalUrl,
  // Content metadata props to be ignored"""
)

with open('src/components/ui/GearCard.tsx', 'w') as f:
    f.write(new_content)
