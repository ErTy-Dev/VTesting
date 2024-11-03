/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,tsx,ts}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontSize: {
				'2xl': '1.375rem',
			},
			colors: {
				primary: {
					100: '#ECF3FE',
					DEFAULT: '#4182F9',
				},
				gray: {
					DEFAULT: '#F9F9F9',
					text: '#ADA7A7',
					ICON: '#292D32',
				},
			},
			backgroundImage: {
				'custom-gradient-nav': 'linear-gradient(269.84deg, #4182F9 -38.97%, rgba(65, 130, 249, 0.00520833) 90.01%)',
				'custom-gradient-block': 'linear-gradient(to right, #B5D2F0 20%, #FDF6E3 65%)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
