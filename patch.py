with open("dev-tools/tdw_services/ux_report.py", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'f"Accessibility Violation: {v[\'id\']} on `{route}` ({vp})"' in line:
        line = line.replace('f"Accessibility Violation: {v[\'id\']} on `{route}` ({vp})"', 'f"Accessibility Violation: {v[\'id\']} on `{route}` ({vp}) makes it difficult for users with disabilities to navigate or interact with the page effectively."')
    if 'f"Horizontal Overflow on `{route}` ({vp})"' in line:
        line = line.replace('f"Horizontal Overflow on `{route}` ({vp})"', 'f"Horizontal Overflow on `{route}` ({vp}) causes janky scrolling and potential content cut-off."')
    if 'f"Small Tap Targets on `{route}` ({vp})"' in line:
        line = line.replace('f"Small Tap Targets on `{route}` ({vp})"', 'f"Small Tap Targets on `{route}` ({vp}) makes interactive elements difficult to tap on a phone, leading to user frustration."')
    if 'f"Oversized Images on `{route}` ({vp})"' in line:
        line = line.replace('f"Oversized Images on `{route}` ({vp})"', 'f"Oversized Images on `{route}` ({vp}) increases page load time and consumes excessive bandwidth."')
    if 'f"Poor Above-the-Fold Visibility on `{route}` ({vp})"' in line:
        line = line.replace('f"Poor Above-the-Fold Visibility on `{route}` ({vp})"', 'f"Poor Above-the-Fold Visibility on `{route}` ({vp}) means the primary page purpose and next steps are unclear upon initial load."')

    if 'issue_file.write(f"## User impact\\n{f.get(\'user_impact\', \'N/A\')}\\n\\n")' in line:
        continue # Skip this line entirely

    if '"Ensure all elements use responsive widths and handle long content with word-wrap or overflow-x: auto."' in line:
        line = line.replace('"Ensure all elements use responsive widths and handle long content with word-wrap or overflow-x: auto."', '"Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: \\"full\\", md: \\"2xl\\" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow=\\"x-auto\\"` to the wrapping primitive to contain scrolling locally."')
    if '"Increase padding or dimensions of interactive elements to at least 44x44px for better mobile usability."' in line:
        line = line.replace('"Increase padding or dimensions of interactive elements to at least 44x44px for better mobile usability."', '"Ensure all interactive elements (buttons, links) are either utilizing our primary `ActionButton` variants or are wrapped in primitive layout components with explicit `padding={{ base: 4, md: 2 }}` spacing tokens to ensure a minimum touch area of 44x44px on mobile."')
    if '"Use responsive image sets (srcset) or serve optimized crops for smaller viewports."' in line:
        line = line.replace('"Use responsive image sets (srcset) or serve optimized crops for smaller viewports."', '"Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions."')

    new_lines.append(line)

with open("dev-tools/tdw_services/ux_report.py", "w") as f:
    f.writelines(new_lines)
