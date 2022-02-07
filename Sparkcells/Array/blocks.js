// @id WbkzrMEBtzOd9iU6Ewt6aw
class SparkcellArray extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <span> {{ text }} </span>`;

    this.computed = {
      text() {
        const firstValues = this.value.slice(0, 3).join(', ');
        return `[ ${firstValues}, ... ]`;
      }
    };
  }
}