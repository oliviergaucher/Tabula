// @id UaLBIb4aMRBUWoyEsG9VBa
class DatatypeIncrement extends System.Datatype {
  constructor() {
    super();

    this.id = 'increment';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}