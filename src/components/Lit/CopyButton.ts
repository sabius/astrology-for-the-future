import { LitElement, html } from "lit";

export class CopyButton extends LitElement {
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

  private handleClick = async (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest("[data-copy-text]");
    if (!target) return;

    const copyText = target.getAttribute("data-copy-text");
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      const originalText = target.textContent;
      const copiedMsg = document.documentElement.lang === "es" ? "¡Copiado!" : "Copied!";

      target.textContent = copiedMsg;
      target.classList.add("bg-green-600", "border-green-600");

      setTimeout(() => {
        target.textContent = originalText;
        target.classList.remove("bg-green-600", "border-green-600");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("copy-button")) {
  customElements.define("copy-button", CopyButton);
}
