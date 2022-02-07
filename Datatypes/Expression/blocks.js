// @id QqA9OBPdNNFJEOo4EtzbeS
class DatatypeExpression extends System.Datatype {
  constructor() {
    super();

    this.id = 'expression';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}