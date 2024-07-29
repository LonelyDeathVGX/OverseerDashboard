import type { MetadataRoute } from "next";
import { BASE_URL } from "#lib/Constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/team`,
      changeFrequency: "weekly",
    },
  ];
}
