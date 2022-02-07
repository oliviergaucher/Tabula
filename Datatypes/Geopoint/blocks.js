// @id ipidUAqCw2naXLNGa32pks
class DatatypeGeopoint extends System.Datatype {
  constructor() {
    super();

    this.id = 'geopoint';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}