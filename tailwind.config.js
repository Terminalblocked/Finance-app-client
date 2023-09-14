/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,tsx,jsx}', './**/.{html}'],
	theme: {
		container: {
			padding: '2rem',
			center: 'true',
		},
		extend: {
			fontFamily: {
				openSans: ['Open sans', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
