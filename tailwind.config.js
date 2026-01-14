/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./index.tsx",
        "./{pages,components,services,utils}/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontSize: {
                // Ensure base text isn't too small
                DEFAULT: ['1rem', { lineHeight: '1.5rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                xs: ['0.8125rem', { lineHeight: '1.125rem' }], // Increased from tiny sizes
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Manrope"', 'sans-serif'],
            },
            colors: {
                lux: {
                    cream: '#FAFAF9',
                    stone: '#E7E5E4',
                    text: '#1C1917',
                    muted: '#57534E', // Darker for better contrast
                    white: '#FFFFFF',
                    glass: 'rgba(255, 255, 255, 0.4)',
                    glassBorder: 'rgba(255, 255, 255, 0.4)',
                    accent: '#78716C', // Darker accent
                }
            },
            borderRadius: {
                '4xl': '2.5rem',
                '5xl': '3.5rem',
            },
            animation: {
                'marquee-horizontal': 'marquee-horizontal 60s linear infinite',
                'noise': 'noise 0.3s steps(3) infinite',
            },
            keyframes: {
                'marquee-horizontal': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'noise': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(-3%, -3%)' },
                    '50%': { transform: 'translate(3%, 3%)' },
                    '75%': { transform: 'translate(-3%, 3%)' },
                }
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: theme('colors.lux.text'),
                        h2: {
                            marginTop: '2em',
                            marginBottom: '1em',
                        },
                        h3: {
                            marginTop: '1.6em',
                            marginBottom: '0.6em',
                        },
                        p: {
                            marginTop: '1.25em',
                            marginBottom: '1.25em',
                        },
                        ul: {
                            marginTop: '1.25em',
                            marginBottom: '1.25em',
                        },
                        li: {
                            marginTop: '0.5em',
                            marginBottom: '0.5em',
                        },
                        code: {
                            color: theme('colors.lux.text'),
                            backgroundColor: theme('colors.stone.100'),
                            paddingLeft: '0.375rem',
                            paddingRight: '0.375rem',
                            paddingTop: '0.125rem',
                            paddingBottom: '0.125rem',
                            borderRadius: '0.25rem',
                            fontWeight: '400',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
