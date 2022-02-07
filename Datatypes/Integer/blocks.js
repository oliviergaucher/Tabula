// @id lVIKLi11EWoFPmgQ4NEKis
class DatatypeInteger extends System.Datatype {
  constructor() {
    super();

    this.id = 'integer';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}