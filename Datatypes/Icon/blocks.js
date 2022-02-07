// @id BxjKqhPOK7UVNjQ8o1AOkH
class DatatypeIcon extends System.Datatype {
  constructor() {
    super();

    this.id = 'icon';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}