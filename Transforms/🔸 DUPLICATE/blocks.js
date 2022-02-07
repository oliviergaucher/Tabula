// @id ErVcQtT1LXUQPpGF94KexX
// @title Overview
getTransformOverview('DUPLICATE')

// @id UcFQfIFfbJ7NCRtXovRxKM
// @title DUPLICATE Class
__DUPLICATE = class extends Transform {
  getParams() {
    return duplicateParams;
  }

  async getData() {
    return duplicateData();
  }

  async getMeta() {
    return duplicateMeta(this.spec, this.meta);
  }
}

// @id O2phO2vAliiti9IqQa1hEB
// @title DUPLICATE Params
duplicateParams = [
  {
    id: 'count',
    name: 'Count',
    label: 'Number of duplicates to insert',
    hint: 'Number of duplicates to insert per duplicated row, excluding the original rows.',
    icon: 'mdi-counter',
    control: 'IntegerInput',
    default: 1,
  },
];

// @id AaHmsflhtY7fFQyZPJoshM
// @title DUPLICATE Data
duplicateData = function () {
  return [];
}

// @id HG58mrEXIG7gGEM78Cfjl4
// @title DUPLICATE Meta
duplicateMeta = function (spec, meta) {
  return meta;
}