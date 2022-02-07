// @id B7G2K4a2wRtmuSZ3ut6CdF
class DatatypeNumber extends System.Datatype {
  constructor() {
    super();

    this.id = 'number';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}