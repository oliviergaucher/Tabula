// @id BZAI6IQUJxNQf4O4dCKRCw
class DatatypeReference extends System.Datatype {
  constructor() {
    super();

    this.id = 'reference';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}