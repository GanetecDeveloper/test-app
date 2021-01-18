import { LitElement, html, customElement } from 'lit-element';

// @customElement('g360-test')
export class G360TestComponent extends LitElement {

  render() {
    /**
     * `render` must return a lit-html `TemplateResult`.
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    console.log('test-component', this);
    return html`
    <style>
      @use "@material/card";
      @include card.core-styles;
    </style>
    <div class="mdc-card">
      <h1>Test works!</h1>
      <p>For real though!</p>
    </div>
    `;
  }
}
customElements.define('g360-test', G360TestComponent);