import { colorPalette } from "@/styles/ColorPalette";
import { typography } from "@/styles/Typography";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type NavItem = {
  label: string;
  href: string;
};

@customElement("my-footer")
export class MyFooter extends LitElement {
  @property({ type: String }) logo?: string;
  @property({ type: Array }) navItems: NavItem[] = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Q&A", href: "/qa" },
  ];

  static styles = [
    colorPalette,
    typography,
    css`
      :host {
        display: block;
        position: relative;
        margin-top: var(--spacing-8);
        background-color: var(--light-basic-white);
        color: var(--light-basic-black);
        font-family: var(--font-family-sans);
      }
      @media (prefers-color-scheme: dark) {
        :host {
          background-color: var(--dark-basic-black);
          color: var(--dark-basic-white);
        }
      }
      .gradient-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(
          to right,
          var(--basic-lime),
          var(--basic-teal),
          var(--basic-blue)
        );
      }
      .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--spacing-6) var(--spacing-4);
        text-align: center;
        gap: var(--spacing-4);
      }
      @media (min-width: 768px) {
        .footer-content {
          flex-direction: row;
          justify-content: space-between;
          text-align: left;
          padding: var(--spacing-6) var(--spacing-8);
        }
      }
      .logo {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
      .nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-4);
      }
      @media (min-width: 768px) {
        .nav {
          justify-content: flex-end;
          gap: var(--spacing-8);
        }
      }
      .link {
        text-decoration: none;
        color: inherit;
        padding: var(--spacing-1) var(--spacing-2);
        transition: opacity 0.2s ease-in-out;
      }
      .link:hover,
      .link:focus {
        opacity: 0.75;
      }
      .border {
        border-top: 1px dashed var(--basic-gray);
      }
      @media (prefers-color-scheme: dark) {
        .border {
          border-top: 1px dashed var(--basic-white);
        }
      }
      .copyright {
        padding: var(--spacing-4);
        text-align: center;
        font-size: var(--font-sm);
      }
      @media (min-width: 768px) {
        .copyright {
          padding: var(--spacing-4) var(--spacing-8);
        }
      }
    `,
  ];

  render() {
    return html`
      <footer>
        <div class="gradient-line"></div>
        <div
          class="footer-content"
          style=${!this.logo ? "justify-content: flex-end;" : ""}
        >
          ${this.logo ? html`<h2 class="logo">${this.logo}</h2>` : null}
          <nav class="nav">
            ${this.navItems.map(
              (item) => html`
                <a class="link" href=${item.href}>${item.label}</a>
              `
            )}
          </nav>
        </div>
        <div class="border">
          <div class="copyright">
            © ${new Date().getFullYear()} Your Company
          </div>
        </div>
      </footer>
    `;
  }
}
