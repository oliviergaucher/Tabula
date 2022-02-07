// @id xCew2nEKRXlKU8WttckWC1
class SparkcellName extends System.Sparkcell {
  constructor() {
    super();

    this.css = `
      .sparkcell-name {
        white-space : nowrap;
      }

      .sparkcell-name-value {
        display       : flex;
        overflow      : hidden;
        text-overflow : ellipsis;
      }
    `;

    this.template = `
      <div class="sparkcell-name">
        <div class="sparkcell-name-value">
          {{ value }}
        </div>
      </div>`;
  }
}