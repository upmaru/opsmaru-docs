import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/docs',
	integrations: [
		starlight({
			title: 'OpsMaru',
			social: {
				github: 'https://github.com/upmaru',
			},
			sidebar: [
				{
					label: 'Start Here',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting Started', link: '/getting-started/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
