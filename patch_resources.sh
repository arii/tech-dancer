sed -i 's/className="hidden sm:flex group"/display={{ base: "none", sm: "flex" }} className="group"/g' src/pages/Resources.tsx
sed -i 's/ml-2/ml-2/g' src/pages/Resources.tsx # Wait ml-2 was part of ArrowRight?
