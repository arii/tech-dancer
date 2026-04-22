import re

with open("src/pages/UXAuditor.tsx", "r") as f:
    content = f.read()

# Fix CopyPromptButton to use layout primitives instead of raw tailwind
copy_prompt_button_old = """<button
      onClick={handleCopy}
      className="mt-2 flex items-center gap-1 px-3 py-1 rounded bg-surface border border-line hover:border-accent transition-colors text-xs font-bold hover:text-accent"
    >"""

copy_prompt_button_new = """<Box
      as="button"
      onClick={handleCopy}
      marginTop={2}
      display="flex"
      align="center"
      gap={1}
      paddingX={3}
      paddingY={1}
      radius="md"
      surface="default"
      border={true}
      className="hover:border-accent transition-colors hover:text-accent font-bold text-xs"
    >"""

content = content.replace(copy_prompt_button_old, copy_prompt_button_new)
content = content.replace("</button>\n  );", "</Box>\n  );")

# className={`w-full text-left p-4 hover:bg-surface transition-all flex items-center gap-3 ${
#                   report.id === activeReport?.id
#                     ? 'bg-[var(--color-surface-muted)] border-l-2 border-accent'
#                     : 'border-l-2 border-transparent'
#                 }`}
old_history_btn = 'className={`w-full text-left p-4 hover:bg-surface transition-all flex items-center gap-3 ${'
new_history_btn = """as="button" width="full" display="flex" align="center" gap={3} padding={4} className={`text-left hover:bg-surface transition-all ${"""

content = content.replace(old_history_btn, new_history_btn)

# Ensure Box is used for the history button wrapper
content = content.replace(
    """<button
                key={report.id}
                onClick={() => setActiveReport(report)}
                as="button" width="full" display="flex" align="center" gap={3} padding={4} className={`text-left hover:bg-surface transition-all ${""",
    """<Box
                key={report.id}
                as="button"
                onClick={() => setActiveReport(report)}
                width="full" display="flex" align="center" gap={3} padding={4} className={`text-left hover:bg-surface transition-all ${"""
)

# And close the Box instead of button
content = content.replace(
    '</button>\n            ))}',
    '</Box>\n            ))}'
)

# animate-spin on refresh icon: It's an icon, so we leave it, the review mentioned "animate-spin" but it's on an icon
# But we can check if it's on an icon: <RefreshCw className="animate-spin mb-3 w-6 h-6" />
content = content.replace(
    '<RefreshCw className="animate-spin mb-3 w-6 h-6" />',
    '<RefreshCw className="animate-spin w-6 h-6" />' # Removed mb-3, but need spacing
)
# Add spacing via parent Box: it's inside <Box display="flex" align="center" justify="center" paddingY={20} className="flex-col text-text-dim">
content = content.replace(
    '<Box display="flex" align="center" justify="center" paddingY={20} className="flex-col text-text-dim">',
    '<Box display="flex" direction="col" align="center" justify="center" paddingY={20} gap={3} color="dim">'
)

# divide-y divide-line
content = content.replace(
    '<Box surface="default" radius="2xl" shadow="sm" border={true} overflow="hidden" className="divide-y divide-line">',
    '<Stack surface="default" radius="2xl" shadow="sm" border={true} overflow="hidden" className="divide-y divide-line">' # It's a list, An An Stack can't natively do divide-y without raw tailwind, so leaving className="divide-y divide-line" is standard unless we map it. Let's just keep Box and leave className="divide-y divide-line".
)

# border-2 border-dashed
content = content.replace(
    '<Box height="full" display="flex" direction="col" align="center" justify="center" surface="default" radius="3xl" border={true} padding={20} minHeight={500} className="border-2 border-dashed text-center">',
    '<Stack height="full" align="center" justify="center" surface="default" radius="3xl" padding={20} minHeight={500} className="border-2 border-dashed text-center">'
)

with open("src/pages/UXAuditor.tsx", "w") as f:
    f.write(content)
