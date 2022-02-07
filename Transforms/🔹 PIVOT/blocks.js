// @id bIRm51eQZXKQLqpWik3LY8
// @title Overview
getTransformOverview('PIVOT')

// @id dILewDID7AZWIJ0cMbwg6n
// @title PIVOT Class
__PIVOT = class extends Transform {
  getParams() {
    return pivotParams;
  }

  async getData() {
    return pivotData(this.spec, this.meta, this.keys);
  }

  async getMeta() {
    return pivotMeta(this.spec, this.meta, this.keys);
  }

  async prepare() {
    const { key } = this.spec;
    const prepare = await SQL(`SELECT DISTINCT "${key}" FROM "${this.meta.id}";`).data[0];
    this.keys = [];
    prepare.forEach((key, index) => { this.keys[index] = key }); // Used for typecasting.
  }
}

// @id uO2IYfNUquj1dz0oRRVMgb
// @title PIVOT Params
pivotParams = [
  {
    id: 'key',
    name: 'Key',
    label: 'Key column',
    hint: 'Key column to pivot',
    icon: 'mdi-key',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
    },
    required: true,
  },
  {
    id: 'value',
    name: 'Value',
    label: 'Value column',
    hint: 'Value column to pivot',
    icon: 'mdi-alpha-v-box-outline',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
    },
    required: true,
  },
  {
    id: 'direction',
    control: 'DirectionToggle',
    default: 'ascending',
  },
  {
    id: 'aggregation',
    control: 'AggregationSelector',
  },
];

// @id PAspV6SxkvJqhkJYy5fIN2
// @title PIVOT Data
pivotData = async function (spec, meta, keys) {
  try {
    const columns = meta.columns.filter(column => ![spec.key, spec.value].includes(column.name))

    return [`
    WITH _Left
    AS (
      SELECT DISTINCT ${selectColumns(columns)} FROM "${meta.id}"
    )
    SELECT ${selectColumns(columns, '_Left')}, 
           ${keys.map(key => '"_Right' + key + '"."' + spec.value + '" AS "' + key + '"').join(', ')}
    FROM _Left
    ${keys.map(key =>
      'INNER JOIN "' + meta.id + '" AS "_Right' + key + '" ' +
      'ON ("_Left"."' + columns[0].name + '" = "_Right' + key + '"."' + columns[0].name + '" AND ' +
      '"_Right' + key + '"."' + spec.key + '" = ' + key + ')'
    ).join(' ')};
  `];
  } catch (error) {
    console.log('Error in pivotData() function: ' + error);
  }
}

// @id TJQNss95ZHakSSJzILLxxr
// @title PIVOT Meta
pivotMeta = function (spec, meta, keys) {
  try {
    const datatype = getColumnByName(meta, spec.value).datatype;

    meta.columns = keys.map(key => ({ name: key, datatype }));

    return meta;
  } catch (error) {
    console.log('Error in pivotMeta() function: ' + error);
  }
}

// @id pHG9otOUQONqvQHn6l3sBr
// @title PIVOT Test
cook([
  {
    transform: 'ADD',
    spec: {
      id: 'TQvH',
      name: 'Demographics for PIVOT',
      description: 'Table used to test the PIVOT transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Demographics.csv'],
      }
    }
  },
  {
    transform: 'PIVOT',
    spec: {
      key: 'Year',
      value: 'Population',
    }
  }
], true);