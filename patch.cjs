const fs = require('fs');

const path = 'src/components/Navigation.tsx';
let data = fs.readFileSync(path, 'utf8');

const mobileMenuReplacement = `
            <Box as="ul" className="space-y-6">
              <Box as="li" position="relative" className="group">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    toggleSearch();
                  }}
                  className="flex items-center gap-4 transition-all relative z-10 rounded-md py-4 border-b border-line/50 text-xl text-text-dim hover:text-accent hover:bg-bg/50 w-full text-left"
                >
                  <Search className="w-6 h-6 stroke-[1.5]" />
                  <Text variant="sans" size="lg" weight="font-bold">
                    Search
                  </Text>
                </button>
              </Box>
              {routes.filter(r => r.path !== '/').map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={iconMap[item.path] || Terminal}
                  onClick={() => setIsOpen(false)}
                  isMobile
                />
              ))}
            </Box>
`;

data = data.replace(/<Box as="ul" className="space-y-6">[\s\S]*?<\/Box>/, mobileMenuReplacement.trim());

fs.writeFileSync(path, data);
