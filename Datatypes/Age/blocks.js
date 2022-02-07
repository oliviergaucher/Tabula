// @id yPD7pPSSn5GACP3aIhbfY0
class DatatypeAge extends System.Datatype {
  constructor() {
    super();

    this.id = 'age';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}