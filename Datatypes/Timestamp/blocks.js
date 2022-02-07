// @id FspUSP5EHr6DmVfSWHBESv
class DatatypeTimestamp extends System.Datatype {
  constructor() {
    super();

    this.id = 'timestamp';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}