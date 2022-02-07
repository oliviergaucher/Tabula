// @id LeWehs2rK4QI9q3KT7SPaZ
class SparkcellObject extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <div>
        {{ JSON.stringify(value) }}
      </div>`;
  }
}