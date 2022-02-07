// @id K0RO4U8Ifskn53Iv8ALbV1
// @title Overview
getTransformOverview('UPDATE')

// @id rfiaq376HFBfMT3rfk1KFb
// @title UPDATE Class
__UPDATE = class extends Transform {
  getParams() {
    return updateParams;
  }

  async getData() {
    return updateData(this.spec, this.meta);
  }

  async getMeta() {
    return updateMeta(this.spec, this.meta);
  }
}

// @id oZLVgBK2QYjojBDhMHSjrR
// @title UPDATE Params
updateParams = [
  {
    id: 'row',
    label: 'Updated row',
    hint: 'Template defining the updates made to rows',
    control: 'RowEditor',
    required: true,
  },
];

// @id mIR89nJyi8kZhvDMnlRZJD
// @title UPDATE Data
updateData = function (spec, meta) {
  return [];
}

// @id tvjytlSmRQdPM7pzYwne0h
// @title UPDATE Meta
updateMeta = function (spec, meta) {
  return meta;
}