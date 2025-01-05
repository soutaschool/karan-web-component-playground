import { colorPalette } from "@/styles/ColorPalette";
import { typography } from "@/styles/Typography";
import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type NavItem = {
  label: string;
  href: string;
};

@customElement("my-header")
export class MyHeader extends LitElement {
  @property({ type: String }) logo = "LOGO";
  @property({ type: Array }) navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  @state() private isOpen = false;

  static styles = [
    colorPalette,
    typography,
    css`
      :host {
        display: block;
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
      .header {
        width: 100%;
      }
      .skip-link {
        position: absolute;
        left: -9999px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
      .skip-link:focus {
        position: static;
        width: auto;
        height: auto;
        margin: var(--spacing-2);
        padding: var(--spacing-2);
        background-color: var(--basic-green);
        color: var(--basic-white);
      }
      .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-4);
      }
      .logo {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
      .logo-link {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s ease-in-out;
      }
      .logo-link:hover,
      .logo-link:focus {
        opacity: 0.75;
      }
      .hamburger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--spacing-6);
        height: var(--spacing-6);
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: var(--spacing-1);
        transition: background-color 0.2s ease-in-out;
      }
      .hamburger:hover,
      .hamburger:focus {
        background-color: var(--basic-gray) 0.1;
      }
      @media (prefers-color-scheme: dark) {
        .hamburger {
          color: var(--dark-basic-white);
        }
      }
      .lines {
        position: relative;
        width: var(--spacing-6);
        height: var(--spacing-6);
      }
      .line {
        position: absolute;
        width: var(--spacing-6);
        height: 2px;
        background-color: currentColor;
        transition:
          transform 0.3s ease-in-out,
          top 0.3s ease-in-out,
          opacity 0.3s ease-in-out;
      }
      .line1 {
        top: 6px;
      }
      .line2 {
        top: 13px;
      }
      .line3 {
        bottom: 6px;
      }
      .open .line1 {
        top: 13px;
        transform: rotate(45deg);
      }
      .open .line2 {
        opacity: 0;
      }
      .open .line3 {
        bottom: 6px;
        transform: rotate(-45deg) translateY(-2px);
      }
      nav {
        display: none;
      }
      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      nav a {
        text-decoration: none;
        color: inherit;
        padding: var(--spacing-2) var(--spacing-1);
        display: block;
        transition: opacity 0.2s ease-in-out;
      }
      nav a:hover,
      nav a:focus {
        opacity: 0.75;
      }
      @media (min-width: 768px) {
        .hamburger {
          display: none;
        }
        nav {
          display: flex;
          align-items: center;
          gap: var(--spacing-8);
        }
      }
      .menu-container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
        border-top: none;
        background-color: var(--light-basic-white);
      }
      .menu-open {
        max-height: 400px;
        border-top: 1px solid var(--basic-gray);
      }
      @media (prefers-color-scheme: dark) {
        .menu-container {
          background-color: var(--dark-basic-black);
        }
        .menu-open {
          border-top: 1px solid var(--dark-basic-white);
        }
      }
      .menu-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
        padding: var(--spacing-4);
        list-style-type: none;
      }
      .menu {
        color: var(--light-basic-black);
      }
      @media (prefers-color-scheme: dark) {
        .menu {
          color: var(--dark-basic-white);
        }
      }
      @media (min-width: 768px) {
        .menu-container {
          display: none;
        }
      }
    `,
  ];

  private toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <header class="header">
        <a href="#main" class="skip-link">Skip to main content</a>
        <div class="header-content">
          <h1 class="logo">
            <a href="/" class="logo-link">${this.logo}</a>
          </h1>
          <button
            class="hamburger ${this.isOpen ? "open" : ""}"
            @click="${this.toggleMenu}"
            aria-label="Toggle Menu"
            aria-expanded="${this.isOpen}"
          >
            <div class="lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>
          </button>
          <nav>
            ${this.navItems.map(
              (item) => html` <a href="${item.href}">${item.label}</a> `
            )}
          </nav>
        </div>
        <div
          class="menu-container ${this.isOpen ? "menu-open" : ""}"
          aria-hidden="${!this.isOpen}"
        >
          <ul class="menu-list">
            ${this.navItems.map(
              (item) => html`
                <li>
                  <a class="menu" href="${item.href}">${item.label}</a>
                </li>
              `
            )}
          </ul>
        </div>
      </header>
    `;
  }
}
