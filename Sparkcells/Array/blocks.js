// @id WbkzrMEBtzOd9iU6Ewt6aw
function SparkcellArrayOld(variable) {
  return `
    <div>
      [ {{ ${variable}.slice(0, 3).join(', ') }}, ... ]
    </div>`;
}

// @id Mm6usIdKjSgCsJc6FQ78DZ
class SparkcellArray extends System.Sparkcell {
  // constructor(variable) {
  //   super();
  //   this.variable = variable;
  // }

  render(variable) {
    return `
      <div>
        [ {{ ${variable}.slice(0, 3).join(', ') }}, ... ]
      </div>`;
  }
}