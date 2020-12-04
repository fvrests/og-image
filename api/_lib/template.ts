
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const pier = readFileSync(`${__dirname}/../_fonts/PierSans-Bold.otf`).toString('base64');

// const isServer = node environment dev ? localhost : url (maybe get dynamically?)
const isDev = process.env.NODE_ENV === 'development'
const url = isDev ? 'http://localhost:3000' : 'https://og-image.fvrests.vercel.app'
function getCss(theme: string) {
    let background = `${url}/rose-pine-bg@2x.png`;
    let foreground = '#EDECFB';
    let subtle = '#e0def4';
    if (theme === 'moon') {
        background = `${url}/rose-pine-bg-moon@2x.png`;
    }
    if (theme === 'dawn') {
        background = `${url}/rose-pine-bg-dawn@2x.png`;
        foreground = '#575279';
        subtle = '#5F5B7F';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

      @font-face{
        font-family: 'Pier Sans';
        font-style: normal;
        font-weight: bold;
        src: url(data:font/opentype;base64,${pier}) format('opentype');
    }

    body {
        padding: 0;
        margin: 0;
        background-image: url('${background}');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }

    .spacer {
        margin: 150px;
    }

    .spacer-small {
        margin: 18px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Pier Sans', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        color: ${subtle};
    }
    .subheading {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        text-transform: uppercase;
        letter-spacing: 4px;
        color: ${foreground};
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="spacer">
            <div class="heading">${sanitizeHtml('Rosé Pine')
            }</div>
            <div class="spacer-small">
            <div class="subheading">${emojify(
                sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

