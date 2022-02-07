// @id osAOL2EuweenCMPAxKHEfF
class DatatypeText extends System.Datatype {
  constructor() {
    super();

    this.id = 'text';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}