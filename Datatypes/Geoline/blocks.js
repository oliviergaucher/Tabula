// @id RVTA5xzqRNWDbYStyNoZCt
class DatatypeGeoline extends System.Datatype {
  constructor() {
    super();

    this.id = 'geoline';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}