// @id yEJGX9ovRGpz48D1CQC5ER
class DatatypeCategory extends System.Datatype {
  constructor() {
    super();

    this.id = 'category';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}