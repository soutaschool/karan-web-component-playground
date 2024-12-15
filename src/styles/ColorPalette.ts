import { css } from 'lit';

export const colorPalette = css`
  :host {
    /* Light Mode Colors */
    --light-basic-black: #333333;
    --light-basic-silver: #d3d3d3;
    --light-basic-gray: #a0a0a0;
    --light-basic-white: #f0f0f0;
    --light-basic-maroon: #a00000;
    --light-basic-red: #ff6666;
    --light-basic-purple: #a000a0;
    --light-basic-fuchsia: #ff66ff;
    --light-basic-green: #33cc33;
    --light-basic-lime: #66ff66;
    --light-basic-olive: #a0a000;
    --light-basic-yellow: #ffff66;
    --light-basic-navy: #333399;
    --light-basic-blue: #6666ff;
    --light-basic-teal: #33cccc;
    --light-basic-aqua: #66ffff;

    /* Dark Mode Colors */
    --dark-basic-black: #000000;
    --dark-basic-silver: #c0c0c0;
    --dark-basic-gray: #808080;
    --dark-basic-white: #f8f8f8;
    --dark-basic-maroon: #800000;
    --dark-basic-red: #ff0000;
    --dark-basic-purple: #800080;
    --dark-basic-fuchsia: #ff00ff;
    --dark-basic-green: #008000;
    --dark-basic-lime: #00ff00;
    --dark-basic-olive: #808000;
    --dark-basic-yellow: #ffff00;
    --dark-basic-navy: #000080;
    --dark-basic-blue: #0000ff;
    --dark-basic-teal: #008080;
    --dark-basic-aqua: #00ffff;
  }
`;
