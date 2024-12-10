import { commonStyles } from '@/styles/common-styles';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hello-world')
export class HelloWorld extends LitElement {
  static styles = [
    commonStyles,
    css`
      .title {
        color: var(--basic-red);
        font-size: var(--font-size-base);
      }
    `,
  ];

  render() {
    return html` <span class="title">Hello world</span> `;
  }
}
