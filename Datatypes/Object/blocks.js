// @id o4AlXR4XugzYnldTZgoOSD
class DatatypeObject extends System.Datatype {
  constructor() {
    super();

    this.id = 'object';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}