import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('g360-test')
export class G360TestComponent extends LitElement {

  @property({type: String})
  title = '';

  @property({type: String})
  image = '';

  @property({type: String})
  text = '';
  
  static get styles() {
    return [
      css`
        @use "@material/card";
        @include card.core-styles;
        .mdc-card .g360-card {
          height: 350px;
          width: 350px;
          backgroun-color: gray;
        }
        .g360-card-content .mdc-card__content{
          padding: 16px;
        }
        padding: 16px;
        // :host { display: block;
        //   border: 1px solid black;
        // }`
    ]
  }
  
  render() {
    /**
     * `render` must return a lit-html `TemplateResult`.
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    console.log('test-component', this);
    return html`
    <div class="g360-card mdc-card mdc-card--outlined">
      <div class="g360-card-header">
        <h3>${this.title}</h3>
      </div>
      ${this.image?
        html`
        <div class="g360-card-image">
          <img src="${this.image}"></img>
        </div>`:``
      }
      <div class="g360-card-content mdc-card__content">
        <p>${this.text}</p>
      </div>
      <div class="g360-card-actions"></div>
    </div>
    `;
  }
}
// customElements.define('g360-test', G360TestComponent);