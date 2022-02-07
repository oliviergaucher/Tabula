// @id NvHt1y0sqNa23VZcqE1tVp
// @title Overview
getTransformOverview('INSERT')

// @id NSloPImMgG0iSXztZgrFha
// @title INSERT Class
__INSERT = class extends Transform {
  getParams() {
    return insertParams;
  }

  async getData() {
    return insertData(this.spec, this.meta);
  }

  async getMeta() {
    return insertMeta(this.spec, this.meta);
  }
}

// @id HDRRSbyUa9gdOF09Je145j
// @title INSERT Params
insertParams = [
  {
    id: 'items',
    name: 'Items',
    label: 'Items',
    hint: 'Items defining the list of rows to insert',
    icon: 'mdi-format-list-bulleted',
    control: 'ListEditor',
  },
  {
    id: 'row',
    label: 'Inserted row',
    hint: 'Template defining the rows to insert',
    control: 'RowEditor',
    multiple: true,
    required: true,
  }
];

// @id WvJTn8XlzbBYJYdwX3VcCg
// @title INSERT Data
insertData = function (spec, meta) {
  try {
    return spec.row.map(row => {
      return `
      INSERT INTO "${meta.id}"
      ${'(' + Object.keys(row).map(column => '"' + column + '"').join(", ") + ')'}
      VALUES
      (${Object.keys(row).map(column => "'" + row[column] + "'").join(", ")})
    ;`});
  } catch (error) {
    console.log('Error in insertData() function: ' + error);
  }
}

// @id UyN6mDOWe0DbuhL3ag4Wsr
// @title INSERT Meta
insertMeta = function (spec, meta) {
  try {
    return meta;
  } catch (error) {
    console.log('Error in insertMeta() function: ' + error);
  }
}

// @id kkjPNBfLGNWs0hz3MqH857
// @title INSERT Test
cook([
  {
    transform: 'ADD',
    spec: {
      id: 'KZjm',
      name: 'Countries for INSERT',
      description: 'Table used to test the INSERT transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Countries.csv'],
      }
    }
  },
  {
    transform: 'INSERT',
    spec: {
      row: [
        {
          'Name': 'East Timor',
          'Alpha-2 Code': 'TL',
          'Alpha-3 Code': 'TLS',
          'Numeric Code': 626,
          'IMF Code': 537,
        }
      ]
    }
  }
]);