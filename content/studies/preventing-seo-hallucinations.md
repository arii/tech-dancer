---
title: "Preventing SEO Hallucinations in Product Structured Data"
date: "2024-04-17"
category: "Engineering"
excerpt: "AI-generated content can sometimes hallucinate technical details. Learn how to implement strict schema validation for SEO and JSON-LD."
tags: ["SEO", "JSON-LD", "Validation", "AI Safety"]
readTime: 10
status: "published"
author: "Ariel Anders"
---

# Trust but Verify: SEO Integrity

AI models are great at prose but poor at maintaining strict data structures. When generating JSON-LD for product pages, a single hallucinated price or rating can lead to a Google Search Console penalty.

## The "Conservative Schema" Policy

We implement a multi-layered defense against SEO hallucinations:

1.  **Static Field Enforcement**: We never allow the AI to generate fields like `price`, `availability`, or `sku`. These are pulled directly from the source of truth (WooCommerce/Printful).
2.  **Zod Validation**: All AI-generated metadata (titles, descriptions) is validated against a strict Zod schema before being committed.
3.  **Duplicate Prefix Prevention**: Our `getImageUrl` helper ensures that base URLs and asset prefixes aren't doubled up, a common error in automated content generation.

## Audit Trails

Every piece of AI-generated content is tagged in our internal database with the model version and the prompt hash used to generate it. This allows for rapid rollbacks if a specific model version starts producing low-quality results.

## Impact

By strictly separating "Creative Prose" (AI-driven) from "Transactional Data" (System-driven), we maintain 100% accuracy in our structured data while benefiting from AI's scale.
