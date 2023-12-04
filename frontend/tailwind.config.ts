import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        screens: {
            xsm: "420px"
        },
        boxShadow: {
            cards: "0px 1px 5px #111111",
        },
        colors: {
            mediumBlack: "#111111",
            lowBlack: "#202020",
            customRed:  "#ff3135",
            customOrange: "#ff6546",
            customLightGreen: "#509D45",
            customGreen: "#437453"
        }
        
        },
    },
    plugins: [],
}
export default config
