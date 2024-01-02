import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	min-height: 100vh;
	font-size: 16px;
	line-height: 1;

}
ol, ul, li {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
    text-decoration: none;
    color: inherit;
}  
input, button, textarea{
	background: transparent;
    border: none;
	color: inherit;
	outline: none;
} 
* { 
    box-sizing: border-box;
	font-family: 'Pretendard', sans-serif;
}

body::-webkit-scrollbar {
    width: 18px;
}

body::-webkit-scrollbar-track {
    border-radius: 8px;
}

body::-webkit-scrollbar-thumb {
    height: 56px;
    border-radius: 8px;
    border: 4px solid transparent;
    background-clip: content-box;
    background-color: #888;
}

body::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
`;

export default GlobalStyles;
