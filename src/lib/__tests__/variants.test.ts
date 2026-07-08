import { expect, test, describe } from "vitest";
import { transitions } from "@/styles/utilities";
import {
  buttonVariants,
  actionButtonVariants,
  cardVariants,
  filterButtonVariants,
  tagVariants,
  journalVariants,
  listRowVariants,
  createTransitionVariants
} from "../variants";

describe("Variants Factory (createTransitionVariants)", () => {
  const defaultTransitions = transitions.default;

  test("buttonVariants should include default transitions", () => {
    const classes = buttonVariants();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("actionButtonVariants should include default transitions", () => {
    const classes = actionButtonVariants();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("cardVariants should include default transitions", () => {
    const classes = cardVariants();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("filterButtonVariants should include default transitions", () => {
    const classes = filterButtonVariants();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("tagVariants should include default transitions", () => {
    const classes = tagVariants();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("journalVariants.card should include default transitions", () => {
    const classes = journalVariants.card();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("journalVariants.shareAction should include default transitions", () => {
    const classes = journalVariants.shareAction();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("journalVariants.tag should include default transitions", () => {
    const classes = journalVariants.tag();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("journalVariants.navLink should include default transitions", () => {
    const classes = journalVariants.navLink();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  test("listRowVariants should include default transitions", () => {
    const classes = listRowVariants();
    expect(classes).toContain(defaultTransitions);
    expect(classes).toContain("motion-reduce:transition-none");
  });

  describe("factory edge cases", () => {
    test("should handle empty base string", () => {
      const variants = createTransitionVariants("", {});
      expect(variants()).toBe(defaultTransitions);
    });

    test("should handle undefined config", () => {
      // @ts-expect-error - testing invalid input for robustness
      const variants = createTransitionVariants("base-class", undefined);
      expect(variants()).toBe(`base-class ${defaultTransitions}`);
    });

    test("should ensure motion-reduce:transition-none is present", () => {
      const variants = createTransitionVariants("test", {});
      expect(variants()).toContain("motion-reduce:transition-none");
    });
  });
});
