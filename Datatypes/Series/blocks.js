// @id mFpBtklCLqbkTealU0qv8e
class DatatypeSeries extends System.Datatype {
  constructor() {
    super();

    this.id = 'series';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}