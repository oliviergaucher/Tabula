// @id oczsmWNO5JPsgUxDbj2Ow5
class DatatypeSequence extends System.Datatype {
  constructor() {
    super();

    this.id = 'sequence';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}