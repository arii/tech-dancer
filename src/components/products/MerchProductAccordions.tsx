import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Ruler, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface AccordionItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({ id, title, icon, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <Box
      border
      radius="md"
      className="border-line/30 bg-surface/40 overflow-hidden transition-colors hover:border-line/50"
    >
      <Box
        as="button"
        type="button"
        onClick={onToggle}
        width="full"
        paddingX={4}
        paddingY={3.5}
        display="flex"
        align="center"
        justify="between"
        className="min-h-12 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <Stack direction="row" align="center" gap={2.5}>
          <Box className="text-accent">{icon}</Box>
          <Text variant="mono" size="xs" weight="font-bold" color="main">
            {title}
          </Text>
        </Stack>
        <ChevronDown
          className={`w-4 h-4 text-text-dim transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`}
        />
      </Box>

      {isOpen && (
        <Box
          id={`accordion-content-${id}`}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
          paddingX={4}
          paddingBottom={4}
          paddingTop={1}
          className="border-t border-line/20 bg-surface-alt/20"
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

interface MerchProductAccordionsProps {
  material?: string;
  sizeString?: string;
}

export function MerchProductAccordions({ material, sizeString }: MerchProductAccordionsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sizing: true,
    care: false,
    shipping: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sizes = sizeString ? sizeString.split('/').map((s) => s.trim()) : ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  return (
    <Stack gap={3} width="full">
      {/* Sizing & Fit Guide */}
      <AccordionItem
        id="sizing"
        title="Size & Fit Guide"
        icon={<Ruler className="w-4 h-4" />}
        isOpen={!!openSections.sizing}
        onToggle={() => toggleSection('sizing')}
      >
        <Stack gap={3}>
          <Text variant="body" size="xs" color="dim" leading="relaxed">
            Unisex classic fit with standard US standard sizing. Standard unisex tees run true to size; for an oversized dance aesthetic, we recommend sizing up one size.
          </Text>

          {/* Sizing Matrix */}
          <Box overflow="auto" className="w-full radius-sm border border-line/20">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-surface-alt/60 border-b border-line/20 text-text-main">
                  <Box as="th" padding={2} className="font-bold">Size</Box>
                  <Box as="th" padding={2} className="font-bold">Chest (in)</Box>
                  <Box as="th" padding={2} className="font-bold">Length (in)</Box>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/10 text-text-dim">
                {sizes.includes('XS') && (
                  <tr>
                    <Box as="td" padding={2} className="font-bold text-accent">XS</Box>
                    <Box as="td" padding={2}>31 - 34"</Box>
                    <Box as="td" padding={2}>27"</Box>
                  </tr>
                )}
                <tr>
                  <Box as="td" padding={2} className="font-bold text-accent">S</Box>
                  <Box as="td" padding={2}>34 - 37"</Box>
                  <Box as="td" padding={2}>28"</Box>
                </tr>
                <tr>
                  <Box as="td" padding={2} className="font-bold text-accent">M</Box>
                  <Box as="td" padding={2}>38 - 41"</Box>
                  <Box as="td" padding={2}>29"</Box>
                </tr>
                <tr>
                  <Box as="td" padding={2} className="font-bold text-accent">L</Box>
                  <Box as="td" padding={2}>42 - 45"</Box>
                  <Box as="td" padding={2}>30"</Box>
                </tr>
                <tr>
                  <Box as="td" padding={2} className="font-bold text-accent">XL</Box>
                  <Box as="td" padding={2}>46 - 49"</Box>
                  <Box as="td" padding={2}>31"</Box>
                </tr>
                {sizes.includes('2XL') && (
                  <tr>
                    <Box as="td" padding={2} className="font-bold text-accent">2XL</Box>
                    <Box as="td" padding={2}>50 - 53"</Box>
                    <Box as="td" padding={2}>32"</Box>
                  </tr>
                )}
                {sizes.includes('3XL') && (
                  <tr>
                    <Box as="td" padding={2} className="font-bold text-accent">3XL</Box>
                    <Box as="td" padding={2}>54 - 57"</Box>
                    <Box as="td" padding={2}>33"</Box>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Stack>
      </AccordionItem>

      {/* Fabric Care & Print Preservation */}
      <AccordionItem
        id="care"
        title="Fabric Care & Print Preservation"
        icon={<Sparkles className="w-4 h-4" />}
        isOpen={!!openSections.care}
        onToggle={() => toggleSection('care')}
      >
        <Stack gap={2.5}>
          {material && (
            <Text variant="mono" size="xs" color="accent" weight="font-bold">
              Material composition: {material}
            </Text>
          )}
          <Text variant="body" size="xs" color="dim" leading="relaxed">
            Crafted with pre-shrunk premium ring-spun cotton for optimal breathability on intense social dance floors. To keep neon and multi-color prints sharp over dozens of festival washes:
          </Text>
          <Stack gap={1.5} paddingLeft={1}>
            <Stack direction="row" align="baseline" gap={2}>
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              <Text variant="body" size="xs" color="dim">
                <strong>Wash cold:</strong> Machine wash inside out with like colors on cold/gentle cycle.
              </Text>
            </Stack>
            <Stack direction="row" align="baseline" gap={2}>
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              <Text variant="body" size="xs" color="dim">
                <strong>Dry low:</strong> Tumble dry low or hang dry to prevent micro-fading.
              </Text>
            </Stack>
            <Stack direction="row" align="baseline" gap={2}>
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              <Text variant="body" size="xs" color="dim">
                <strong>Ironing:</strong> Do not iron directly over printed graphics.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </AccordionItem>

      {/* Fulfillment & Shipping Details */}
      <AccordionItem
        id="shipping"
        title="Fulfillment & Shipping Guarantees"
        icon={<Truck className="w-4 h-4" />}
        isOpen={!!openSections.shipping}
        onToggle={() => toggleSection('shipping')}
      >
        <Stack gap={2.5}>
          <Text variant="body" size="xs" color="dim" leading="relaxed">
            Each apparel piece is custom printed on-demand via Printful to reduce textile waste. Orders ship globally with tracking.
          </Text>
          <Box padding={3} radius="md" className="bg-surface/60 border border-line/20 font-mono text-xs">
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="main" weight="font-bold">
                ⏱ Production Time: 2–7 business days
              </Text>
              <Text variant="mono" size="micro" color="main" weight="font-bold">
                🚚 Standard Transit: 4–8 business days (US & EU)
              </Text>
            </Stack>
          </Box>
          <Text variant="mono" size="micro" color="dim">
            Need details on order issues or exchanges? Review our{' '}
            <Link to="/return-policy" className="text-accent underline hover:text-accent-sky font-bold">
              Return Policy
            </Link>{' '}
            and{' '}
            <Link to="/shipping-policy" className="text-accent underline hover:text-accent-sky font-bold">
              Shipping Policy
            </Link>
            .
          </Text>
        </Stack>
      </AccordionItem>
    </Stack>
  );
}
