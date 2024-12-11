import { commonStyles } from '@/styles/common-styles';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hello-world')
export class HelloWorld extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Number }) count = 0;

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
    return html` <span class="title">Hello ${this.title} ${this.count}</span> `;
  }
}
