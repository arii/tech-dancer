import { expect, test, describe } from "vitest";
import {
  buttonVariants,
  actionButtonVariants,
  cardVariants,
  filterButtonVariants,
  tagVariants,
  journalVariants,
  listRowVariants
} from "../variants";

describe("Variants Factory (createVariants)", () => {
  const defaultTransitions = "motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none";

  test("buttonVariants should include default transitions", () => {
    const classes = buttonVariants();
    expect(classes).toContain(defaultTransitions);
  });

  test("actionButtonVariants should include default transitions", () => {
    const classes = actionButtonVariants();
    expect(classes).toContain(defaultTransitions);
  });

  test("cardVariants should include default transitions", () => {
    const classes = cardVariants();
    expect(classes).toContain(defaultTransitions);
  });

  test("filterButtonVariants should include default transitions", () => {
    const classes = filterButtonVariants();
    expect(classes).toContain(defaultTransitions);
  });

  test("tagVariants should include default transitions", () => {
    const classes = tagVariants();
    expect(classes).toContain(defaultTransitions);
  });

  test("journalVariants.card should include default transitions", () => {
    const classes = journalVariants.card();
    expect(classes).toContain(defaultTransitions);
  });

  test("journalVariants.shareAction should include default transitions", () => {
    const classes = journalVariants.shareAction();
    expect(classes).toContain(defaultTransitions);
  });

  test("journalVariants.tag should include default transitions", () => {
    const classes = journalVariants.tag();
    expect(classes).toContain(defaultTransitions);
  });

  test("journalVariants.navLink should include default transitions", () => {
    const classes = journalVariants.navLink();
    expect(classes).toContain(defaultTransitions);
  });

  test("listRowVariants should include default transitions", () => {
    const classes = listRowVariants();
    expect(classes).toContain(defaultTransitions);
  });

  describe("createVariants edge cases", () => {
    test("should handle empty base string", async () => {
      const { createVariants } = await import("../variants");
      const variants = createVariants("", {});
      expect(variants()).toBe(defaultTransitions);
    });

    test("should handle undefined config", async () => {
      const { createVariants } = await import("../variants");
      // @ts-expect-error - testing invalid input
      const variants = createVariants("base-class", undefined);
      expect(variants()).toBe(`base-class ${defaultTransitions}`);
    });
  });
});
