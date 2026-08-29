import re

with open('src/features/profile/ArielProfile.tsx', 'r') as f:
    content = f.read()

# 1. Create ConnectAndSocial
connect_social = """
const ConnectAndSocial = () => (
  <Box display="flex" wrap justify="center" gap={2.5} marginTop={6}>
    <Box as="a" href="https://instagram.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
      INSTAGRAM
    </Box>
    <Box as="a" href="https://linkedin.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
      LINKEDIN
    </Box>
    <Box as="a" href="https://github.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
      GITHUB
    </Box>
  </Box>
);
"""

# 2. Modify PortfolioCta
old_portfolio = """const PortfolioCta = () => (
  <Box
    display="flex"
    wrap="wrap"
    align={{ base: "start", sm: "center" }}
    justify="between"
    gap={4}
    marginTop={6}
    padding={{ default: 6, md: 8 }}
    radius="2xl"
    border
    className="border-brand-cyan/20 bg-gradient-to-r from-surface/90 via-brand-cyan/10 to-surface/90 backdrop-blur-md shadow-xl"
  >
    <Stack gap={2} className="max-w-2xl">
      <Box
        as="span"
        display="inline-flex"
        align="center"
        paddingX={2.5}
        paddingY={0.5}
        radius="full"
        border
        className="text-xs font-mono font-medium tracking-wider uppercase bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 w-max"
      >
        Engineering &amp; Robotics Consulting
      </Box>
      <Text size="sm" color="dim" className="md:text-base leading-relaxed text-text-dim">
        Specializing in robotics software architecture, agentic engineering, front-end development, and technical leadership. Let's build together.
      </Text>
    </Stack>
    <Box
      as="a"
      href="https://arii.github.io"
      target="_blank"
      rel="noopener noreferrer"
      shrink={0}
      display="inline-flex"
      align="center"
      justify="center"
      paddingX={5}
      paddingY={3}
      radius="xl"
      className="whitespace-nowrap bg-brand-cyan text-black font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
    >
      <span>Hire Me / View Portfolio →</span>
    </Box>
  </Box>
);"""

new_portfolio = """const PortfolioCta = () => (
  <Box
    display="flex"
    wrap="wrap"
    align={{ default: "start", sm: "center" }}
    justify="between"
    gap={6}
    marginTop={16}
    padding={{ default: 6, md: 8 }}
    radius="2xl"
    border
    className="border-line/60 bg-surface/40 hover:border-brand-cyan/30 transition-colors shadow-lg"
  >
    <Stack gap={2} className="max-w-2xl">
      <Text
        as="span"
        variant="mono"
        size="xs"
        weight="font-bold"
        uppercase
        tracking="widest"
        className="text-brand-cyan"
      >
        Engineering &amp; Robotics Consulting
      </Text>
      <Text size="sm" color="dim" className="md:text-base leading-relaxed text-text-dim">
        Specializing in robotics software architecture, agentic engineering, front-end development, and technical leadership. Let's build together.
      </Text>
    </Stack>
    <Box
      as="a"
      href="https://arii.github.io"
      target="_blank"
      rel="noopener noreferrer"
      shrink={0}
      display="inline-flex"
      align="center"
      justify="center"
      paddingX={5}
      paddingY={3}
      radius="xl"
      className="whitespace-nowrap bg-brand-cyan text-black font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
    >
      <span>Hire Me / View Portfolio →</span>
    </Box>
  </Box>
);"""

# 3. Refactor LegalAndSocial
old_legal = """const LegalAndSocial = () => (
  <Box as="section" maxWidth="6xl" marginX="auto" paddingX={4} marginTop={20} paddingTop={12} border="t" className="border-line/80">
    <Grid cols={{ default: 1, md: 2 }} gap={12}>
      <Stack gap={4}>
        <Text as="h4" variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" className="text-brand-cyan">
          Connect &amp; Social
        </Text>
        <Box display="flex" wrap gap={2.5}>
          <Box as="a" href="https://instagram.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
            INSTAGRAM
          </Box>
          <Box as="a" href="https://linkedin.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
            LINKEDIN
          </Box>
          <Box as="a" href="https://github.com" target="_blank" rel="noreferrer" paddingX={4} paddingY={2} radius="lg" border className="border-line bg-surface/60 hover:border-brand-cyan/40 hover:text-text-main text-text-dim transition-colors text-xs font-mono">
            GITHUB
          </Box>
        </Box>
      </Stack>

      <Grid cols={{ default: 1, sm: 2 }} gap={6} paddingLeft={{ md: 8 }} paddingTop={{ default: 8, md: 0 }} className="text-xs text-text-dim border-t md:border-t-0 md:border-l md:border-line/40">
        <Box id="privacy" scrollMarginTop={24}>
          <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Privacy Policy</Text>
          <p className="leading-relaxed text-text-dim">
            This site is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Form info is used solely for its intended purpose.
          </p>
        </Box>
        <Box id="terms" scrollMarginTop={24}>
          <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Terms of Use</Text>
          <p className="leading-relaxed text-text-dim">
            Content is provided for informational and entertainment purposes. We are not responsible for issues arising from tools, products, or travel advice mentioned.
          </p>
        </Box>
      </Grid>
    </Grid>
  </Box>
);"""

new_legal = """const LegalLinks = () => (
  <Box as="section" maxWidth="6xl" marginX="auto" paddingX={4} marginTop={20} paddingTop={12} border="t" className="border-line/80">
    <Grid cols={{ default: 1, sm: 2 }} gap={6} className="text-xs text-text-dim">
      <Box id="privacy" scrollMarginTop={24}>
        <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Privacy Policy</Text>
        <p className="leading-relaxed text-text-dim">
          This site is a personal project. We do not sell your data. We use basic analytics to understand site traffic. Form info is used solely for its intended purpose.
        </p>
      </Box>
      <Box id="terms" scrollMarginTop={24}>
        <Text as="h5" variant="mono" className="text-text-main uppercase tracking-wider text-xs">Terms of Use</Text>
        <p className="leading-relaxed text-text-dim">
          Content is provided for informational and entertainment purposes. We are not responsible for issues arising from tools, products, or travel advice mentioned.
        </p>
      </Box>
    </Grid>
  </Box>
);"""

# Replace in content
content = content.replace(old_portfolio, connect_social + "\n\n" + new_portfolio)
content = content.replace(old_legal, new_legal)

# 4. Modify ArielProfile
content = content.replace("<PortfolioCta />", "<ConnectAndSocial />")
content = content.replace("<LegalAndSocial />", "<PortfolioCta />\n      <LegalLinks />")

with open('src/features/profile/ArielProfile.tsx', 'w') as f:
    f.write(content)
