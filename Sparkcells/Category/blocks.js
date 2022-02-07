// @id wroFpX4Qbjt65r76hrPYNC
function SparkcellCategoryOld(variable, column) {
  if (!column.options) {
    return `
      <div>
        {{ ${variable} }}
      </div>`;
  }

  if (column.options.items.length > 10) {
    return '';
  }

  const colors = '{'
    + column.options.items.map(item => `'${item.name}': '${item.color}'`).join(', ')
    + '}';

  return `
    <div>
      <v-icon small :color = "${colors}[${variable}]">
        mdi-square-rounded
      </v-icon>
      {{ ${variable} }}
    </div>`;
}

// @id UhSloRnNdNCPsLJTmk1Ayo
class SparkcellCategory extends System.Sparkcell {
  // constructor(variable, column) {
  //   super();
  //   this.variable = variable;
  //   this.column = column
  // }

  render(variable, column) {
    if (!column.options) {
      return `
        <div>
          {{ ${variable} }}
        </div>`;
    }

    const colors = '{'
      + column.options.items.map(item => `'${item.name}': '${item.color}'`).join(', ')
      + '}';

    return `
      <div>
        <v-icon small :color = "${colors}[${variable}]">
          mdi-square-rounded
        </v-icon>
        {{ ${variable} }}
      </div>`;
  }
}