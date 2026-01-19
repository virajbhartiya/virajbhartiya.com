/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/cv",
        destination: "/Viraj_Bhartiya.pdf",
        permanent: false,
      },
      {
        source: "/resume",
        destination: "/Viraj_Bhartiya.pdf",
        permanent: false,
      },
      {
        source: "/meet",
        destination: "https://cal.com/virajbhartiya",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/virajbhartiya",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/viraj-bhartiya/",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/heyxviraj",
        permanent: false,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/channel/UCvwfCZDYeUKWdmHUAGhgsnQ",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
