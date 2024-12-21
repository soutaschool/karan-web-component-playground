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
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: var(--space-sm);
        text-align: center;
        border: 1px solid #ddd;
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
      }

      .color-box:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

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
        .color-box:hover {
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
        }
      }

      @media (max-width: 800px) {
        .color-box {
          max-width: 80px;
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
      }
    `,
  ];

  private colors = [
    "black",
    "silver",
    "gray",
    "white",
    "maroon",
    "red",
    "purple",
    "fuchsia",
    "green",
    "lime",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
  ];

  render() {
    return html`
      <div class="palette">
        <table>
          <thead>
            <tr>
              <th>Color Name</th>
              <th>Light</th>
              <th>Basic</th>
              <th>Dark</th>
            </tr>
          </thead>
          <tbody>
            ${this.colors.map(
              (color) => html`
                <tr>
                  <td style="text-transform: capitalize;">${color}</td>
                  <td>
                    <div
                      class="color-box"
                      style="background-color: var(--light-basic-${color})"
                      title="Light: var(--light-basic-${color})"
                    ></div>
                  </td>
                  <td>
                    <div
                      class="color-box"
                      style="background-color: var(--basic-${color})"
                      title="Basic: var(--basic-${color})"
                    ></div>
                  </td>
                  <td>
                    <div
                      class="color-box"
                      style="background-color: var(--dark-basic-${color})"
                      title="Dark: var(--dark-basic-${color})"
                    ></div>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
