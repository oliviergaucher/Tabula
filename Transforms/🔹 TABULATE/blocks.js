// @id iv2rCxzNLPvuLEqDh81Vth
// @title Overview
await getTransformOverview('TABULATE')

// @id v8jS2sFbSPYajTUV5e64Wd
// @title TABULATE Class
__TABULATE = class extends Transform {
  getParams() {
    return tabulateParams;
  }

  async getData() {
    return tabulateData(this.spec);
  }

  async getMeta() {
    return tabulateMeta(this.spec);
  }
}

// @id Gje7Czjps8ntNaDlu48wmw
// @title TABULATE Params
tabulateParams = [
  {
    id: 'meta',
    name: 'Meta',
    label: 'Metadata',
    hint: 'Metadata of the new table',
    icon: 'mdi-sitemap-outline',
    control: 'JsonEditor',
  },
  {
    id: 'data',
    name: 'Data',
    label: 'Data',
    hint: 'Data of the new table',
    icon: 'mdi-database',
    control: 'JsonEditor',
  }
];

// @id qSeOTFeUTMn40NNcY2szCG
// @title TABULATE Data
tabulateData = function (spec) {
  try {
    function _mapRecord(columns, record) {
      return columns.map(column => `${JSON.stringify(record[column.id]).replaceAll('"', "'")}`).join(', ');
    }

    const columns = spec.meta.columns;
    const columnsNames = columns.map(column => `"${column.name}"`).join(', ');
    const values = spec.data.map(record => `(${_mapRecord(columns, record)})`)
    const select = `SELECT * FROM (VALUES ${values.join(', ')}) "${spec.meta.id}"(${columnsNames})`;

    return [
      `DROP TABLE IF EXISTS "${spec.meta.id}";`,
      `CREATE TABLE "${spec.meta.id}" AS ${select};`
    ];
  } catch (error) {
    console.log('Error in tabulateData() function: ' + error);
  }
}

// @id WwGqjnl7V0kpYA5FF32Vf5
// @title TABULATE Meta
tabulateMeta = function (spec) {
  try {
    const meta = {
      id: spec.meta.id,
      name: spec.meta.name,
      columns: spec.meta.columns,
      description: spec.meta.description,
      options: null,
      stats: null,
    };

    DATABASE.registerTable(meta);

    return meta;
  } catch (error) {
    console.log('Error in tabulateMeta() function: ' + error);
  }
}

// @id FqEVWfiGexvnoy6zLthOSI
// @title TABULATE Test
cook([
  {
    transform: 'TABULATE',
    spec: {
      meta: {
        id: 'Xp7R',
        name: 'Countries for TABULATE',
        description: 'Table used to test the TABULATE transform.',
        columns: [
          { id: 'name', name: 'Name', datatype: 'name' },
          { id: 'area', name: 'Area', datatype: 'integer' },
        ]
      },
      data: [
        { name: 'France', area: 357168 },
        { name: 'Germany', area: 377972 },
        { name: 'Japan', area: 643801 },
      ]
    }
  }
])