import { colorPalette } from "@/styles/ColorPalette";
import { typography } from "@/styles/Typography";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: Number }) count = 0;

  static styles = [
    colorPalette,
    typography,
    css`
      .title {
        color: var(--basic-red);
        font-size: var(--font-base);
      }
    `,
  ];

  render() {
    return html` <span class="title">Hello ${this.title} ${this.count}</span> `;
  }
}
