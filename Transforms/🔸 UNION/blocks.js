// @id eS13mM7D0Mwrrwo8TqDa7R
// @title Overview
getTransformOverview('UNION')

// @id bGygJi6B1pQ71Hrv9qIp0e
// @title UNION Class
__UNION = class extends Transform {
  getParams() {
    return unionParams;
  }

  async getData() {
    return unionData(this.spec, this.meta);
  }

  async getMeta() {
    return unionMeta(this.spec, this.meta);
  }
}

// @id HUcEiuLbG90c2HQj6CyUsp
// @title UNION Params
unionParams = [
  {
    id: 'foreign_table',
    name: 'Foreign table',
    label: 'Foreign table',
    hint: 'Foreign table to union rows from',
    icon: 'mdi-table',
    control: 'TablePicker',
    required: true,
  },
  {
    id: 'mapping',
    name: 'Mapping',
    label: 'Column mapping',
    hint: 'Mapping of new columns from the foreign table',
    icon: 'mdi-table-arrow-up',
    control: 'SchemaMapper',
    options: { foreign_table: 'foreign_table' },
  },
  {
    id: 'include_unmapped_columns',
    name: 'Include unmapped columns',
    label: 'Include unmapped columns',
    hint: 'Whether to include unmapped columns',
    icon: 'mdi-table-column-plus-after',
    control: 'Toggle',
  },
];

// @id B8rDfG04yULMe49qBkkiY3
// @title UNION Data
unionData = function (spec, meta) {
  return [];
}

// @id r9F0YTRttPsKzsxZDKwcEp
// @title UNION Meta
unionMeta = function (spec, meta) {
  return meta;
}