// @id wVhFg2hve9Mn13MfsWemBD
class DatatypeAngle extends System.Datatype {
  constructor() {
    super();

    this.id = 'angle';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}