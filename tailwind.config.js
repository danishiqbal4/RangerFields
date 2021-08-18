module.exports = {
	purge: [
		'./*.html',
        './js/*.js'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		borderWidth: {
			DEFAULT: '1px',
			'0': '0',
			'2': '2px',
			'3': '3px',
			'4': '4px',
			'6': '6px',
			'8': '8px',
			'12': '12px'
		},
        extend: {
            colors:{
                purple:{
                    light: '#A777F3',
                    back: '#957ff4',
                    dark: '#823BEE',
                    c100: '#F0E6FF',
                    c300:'#A26DF2',
                    c400: '#927DF4',
                    c500: '#8b4aef',
                    c600: '#C0A2EF',
                    c700: '#c3a3f7',
                    cD1B6FB: '#D1B6FB',
                    cBEA3E8: '#BEA3E8'
                },
                gray:{
                    c100: '#b58cf5',
                    c200: '#b7b7b7',
                    c300: '#707070',
                    c400: '#F7FBFF',
                    c500: '#DFDFDF',
                    c600: '#5D5D5D',
                    c700: '#F3F3F3',
                    c800: '#919191',
                    c900: '#ABABAB',
                    c1000: '#F9F9F9',
                    c1100: '#A5A5A5',
                    c1200: '#AEAEAE',
                    c1300: '#9E9E9E',
                    c1400: '#787878',
                    c1500: '#D2D2D2',
                    c1600: '#6A6A6A',
                    c1700: '#878787',
                    c1800: '#5E5E5E',
                    c1900: '#EFEFEF',
                    c2000: '#F8F8F8',
                    c2100: '#DBDBDB',
                    c2200: '#484848',
                    c2300: '#d0d0d0',
                    c2400: '#B4B4B4',
                    c2500: '#D1D1D1',
                    c959595: '#959595',
                    c838383: '#838383',
                    c707070: '#707070',
                    cdedede: '#dedede',
                    ceaeaea: '#eaeaea',
                    ccbcbcb: '#cbcbcb',
                    ce8e8e8: '#e8e8e8',
                    cc1c1c1: '#c1c1c1',
                    c5a5a5a: '#5a5a5a',
                    cc4c4c4: '#c4c4c4',
                    c565656: '#565656',
                    cf2f2f2: '#f2f2f2',
                    c9A9A9A: '#9A9A9A',
                    cc2c2c2: '#c2c2c2',
                    cacacac: '#acacac',
                    cEBEBEB: '#EBEBEB',
                    cD4D4D4: '#D4D4D4',
                    c676767: '#676767',
                    cA1A1A1: '#A1A1A1',
                    cF5F6FA: '#F5F6FA',
                    cbfbfbf: '#bfbfbf',
                    cf4f7f8: '#f4f7f8',
                    c444444: '#444444'
                },
                green:{
                    c400: '#04bb66',
                    c500: '#04A85C',
                    c00A759: '#00A759',
                    c11C873: '#11C873',
                    c049F57: '#049F57',
                    c257985: '#257985',
                    c10D67A: '#10D67A'
                },
                blue:{
                    c300: '#0473E2',
                    c400: '#007BF5',
                    c500: '#0076EB',
                    c0071AD: '#0071AD',
                    cBFDFFF: '#BFDFFF',
                    cf8fcff: '#f8fcff'
                },
                red:{
                    c200:'#ed6a5d',
                    c300:'#f33927',
                    cFF3429: '#FF3429'
                },
                yellow:{
                    c300: '#FFB129',
                    cFFE294: '#FFE294'
                },
                orange:{
                    c300: '#EE753B',
                    c400: '#FFB129'
                },
                cyan:{
                    ce1f2f2: '#e1f2f2'
                },
                black:{
                    c000000: '#000000',
                    c161616: '#161616'
                },
                pink:{
                    cF3BEBB: '#F3BEBB'
                }
            },
            fontfamily:{
                'sans': ['Helvetica Neue', 'Arial', 'sans-serif']
            },
            fontSize: {
                xxs: ['0.5rem', '0.5rem'],
                xxsl: ['0.625rem', '0.625rem'],
            },
            height: {
                '124': '31rem'
            },
            width: {
                '121': '30.25rem'
            }
        },
        fontFamily: {
            'montserrat': ['Montserrat', 'sans-serif'],
            'raleway': ['Raleway', 'sans-serif']		  
        }
	},
	variants: {
	    extend: {
            width: ['group-hover'],
            display: ['group-hover']
        },
	},
	plugins: [],
  }