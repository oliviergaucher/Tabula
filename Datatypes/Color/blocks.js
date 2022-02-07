// @id oG6w6y3UQr5URJ8S9BTI94
class DatatypeColor extends System.Datatype {
  constructor() {
    super();

    this.id = 'color';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}