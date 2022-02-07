// @id bYGtDZevIfYMK9Mmy1Y2yy
class DatatypeURL extends System.Datatype {
  constructor() {
    super();

    this.id = 'url';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}