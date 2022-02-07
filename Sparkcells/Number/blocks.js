// @id KEghar4VatXZB1wvMped5d
class SparkcellNumber extends System.Sparkcell {
  constructor() {
    super();

    this.template = `
      <div
        :title = "percentSum + '% of Sum · ' + percentMax + '% of Max · ' + percentile + ' Percentile'"
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
            {{ new Intl.NumberFormat('en-US').format(value) }}
          </div>
        </div>
      </div>`;

    this.computed = {
      percentile() {
        const result = this.column.stats.percentile_cont.value[0].findIndex(p => this.value < p);
        return result === -1 ? 100 : result;
      },
      percentMax() {
        return (new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 })
          .format(100 * this.value / this.column.stats.max.value[0]));
      },
      percentSum() {
        return (new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 })
          .format(100 * this.value / this.column.stats.fsum.value[0]));
      },
    };
  }
}