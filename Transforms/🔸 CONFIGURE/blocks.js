// @id M7J4C0ttd7nIyQwhh4VY3C
// @title Overview
getTransformOverview('CONFIGURE')

// @id QyMhtO3CIcRRn0JkhabIVs
// @title CONFIGURE Class
__CONFIGURE = class extends Transform {
  getParams() {
    return configureParams;
  }

  async getData() {
    return configureData(this.spec, this.meta);
  }

  async getMeta() {
    return configureMeta(this.spec, this.meta);
  }
}

// @id CgGutEQ1ksjO1EIdkq9mz7
// @title CONFIGURE Params
configureParams = [
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
];

// @id fovjqMQzWGTEkmeWwrExbP
// @title CONFIGURE Data
configureData = function (spec, meta) {
  return [];
}

// @id LWMnPkLSc7zIzEJZxhCBtl
// @title CONFIGURE Meta
configureMeta = function (spec, meta) {
  return meta;
}