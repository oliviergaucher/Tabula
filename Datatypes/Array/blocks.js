// @id cFJEoU5RsmPCgxrdYJtlgo
class DatatypeArray extends System.Datatype {
  constructor() {
    super();

    this.id = 'array';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}