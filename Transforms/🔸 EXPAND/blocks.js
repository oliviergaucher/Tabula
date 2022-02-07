// @id TU2Mv9ylRlrcYN2lgHeDvc
// @title Overview
getTransformOverview('EXPAND')

// @id FcUdEhH4RFZPAKc3L6GJDj
// @title EXPAND Class
__EXPAND = class extends Transform {
  getParams() {
    return expandParams;
  }

  async getData() {
    return expandData(this.spec);
  }

  async getMeta() {
    return expandMeta(this.spec, this.meta);
  }
}

// @id oJYQ0H1B9fjPYthpC8bmHM
// @title EXPAND Params
expandParams = [
  {
    id: 'columns',
    control: 'ColumnPicker',
    options: { // TODO: Add condition to restrict columns to arrays
      mode: 'compact',
      config: true,
      uniform: true,
      multiple: true,
    },
  },
  {
    id: 'period_column_name',
    name: 'Period column name',
    label: 'Period column name',
    hint: 'Name of the expanded period column',
    icon: 'mdi-calendar',
    control: 'ColumnNameInput',
    condition: 'column.datatype === "period_series"',
  },
];

// @id L16PKvYdipES5MfKfHUnwo
// @title EXPAND Data
expandData = function (spec) {
  return [];
}

// @id SxKAXVcQsUeNcUYSjtpugs
// @title EXPAND Meta
expandMeta = function (spec, meta) {
  return meta;
}