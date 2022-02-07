// @id OGAF6Soq0vh1b5sKPlyP18
class DatatypePercent extends System.Datatype {
  constructor() {
    super();

    this.id = 'percent';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}