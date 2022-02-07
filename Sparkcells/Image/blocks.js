// @id j6tIKXOvXIG0XVVTUJnkP0
function SparkcellImageOld(variable, column) {
  return `
    <div style="height: 33px; display: flex;">
      <img
        :src  = "${variable}"
        alt   = "${column.id}"
        style = "height: 21px; margin: auto 0;">
      </img>
    </div>`;
}

// @id MmsVWlM9STnzTRH00o8PpN
class SparkcellImage extends System.Sparkcell {
  // constructor(variable, column) {
  //   super();
  //   this.variable = variable;
  //   this.column = column;
  // }

  render(variable, column) {
    return `
    <div style="height: 33px; display: flex;">
      <img
        :src  = "${variable}"
        alt   = "${column.id}"
        style = "height: 21px; margin: auto 0;">
      </img>
    </div>`;
  }
}