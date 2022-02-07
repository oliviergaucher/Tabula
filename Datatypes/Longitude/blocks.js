// @id rhzBksl7tRPdOCYxPS5zJ8
class DatatypeLongitude extends System.Datatype {
  constructor() {
    super();

    this.id = 'longitude';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}