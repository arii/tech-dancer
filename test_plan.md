1. **Define styles in `src/index.css`**: Add `.bg-gradient-brand` and `.text-gradient-brand` matching cyan-to-purple.
2. **Rewrite `src/components/ui/PathSelector.tsx`**:
   - Replace the `HeroPathCard` usage with two new sections: "TRAIN SMARTER" and "TRAVEL BETTER".
   - Create an inline or separate `Visualizer` component that draws the vertical bars.
   - Adjust styling to remove "Cardocalypse" boxes while matching the mockup's dark background, using `Grid` and `Box` primitives.
3. **Verify Layout in `Home.tsx`**:
   - Ensure the updated `PathSelector` integrates correctly and matches the alignment shown in the mockup.
   - Remove the `width="full" className="border-y border-line"` from `Home.tsx` if it conflicts with the mockup's constrained layout.
4. **Complete Pre Commit Steps**: Run `pre_commit_instructions` and follow testing and linting checks.
