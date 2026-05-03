import { siteDescription, siteName, siteUrl } from "@/lib/seo";

export const buildSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Ariel Anders",
  },
});
