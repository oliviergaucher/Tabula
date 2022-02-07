// @id HMljpSR1JK9xsYqC6vplwX
class DatatypeGeofeature extends System.Datatype {
  constructor() {
    super();

    this.id = 'geofeature';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}