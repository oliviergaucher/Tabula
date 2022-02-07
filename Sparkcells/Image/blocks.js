// @id j6tIKXOvXIG0XVVTUJnkP0
class SparkcellImage extends System.Sparkcell {
  constructor() {
    super();

    this.css = `
      .sparkcell-image {
        display    : flex;
        height     : 100%;
        margin     : auto;
        max-height : 21px !important;
      }`,

    this.template = `
      <img
        class = "sparkcell-image"
        :src  = "value"
        :alt  = "column.id"/>`;
  }
}