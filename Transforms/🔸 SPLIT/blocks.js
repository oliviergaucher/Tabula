// @id KWqv8aD8anf95VNUOcGh3S
// @title Overview
getTransformOverview('SPLIT')

// @id jsnER8HNXD2F70hPyqwdsK
// @title SPLIT Class
__SPLIT = class extends Transform {
  getParams() {
    return splitParams;
  }

  async getData() {
    return splitData(this.spec, this.meta);
  }

  async getMeta() {
    return splitMeta(this.spec, this.meta);
  }
}

// @id vUj07WCs5SAO25ZV87X1Pc
// @title SPLIT Params
splitParams = [
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
    id: 'splits',
    control: 'ColumnCreator',
    options: {
      config: true,
      multiple: true,
    },
    required: true,
  },
  {
    id: 'mode',
    name: 'Mode',
    label: 'Splitting mode',
    hint: 'Mode by which to split values',
    icon: 'mdi-form-dropdown',
    control: 'Selector',
    options: [
      { id: 'separator', name: 'On separator' },
      { id: 'pattern', name: 'On pattern' },
      { id: 'delimiters', name: 'At delimiters' },
      { id: 'positions', name: 'At positions' },
      { id: 'intervals', name: 'At character intervals' },
    ],
    default: 'separator',
  },
  {
    id: 'separator',
    name: 'Separator',
    label: 'Separator',
    hint: 'String literal or pattern that identifies the separator to match',
    control: 'StringInput',
    required: true,
    condition: 'mode === "separator"',
  },
  {
    id: 'pattern',
    name: 'Pattern',
    label: 'Pattern',
    hint: 'String literal or pattern that identifies the pattern to match',
    control: 'StringInput',
    required: true,
    condition: 'mode === "pattern"',
  },
  {
    id: 'delimiters',
    name: 'Delimiters',
    label: 'Delimiters',
    hint: 'String literal or pattern that identifies the delimiter to match',
    control: 'StringInput',
    multiple: true,
    required: true,
    condition: 'mode === "delimiters"',
  },
  {
    id: 'positions',
    name: 'Positions',
    label: 'Positions',
    hint: 'Integer defining a character index',
    control: 'IntegerInput',
    multiple: true,
    required: true,
    condition: 'mode === "positions"',
  },
  {
    id: 'interval',
    name: 'Interval',
    label: 'Interval',
    hint: 'Integer defining an interval length in characters',
    control: 'IntegerInput',
    required: true,
    condition: 'mode === "intervals"',
  },
];

// @id mkqQc8xfza5jPNSqgBCStw
// @title SPLIT Data
splitData = function (spec, meta) {
  return [];
}

// @id moEIG5FKK3stV3uqzNL3Mg
// @title SPLIT Meta
splitMeta = function (spec, meta) {
  return meta;
}