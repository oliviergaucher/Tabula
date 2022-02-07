// @id xCew2nEKRXlKU8WttckWC1
function SparkcellNameOld(variable) {
  return `
    <div style="white-space: nowrap;">
      <span style="display: inline-block; overflow: hidden; text-overflow: ellipsis;">
        {{ ${variable} }}
      </span>
    </div>`;
}

// @id GEgV3GlzvKco8S6sSrzqXo
class SparkcellName extends System.Sparkcell {
  // constructor(variable) {
  //   super();
  //   this.variable = variable;
  // }

  render(variable) {
    return `
    <div style="white-space: nowrap;">
      <span style="display: inline-block; overflow: hidden; text-overflow: ellipsis;">
        {{ ${variable} }}
      </span>
    </div>`;
  }
}