// @id fnBASM2oO963AtzL60NJ4q
// @title Overview
getTransformOverview('REPLACE')

// @id erMbUz3alQOj8a3WsHB8h5
// @title REPLACE Class
__REPLACE = class extends Transform {
  getParams() {
    return replaceParams;
  }

  async getData() {
    return replaceData(this.spec, this.meta);
  }

  async getMeta() {
    return replaceMeta(this.spec, this.meta);
  }
}

// @id V9vjbYdI2QUAkmkm855uJg
// @title REPLACE Params
replaceParams = [
  {
    id: 'columns',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      config: true,
      multiple: true,
    },
    required: true,
  },
  {
    id: 'expression',
    name: 'Expression',
    label: 'Expression',
    hint: 'Expression evaluated to compute new values for the column',
    icon: 'mdi-function',
    control: 'ExpressionEditor',
  },
];

// @id A3XuchU3L6UuV8ryObUB7a
// @title REPLACE Data
replaceData = function (spec, tableMeta) {
  return [];
}

// @id Z5NIRSIvjUo5LlOQs501W4
// @title REPLACE Meta
replaceMeta = function (spec, meta) {
  return meta;
}