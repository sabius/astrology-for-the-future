import { LitElement, html } from "lit";

export class LanguageSwitcher extends LitElement {
  currentPath = "/";
  isRoot = false;

  // Use light DOM so pre-rendered SSR HTML and Tailwind styles apply directly
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleClick);
  }

  private handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest("[data-lang-btn]");
    if (!target) return;
    const targetLang = target.getAttribute("data-lang-btn") as "en" | "es" | null;
    if (targetLang === "es" || targetLang === "en") {
      try {
        localStorage.setItem("user_lang", targetLang);
      } catch (err) {}
      document.documentElement.lang = targetLang;
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("language-switcher")) {
  customElements.define("language-switcher", LanguageSwitcher);
}
