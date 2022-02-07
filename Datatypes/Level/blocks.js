// @id bNGDPsRhU9lGTp2ak6TYV5
class DatatypeLevel extends System.Datatype {
  constructor() {
    super();

    this.id = 'level';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}