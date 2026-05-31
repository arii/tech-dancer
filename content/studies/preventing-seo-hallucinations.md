---
title: "Preventing SEO Hallucinations in Product Structured Data"
date: "2024-04-18"
category: "Data Science"
excerpt: "Ensuring your ecommerce structured data remains accurate and trustworthy."
tags: ["SEO", "Structured Data", "JSON-LD", "Ecommerce"]
readTime: 10
status: "draft"
draft: true
author: "Ariel Anders"
---

# SEO Integrity in Ecommerce

Structured data (JSON-LD) is vital for search engine visibility, but it must be accurate. Dynamic data like price and availability can easily become "hallucinated" if not synced correctly.

## Our Strategy

1.  **Conservative Emission**: We only emit stable, site-controlled fields like name, description, and brand.
2.  **Exclusion of Volatile Data**: Dynamic fields such as price and stock are excluded from the initial generation to prevent SEO risks from unverified source data.
3.  **Validation**: Using unit tests to ensure that structured data follows strict policies before being deployed.

## Goal

By maintaining high data integrity, we ensure that search engines and users can trust the information provided in our search results.
