// @id Q7Sa5Dy04zerdZpuEjeEvd
class DatatypeGeopolygon extends System.Datatype {
  constructor() {
    super();

    this.id = 'geopolygon';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}