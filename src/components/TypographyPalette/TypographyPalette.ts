import { colorPalette } from "@/styles/ColorPalette";
import { typography } from "@/styles/Typography";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("typography-palette")
export class TypographyPalette extends LitElement {
  static styles = [
    typography,
    colorPalette,
    css`
      .palette {
        width: 100%;
        padding: var(--spacing-4);
        background-color: var(--basic-white);
        color: var(--basic-black);
        box-sizing: border-box;
        overflow-x: auto;
      }

      h2 {
        font-size: var(--font-2xl);
        margin-bottom: var(--spacing-2);
        text-align: center;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 640px;
      }

      th,
      td {
        padding: var(--spacing-2);
        text-align: center;
        border: 1px solid var(--basic-gray);
        position: relative;
      }

      th {
        background-color: var(--basic-gray);
        color: var(--basic-white);
      }

      .typography-box {
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        border: 1px solid var(--basic-gray);
        border-radius: 4px;
        padding: var(--spacing-2);
        cursor: pointer;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .typography-box:hover,
      .typography-box:focus {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .tooltip {
        visibility: hidden;
        width: max-content;
        background-color: var(--basic-white);
        color: var(--basic-black);
        text-align: center;
        border-radius: 4px;
        padding: 4px 8px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.3s;
        font-size: var(--font-xs);
        pointer-events: none;
      }

      .typography-box:hover .tooltip,
      .typography-box:focus .tooltip {
        visibility: visible;
        opacity: 1;
      }

      .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--basic-white) transparent transparent transparent;
      }

      @media (prefers-color-scheme: dark) {
        .palette {
          background-color: var(--dark-basic-black);
          color: var(--dark-basic-white);
        }
        th {
          background-color: var(--dark-basic-gray);
        }
        th,
        td {
          border: 1px solid var(--dark-basic-gray);
        }
        .typography-box {
          border: 1px solid var(--dark-basic-silver);
        }
        .typography-box:hover,
        .typography-box:focus {
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
        }
        .tooltip {
          background-color: var(--dark-basic-black);
          color: var(--dark-basic-white);
        }
        .tooltip::after {
          border-color: var(--dark-basic-black) transparent transparent
            transparent;
        }
      }

      @media (max-width: 600px) {
        .typography-box {
          max-width: 220px;
          padding: var(--spacing-1);
        }
        th,
        td {
          padding: var(--spacing-1);
        }
      }
    `,
  ];

  private typographyList = [
    {
      label: "XS",
      sizeToken: "--font-xs",
      px: "12px",
      lineHeight: "--lh-tight",
      usage: "Microcopy, Footnotes",
      previewText: "Typography XS: Quick brown fox",
    },
    {
      label: "SM",
      sizeToken: "--font-sm",
      px: "14px",
      lineHeight: "--lh-base",
      usage: "Captions, Subtexts",
      previewText: "Typography SM: Quick brown fox",
    },
    {
      label: "BASE",
      sizeToken: "--font-base",
      px: "16px",
      lineHeight: "--lh-base",
      usage: "Body Text, Default",
      previewText: "Typography BASE: Quick brown fox",
    },
    {
      label: "LG",
      sizeToken: "--font-lg",
      px: "18px",
      lineHeight: "--lh-base",
      usage: "Subheadings, Emphasis",
      previewText: "Typography LG: Quick brown fox",
    },
    {
      label: "XL",
      sizeToken: "--font-xl",
      px: "20px",
      lineHeight: "--lh-heading",
      usage: "Section Headings",
      previewText: "Typography XL: Quick brown fox",
    },
    {
      label: "2XL",
      sizeToken: "--font-2xl",
      px: "24px",
      lineHeight: "--lh-heading",
      usage: "H3/H2 Headings",
      previewText: "Typography 2XL: Quick brown fox",
    },
    {
      label: "3XL",
      sizeToken: "--font-3xl",
      px: "30px",
      lineHeight: "--lh-heading",
      usage: "H2/H1 Headings",
      previewText: "Typography 3XL: Quick brown fox",
    },
    {
      label: "4XL",
      sizeToken: "--font-4xl",
      px: "36px",
      lineHeight: "--lh-heading",
      usage: "Prominent H1",
      previewText: "Typography 4XL: Quick brown fox",
    },
    {
      label: "5XL",
      sizeToken: "--font-5xl",
      px: "48px",
      lineHeight: "--lh-heading",
      usage: "Hero Titles",
      previewText: "Typography 5XL: Quick brown fox",
    },
  ];

  private copyToClipboard(text: string, tooltipId: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        const tooltip = this.renderRoot.getElementById(tooltipId);
        if (tooltip) {
          const originalText = tooltip.textContent;
          tooltip.textContent = "Copied!";
          setTimeout(() => {
            if (tooltip) {
              tooltip.textContent = originalText;
            }
          }, 1500);
        }
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  }

  render() {
    return html`
      <div class="palette">
        <h2>Typography Palette</h2>
        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Font Size (rem/px)</th>
              <th>Line Height Token</th>
              <th>Usage</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            ${this.typographyList.map((item) => {
              const tooltipId = `tooltip-${item.label}`;
              return html`
                <tr>
                  <td>${item.label}</td>
                  <td>
                    <div
                      style="display: flex; flex-direction: column; gap: var(--spacing-1); align-items:center;"
                    >
                      <span>${item.sizeToken}</span>
                      <span>${item.px}</span>
                    </div>
                  </td>
                  <td>
                    <span>${item.lineHeight}</span>
                  </td>
                  <td>${item.usage}</td>
                  <td>
                    <div
                      class="typography-box"
                      style="
                        font-size: var(${item.sizeToken});
                        line-height: var(${item.lineHeight});
                      "
                      @click="${() =>
                        this.copyToClipboard(
                          `font-size: var(${item.sizeToken}); line-height: var(${item.lineHeight});`,
                          tooltipId
                        )}"
                      tabindex="0"
                      @keypress="${(e: KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          this.copyToClipboard(
                            `font-size: var(${item.sizeToken}); line-height: var(${item.lineHeight});`,
                            tooltipId
                          );
                        }
                      }}"
                      aria-describedby=${tooltipId}
                    >
                      ${item.previewText}
                      <span class="tooltip" id="${tooltipId}">
                        Click to copy
                      </span>
                    </div>
                  </td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "typography-palette": TypographyPalette;
  }
}
