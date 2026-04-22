git checkout src/index.css
sed -i 's/\.gap-6 {/ /' src/index.css
sed -i 's/gap: 1.5rem; \/\* 24px \*\// /' src/index.css
sed -i 's/}//' src/index.css
git checkout src/index.css
