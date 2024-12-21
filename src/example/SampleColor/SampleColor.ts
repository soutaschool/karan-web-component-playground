import { colorPalette } from "@/styles/ColorPalette";
import { commonStyles } from "@/styles/CommonStyles";
import { LitElement, css, html } from "lit";

export class SampleColor extends LitElement {
  static styles = [
    commonStyles,
    colorPalette,
    css`
      .hello-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--space-lg);
        gap: var(--space-md);
      }

      .hello-box {
        padding: var(--space-md);
        border-radius: 8px;
        color: var(--basic-white);
        font-size: 1.5rem;
        text-align: center;
        width: 200px;
      }

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
          font-size: 1.2rem;
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
