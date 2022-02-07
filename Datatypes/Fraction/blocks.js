// @id mQW6tno2DSqhVWtTixGy31
class DatatypeFraction extends System.Datatype {
  constructor() {
    super();

    this.id = 'fraction';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}