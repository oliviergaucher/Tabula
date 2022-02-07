// @id lNafzNt3ecgjKSvrKtt8Cs
class DatatypeSector extends System.Datatype {
  constructor() {
    super();

    this.id = 'sector';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}