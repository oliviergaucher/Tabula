// @id qFjXnKLdSopvLcv0K1IkzU
class DatatypeMeridian extends System.Datatype {
  constructor() {
    super();

    this.id = 'meridian';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}