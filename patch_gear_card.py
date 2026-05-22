with open('src/components/ui/GearCard.tsx', 'r') as f:
    content = f.read()

new_content = content.replace(
"""interface GearCardProps extends BaseProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  basePath: string;
  rating?: number;
  verdict?: string;
  image?: string;""",
"""interface GearCardProps extends BaseProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  basePath: string;
  rating?: number;
  verdict?: string;
  image?: string;
  externalUrl?: string;"""
)

new_content = new_content.replace(
"""      <Box
        as={NavLink}
        to={`${basePath}/${slug}`}
        aria-label={`Read gear review: ${title}`}
        className="absolute inset-0 z-10"
      />""",
"""      {externalUrl ? (
        <Box
          as="a"
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Shop Product: ${title}`}
          className="absolute inset-0 z-10"
        />
      ) : (
        <Box
          as={NavLink}
          to={`${basePath}/${slug}`}
          aria-label={`Read gear review: ${title}`}
          className="absolute inset-0 z-10"
        />
      )}"""
)

new_content = new_content.replace(
"""      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        {rating !== undefined && (
          <Box display="flex" align="center" gap={1}>
            <Star size={16} className="text-accent fill-accent" />
            <Text variant="mono" size="xs" weight="font-bold">
              {rating.toFixed(1)}/5
            </Text>
          </Box>
        )}
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
            Read review
          </Text>
          <ArrowRight className="w-3 h-3 text-accent" />
        </Box>
      </Box>""",
"""      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        {rating !== undefined && (
          <Box display="flex" align="center" gap={1}>
            <Star size={16} className="text-accent fill-accent" />
            <Text variant="mono" size="xs" weight="font-bold">
              {rating.toFixed(1)}/5
            </Text>
          </Box>
        )}
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
            {externalUrl ? "Buy on Amazon" : "Read review"}
          </Text>
          <ArrowRight className="w-3 h-3 text-accent" />
        </Box>
      </Box>"""
)

new_content = new_content.replace(
"""  externalUrl,""", # wait, wait. add to props destruction
"""  image,
  externalUrl,
  // Content metadata props to be ignored"""
)

with open('src/components/ui/GearCard.tsx', 'w') as f:
    f.write(new_content)
