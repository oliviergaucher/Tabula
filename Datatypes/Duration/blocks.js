// @id Ifr1Dy5Q9SWG7Y7ad40W6g
class DatatypeDuration extends System.Datatype {
  constructor() {
    super();

    this.id = 'duration';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}