const template = document.createElement('template');
template.innerHTML = `
<style>
    @import url('https://www.maptiler.com/styles/base.css');
</style>
<style>
  .modal {
    display:block;
    font-family: "Open Sans", sans-serif;
  }
</style>
<div class="modal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-body">
          <div class="message warning">
              To load the map, you must replace <strong>YOUR_API_KEY</strong> in the URL with your <a href="https://cloud.maptiler.com/account/keys/" target="_blank" rel="noopener noreferrer">MapTiler API key</a> or use a valid API key. If you don't have a MapTiler Cloud account, you can <a href="https://cloud.maptiler.com/start" target="_blank" rel="noopener noreferrer">create an account for FREE</a>.
          </div>
        </div>
    </div>
  </div>
</div>
`;

export default class MapTilerApiKeyMessage extends HTMLElement {
  constructor() {
    // always call super() first
    super(); 
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('maptiler-apikey-message', MapTilerApiKeyMessage);