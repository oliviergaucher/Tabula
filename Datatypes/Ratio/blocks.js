// @id S85d0RKkmQuSVQX5b4BThL
class DatatypeRatio extends System.Datatype {
  constructor() {
    super();

    this.id = 'ratio';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}