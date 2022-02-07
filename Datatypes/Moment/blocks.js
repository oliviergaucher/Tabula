// @id awn44rjI7EAaGD7kMaeggF
class DatatypeMoment extends System.Datatype {
  constructor() {
    super();

    this.id = 'moment';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}