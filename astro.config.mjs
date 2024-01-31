import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  base: '/docs',
  outDir: './dist/docs',
  integrations: [starlight({
    title: 'OpsMaru',
    logo: {
      src: './src/assets/logo.webp'
    },
    head: [
      {
        tag: 'script',
        attrs: {
          src: 'https://plausible.io/js/script.js',
          'data-domain': 'opsmaru.com',
          defer: true
        }
      }
    ],
    social: {
      github: 'https://github.com/upmaru/opsmaru-docs'
    },
    sidebar: [{
      label: 'Start Here',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Getting Started',
        link: '/getting-started/'
      }]
    }, {
      label: 'Infrastructure',
      autogenerate: {
        directory: 'infrastructure'
      }
    }, {
      label: 'Application',
      autogenerate: {
        directory: 'application'
      }
    }]
  }), react()]
});