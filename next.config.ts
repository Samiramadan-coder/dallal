import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Avatar uploads (5 MB max on the client) + multipart overhead
      bodySizeLimit: "6mb",
    },
  },
  images: {
    domains: ["api.dallalhoolee.com"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
