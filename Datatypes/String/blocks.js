// @id zKLauBTjIPTJRAjlv60Vj9
class DatatypeString extends System.Datatype {
  constructor() {
    super();

    this.id = 'string';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}