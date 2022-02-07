// @id IHO2x32X6U4WvFA9XRzrFP
class DatatypeIdentifier extends System.Datatype {
  constructor() {
    super();

    this.id = 'identifier';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}