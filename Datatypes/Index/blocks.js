// @id fzGN7mgCsdqyEtcxGfrg6f
class DatatypeIndex extends System.Datatype {
  constructor() {
    super();

    this.id = 'index';
  }

  async getMeta() {
    return await DATATYPES[this.id];
  }
}