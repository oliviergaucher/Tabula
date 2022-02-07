// @id e2nbiOz7B8LdIJOs8t4WDa
// @title Overview
getTransformOverview('FILTER')

// @id hSzzNO06Vn6X3lLlxKOSCD
// @title FILTER Class
__FILTER = class extends Transform {
  getParams() {
    return filterParams;
  }

  async getData() {
    return filterData(this.spec);
  }

  async getMeta() {
    return filterMeta(this.spec, this.meta);
  }
}

// @id yrU2uvNSsV0MseZarws5bz
// @title FILTER Params
filterParams = [
  {
    id: 'mode',
    name: 'Mode',
    label: 'Filtering mode',
    hint: 'Mode by which to filter rows',
    icon: 'mdi-form-dropdown',
    control: 'Selector',
    options: {
      items: [
        { id: 'in', name: 'Filter rows in' },
        { id: 'out', name: 'Filter rows out' },
      ],
    },
    default: 'in',
  }
];

// @id yo86Bs50oTgMDByGcmxJMx
// @title FILTER Data
filterData = function (spec) {
  return [];
}

// @id L9dTDizXa3FCWJM8NiqUSW
// @title FILTER Meta
filterMeta = function (spec, meta) {
  return meta;
}