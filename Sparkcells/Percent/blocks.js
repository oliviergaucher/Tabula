// @id WdlbMq2urHRBrLMCKipHly
class SparkcellPercent extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <div
        :title = "percentile + ' Percentile'"
        style  = "
          align-items     : stretch;
          display         : flex;
          justify-content : center;
          position        : relative;
          width           : 100%;
        ">
        <div style="
          align-items    : center;
          display        : flex;
          flex-direction : row;
          flex-grow      : 1;
          flex-wrap      : nowrap;
        ">
          <span :style="''
            + 'align-items      : center;'
            + 'border-right     : 1px solid #6a9e58;'
            + 'height           : 100%;'
            + 'min-width        : 1px;'
            + 'position         : absolute;'
            + 'width            : ' + percentile + '%;'
            + 'z-index          : 2;'
          ">
            &nbsp;
          </span>
          <div :style="''
            + 'align-items      : center;'
            + 'background-color : #e0ebdd;'
            + 'flex-basis       : ' + 100 * value / this.column.stats.max.value[0] + '%;'
            + 'height           : 100%;'
            + 'min-width        : 1px;'
            + 'width            : 100%;'
            + 'z-index          : 1;'
          ">
            &nbsp;
          </div>
          <div style="
            align-self    : center;
            position      : absolute;
            right         : 0;
            text-align    : right;
            z-index       : 3;
          ">
            {{ percent }}%
          </div>
        </div>
      </div>`;

    this.computed = {
      percent() {
        return (new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(100 * this.value));
      },
      percentile() {
        const result = this.column.stats.percentile_cont.value[0].findIndex(p => this.value < p);
        return result === -1 ? 100 : result;
      },
    };
  }
}