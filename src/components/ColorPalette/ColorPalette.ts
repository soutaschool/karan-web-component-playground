import { colorPalette } from "@/styles/ColorPalette";
import { commonStyles } from "@/styles/CommonStyles";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("color-palette")
export class ColorPalette extends LitElement {
  static styles = [
    commonStyles,
    colorPalette,
    css`
      .palette {
        width: 100%;
        padding: var(--space-lg);
        background-color: var(--basic-white);
        color: var(--basic-black);
        box-sizing: border-box;
        overflow-x: auto; /* Enable horizontal scrolling on small screens */
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px; /* Ensure table maintains minimum width */
      }

      th,
      td {
        padding: var(--space-sm);
        text-align: center;
        border: 1px solid #ddd;
        position: relative; /* Needed for tooltip positioning */
      }

      th {
        background-color: var(--basic-gray);
        color: var(--basic-white);
      }

      .color-box {
        width: 80%;
        max-width: 100px;
        aspect-ratio: 1 / 1;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
        cursor: pointer;
        margin: 0 auto;
        position: relative; /* For tooltip */
      }

      .color-box:hover,
      .color-box:focus {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .usage {
        font-size: var(--font-size-sm);
        color: var(--basic-gray);
        padding: var(--space-xs);
        max-width: 200px;
        margin: 0 auto;
      }

      /* Tooltip Styles */
      .tooltip {
        visibility: hidden;
        width: max-content;
        background-color: var(--basic-black);
        color: var(--basic-white);
        text-align: center;
        border-radius: 4px;
        padding: 4px 8px;
        position: absolute;
        z-index: 1;
        bottom: 125%; /* Position above the color box */
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.3s;
        font-size: var(--font-size-xs);
        pointer-events: none;
      }

      .color-box:hover .tooltip,
      .color-box:focus .tooltip {
        visibility: visible;
        opacity: 1;
      }

      .tooltip::after {
        content: "";
        position: absolute;
        top: 100%; /* Arrow at the bottom of the tooltip */
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--basic-black) transparent transparent transparent;
      }

      /* Dark Theme Styles */
      @media (prefers-color-scheme: dark) {
        .palette {
          background-color: var(--dark-basic-black);
          color: var(--dark-basic-white);
        }
        th {
          background-color: var(--dark-basic-gray);
        }
        .color-box {
          border: 1px solid var(--dark-basic-silver);
        }
        .color-box:hover,
        .color-box:focus {
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
        }
        .usage {
          color: var(--dark-basic-silver);
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

      /* Responsive Styles */
      @media (max-width: 800px) {
        .color-box {
          max-width: 80px;
        }
        .usage {
          max-width: 150px;
        }
      }

      @media (max-width: 600px) {
        .color-box {
          max-width: 60px;
        }
        th,
        td {
          padding: var(--space-xs);
        }
        /* Remove display: none to keep Usage Examples visible */
        .usage {
          display: table-cell;
        }
        /* Adjust font size for better readability */
        .usage {
          font-size: var(--font-size-xs);
        }
      }

      /* Optional: Adjust table layout for very small screens */
      @media (max-width: 400px) {
        table {
          min-width: 400px;
        }
        th,
        td {
          padding: var(--space-xs);
        }
        .usage {
          max-width: 100px;
        }
      }
    `,
  ];

