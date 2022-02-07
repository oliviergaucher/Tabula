// @id rn6I5OReGga6f8OOpRMpqp
class DatatypeImage extends System.Datatype {
  constructor() {
    super();

    this.id = 'image';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}