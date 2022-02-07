// @id Rm62LXPduEX4P2s1cfvIBz
class DatatypePeriod extends System.Datatype {
  constructor() {
    super();

    this.id = 'period';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}