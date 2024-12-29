import { colorPalette } from "@/styles/ColorPalette";
import { typography } from "@/styles/Typography";
import { LitElement, css, html } from "lit";

export class SampleColor extends LitElement {
  static styles = [
    typography,
    colorPalette,
    css`
      .hello-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--spacing-4);
        gap: var(--spacing-2);
      }

      .hello-box {
        padding: var(--spacing-2);
        border-radius: 8px;
        color: var(--basic-white);
        text-align: center;
        width: 200px;
        font-family: var(--font-family-sans);
        font-weight: var(--font-bold);
        line-height: var(--lh-base);

      .light {
        background-color: var(--light-basic-blue);
      }

      .basic {
        background-color: var(--basic-green);
      }

      .dark {
        background-color: var(--dark-basic-red);
      }

      @media (prefers-color-scheme: dark) {
        .hello-box {
          color: var(--dark-basic-white);
        }
      }

      @media (max-width: 600px) {
        .hello-box {
          width: 150px;
          font-size: var(--font-sm);
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="hello-container">
        <div class="hello-box light">Hello World - Light</div>
        <div class="hello-box basic">Hello World - Basic</div>
        <div class="hello-box dark">Hello World - Dark</div>
      </div>
    `;
  }
}

customElements.define("sample-color", SampleColor);
