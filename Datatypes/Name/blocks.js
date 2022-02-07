// @id HMIPGGQC11Z9me90pZApzb
class DatatypeName extends System.Datatype {
  constructor() {
    super();

    this.id = 'name';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}