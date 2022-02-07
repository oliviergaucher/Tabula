// @id dyQrNwGaJOfun7NunTW9Zi
class DatatypeWord extends System.Datatype {
  constructor() {
    super();

    this.id = 'word';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}