  // Define an array of color objects including usage examples and hex codes
  private colors = [
    {
      name: "black",
      usage: "Text, Icons",
      lightHex: "#333333",
      basicHex: "#000000",
      darkHex: "#121212",
    },
    {
      name: "silver",
      usage: "Subtext, Borders",
      lightHex: "#777777",
      basicHex: "#c0c0c0",
      darkHex: "#c0c0c0",
    },
    {
      name: "gray",
      usage: "Background, Cards",
      lightHex: "#555555",
      basicHex: "#808080",
      darkHex: "#aaaaaa",
    },
    {
      name: "white",
      usage: "Background, Cards, Text",
      lightHex: "#eeeeee",
      basicHex: "#ffffff",
      darkHex: "#f0f0f0",
    },
    {
      name: "maroon",
      usage: "Action Buttons, Links",
      lightHex: "#800000",
      basicHex: "#800000",
      darkHex: "#ff4d4d",
    },
    {
      name: "red",
      usage: "Error Messages, Alerts",
      lightHex: "#b30000",
      basicHex: "#ff0000",
      darkHex: "#ff3333",
    },
    {
      name: "purple",
      usage: "Highlights, Emphasis",
      lightHex: "#800080",
      basicHex: "#800080",
      darkHex: "#cc66cc",
    },
    {
      name: "fuchsia",
      usage: "Focus Rings, Active States",
      lightHex: "#b300b3",
      basicHex: "#ff00ff",
      darkHex: "#ff66ff",
    },
    {
      name: "green",
      usage: "Success Messages, Approval Buttons",
      lightHex: "#008000",
      basicHex: "#008000",
      darkHex: "#33cc33",
    },
    {
      name: "lime",
      usage: "Growth Indicators, Progress Bars",
      lightHex: "#2d7f2d",
      basicHex: "#00ff00",
      darkHex: "#66ff66",
    },
    {
      name: "olive",
      usage: "Backgrounds, Section Dividers",
      lightHex: "#666600",
      basicHex: "#808000",
      darkHex: "#cccc33",
    },
    {
      name: "yellow",
      usage: "Warnings, Attention Alerts",
      lightHex: "#999900",
      basicHex: "#ffff00",
      darkHex: "#ffff33",
    },
    {
      name: "navy",
      usage: "Headers, Navigation",
      lightHex: "#000080",
      basicHex: "#000080",
      darkHex: "#6666ff",
    },
    {
      name: "blue",
      usage: "Links, Action Buttons",
      lightHex: "#0000b3",
      basicHex: "#0000ff",
      darkHex: "#4d4dff",
    },
    {
      name: "teal",
      usage: "Information, Tooltips",
      lightHex: "#006666",
      basicHex: "#008080",
      darkHex: "#33cccc",
    },
    {
      name: "aqua",
      usage: "Highlights, Accent Colors",
      lightHex: "#009999",
      basicHex: "#00ffff",
      darkHex: "#66ffff",
    },
  ];

  /**
   * Copies the provided hex code to the clipboard and provides feedback.
   * @param hex The hex code to copy.
   * @param tooltipId The ID of the tooltip element for feedback.
   */
  private copyToClipboard(hex: string, tooltipId: string) {
    navigator.clipboard.writeText(hex).then(
      () => {
        const tooltip = this.renderRoot.getElementById(tooltipId);
        if (tooltip) {
          const originalText = tooltip.textContent;
          tooltip.textContent = "Copied!";
          setTimeout(() => {
            if (tooltip) {
              tooltip.textContent = originalText;
            }
          }, 2000);
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
        <table>
          <thead>
            <tr>
              <th>Color Name</th>
              <th>Light Mode</th>
              <th>Basic Mode</th>
              <th>Dark Mode</th>
              <th class="usage-header">Usage Examples</th>
            </tr>
          </thead>
          <tbody>
            ${this.colors.map(
              (color) => html`
                <tr>
                  <td style="text-transform: capitalize;">${color.name}</td>
                  <td>
                    <div
                      class="color-box"
                      style="background-color: var(--light-basic-${color.name})"
                      aria-describedby="tooltip-light-${color.name}"
                      tabindex="0"
                    >
                      <span
                        class="tooltip"
                        id="tooltip-light-${color.name}"
                        @click="${() =>
                          this.copyToClipboard(
                            color.lightHex,
                            `tooltip-light-${color.name}`
                          )}"
                        role="button"
                        tabindex="0"
                        @keypress="${(e: KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            this.copyToClipboard(
                              color.lightHex,
                              `tooltip-light-${color.name}`
                            );
                          }
                        }}"
                      >
                        ${color.lightHex}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="color-box"
                      style="background-color: var(--basic-${color.name})"
                      aria-describedby="tooltip-basic-${color.name}"
                      tabindex="0"
                    >
                      <span
                        class="tooltip"
                        id="tooltip-basic-${color.name}"
                        @click="${() =>
                          this.copyToClipboard(
                            color.basicHex,
                            `tooltip-basic-${color.name}`
                          )}"
                        role="button"
                        tabindex="0"
                        @keypress="${(e: KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            this.copyToClipboard(
                              color.basicHex,
                              `tooltip-basic-${color.name}`
                            );
                          }
                        }}"
                      >
                        ${color.basicHex}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="color-box"
                      style="background-color: var(--dark-basic-${color.name})"
                      aria-describedby="tooltip-dark-${color.name}"
                      tabindex="0"
                    >
                      <span
                        class="tooltip"
                        id="tooltip-dark-${color.name}"
                        @click="${() =>
                          this.copyToClipboard(
                            color.darkHex,
                            `tooltip-dark-${color.name}`
                          )}"
                        role="button"
                        tabindex="0"
                        @keypress="${(e: KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            this.copyToClipboard(
                              color.darkHex,
                              `tooltip-dark-${color.name}`
                            );
                          }
                        }}"
                      >
                        ${color.darkHex}
                      </span>
                    </div>
                  </td>
                  <td class="usage">${color.usage}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "color-palette": ColorPalette;
  }
}
