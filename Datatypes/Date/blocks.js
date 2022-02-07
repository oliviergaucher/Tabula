// @id AG6PsDFo0OmTXMBDjs07mx
class DatatypeDate extends System.Datatype {
  constructor() {
    super();

    this.id = 'date';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}