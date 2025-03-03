import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: "/docs",
  outDir: "./dist/docs",
  integrations: [
    starlight({
      title: "OpsMaru",
      customCss: ["./src/style.css"],
      favicon: "/images/favicon.png",
      logo: {
        src: "./src/assets/logo.webp",
      },
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://plausible.io/js/script.js",
            "data-domain": "opsmaru.com",
            defer: true,
          },
        },
      ],
      social: {
        github: "https://github.com/upmaru/opsmaru-docs",
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Getting Started",
              link: "/getting-started/",
            },
          ],
        },
        {
          label: "Infrastructure",
          items: [
            {
              label: "Accessing your cluster",
              link: "/infrastructure/accessing-your-cluster/",
            },
            {
              label: "Amazon",
              items: [
                {
                  label: "Credentials",
                  link: "/infrastructure/aws/credentials/",
                },
                {
                  label: "SSH Keys",
                  link: "/infrastructure/aws/ssh-keys/",
                },
              ],
            },
            {
              label: "Digital Ocean",
              items: [
                {
                  label: "Credentials",
                  link: "/infrastructure/digitalocean/credentials/",
                },
                {
                  label: "SSH Keys",
                  link: "/infrastructure/digitalocean/ssh-keys/",
                },
              ],
            },
          ],
        },
        {
          label: "Application",
          items: [
            {
              label: "Connect repository",
              link: "/application/connect-repository/",
            },
            {
              label: "Useful commands",
              link: "/application/useful-commands/",
            },
            {
              label: "Ruby on Rails",
              items: [
                {
                  label: "Deployment",
                  link: "/application/rails/deployment/",
                },
              ],
            },
            {
              label: "Elixir / Phoenix",
              items: [
                {
                  label: "Deployment",
                  link: "/application/phoenix/deployment/",
                },
                {
                  label: "Database certificate",
                  link: "/application/phoenix/database-certificate/",
                },
                {
                  label: "Clustering support",
                  link: "/application/phoenix/clustering/",
                },
              ],
            },
            {
              label: "Astro",
              items: [
                {
                  label: "Static site",
                  link: "/application/astro/static/",
                },
              ],
            },
          ],
        },
        {
          label: "Build System",
          items: [
            {
              label: "PAKman",
              link: "/build/pakman/",
            },
            {
              label: "Github Action",
              link: "/build/github-action/",
            },
            {
              label: "Conditional deployment",
              link: "/build/conditional-deployment/",
            },
            {
              label: "Upgrade from v7",
              link: "/build/upgrade-from-v7/",
            },
          ],
        },
        {
          label: "Cluster Operation",
          items: [
            {
              label: "Uplink",
              items: [
                {
                  label: "Uplink Engine",
                  link: "/operation/uplink/",
                },
                {
                  label: "Changing upgrade strategy",
                  link: "/operation/uplink/changing-upgrade-strategy/",
                },
              ],
            },
            {
              label: "Lite VS Pro",
              link: "/operation/lite-vs-pro/",
            },
          ],
        },
        {
          label: "Trouble Shooting",
          items: [
            {
              label: "Platform provisioning",
              link: "/trouble-shooting/platform-provisioning/",
            },
          ],
        },
      ],
    }),
    react(),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
});
