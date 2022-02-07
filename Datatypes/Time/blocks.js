// @id O0gKwLFMuN2KcaBqW9Y5uq
class DatatypeTime extends System.Datatype {
  constructor() {
    super();

    this.id = 'time';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}