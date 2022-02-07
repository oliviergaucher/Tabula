// @id xCtp8Tsq9DJtKb7vDIkd0n
class DatatypeBoolean extends System.Datatype {
  constructor() {
    super();

    this.id = 'boolean';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}