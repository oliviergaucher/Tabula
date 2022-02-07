// @id njGDj3uNMHNhrM6hxxcZL7
class DatatypeQuantile extends System.Datatype {
  constructor() {
    super();

    this.id = 'quantile';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}