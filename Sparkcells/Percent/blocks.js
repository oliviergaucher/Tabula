// @id WdlbMq2urHRBrLMCKipHly
function SparkcellPercentOld(variable) {
  return `
    <div>
      {{ (${variable} * 100) + '%' }}
    </div>`;
}

// @id L8ZQaRI0zhQCnA83gTT5ur
class SparkcellPercent extends System.Sparkcell {
  // constructor(variable) {
  //   super();
  //   this.variable = variable;
  // }

  render(variable) {
    return `
      <div>
        {{ (${variable} * 100) + '%' }}
      </div>`;
  }
}