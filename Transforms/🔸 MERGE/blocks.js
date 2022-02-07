// @id EtIOxUZVgzafulD8YwgjOm
// @title Overview
getTransformOverview('MERGE')

// @id vUqet3zSjAeYC2BRwHsZpM
// @title MERGE Class
__MERGE = class extends Transform {
  getParams() {
    return mergeParams;
  }

  async getData() {
    return mergeData(this.spec, this.meta);
  }

  async getMeta() {
    return mergeMeta(this.spec, this.meta);
  }
}

// @id FnKYCvMGxPPmk5HoFjWXea
// @title MERGE Params
mergeParams = [
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
    id: 'merge',
    control: 'ColumnCreator',
    required: true,
  },
  {
    id: 'separator',
    control: 'StringInput',
  },
];

// @id cVnAFVLykACnR2fWVBOobq
// @title MERGE Data
mergeData = function (spec, meta) {
  return [];
}

// @id Fiesyaao4o5vGM3JV2RL7v
// @title MERGE Meta
mergeMeta = function (spec, meta) {
  return meta;
}