// @id lDJYQh0MWN07VHgAwgaV8J
class DatatypeRelation extends System.Datatype {
  constructor() {
    super();

    this.id = 'relation';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}