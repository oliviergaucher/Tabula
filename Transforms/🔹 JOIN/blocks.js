// @id syvTD5APp6dmB3BNBGC1Mu
// @title Overview
getTransformOverview('JOIN')

// @id QAmPIFPyRG6ZmiVbwdUQID
// @title JOIN Class
__JOIN = class extends Transform {
  getParams() {
    return joinParams;
  }

  async getData() {
    return joinData(this.spec, this.meta);
  }

  async getMeta() {
    return joinMeta(this.spec, this.meta);
  }
}

// @id YzA4h73h6xFmoXJWf3nGIr
// @title JOIN Params
joinParams = [
  {
    id: 'foreign_table',
    name: 'Foreign table',
    label: 'Foreign table',
    hint: 'Foreign table to join columns from',
    icon: 'mdi-table',
    control: 'TablePicker',
    required: true,
  },
  {
    id: 'keys',
    name: 'Keys',
    label: 'Keys',
    hint: 'Keys used to match rows of the foreign table',
    icon: 'mdi-table-key',
    control: 'KeysPicker',
    multiple: true,
    required: true,
  },
  {
    id: 'columns',
    name: 'Columns',
    label: 'Joined columns',
    hint: 'Columns of the foreign table to join',
    icon: 'mdi-table-column-width',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      config: true,
      multiple: true,
      table: 'foreign_table',
    },
  },
];

// @id DB6iBw2gJRfuxbrkZqbrzu
// @title JOIN Data
joinData = function (spec, meta) {
  try {
    return spec.columns.list
      .map(column => `
        ALTER TABLE ${meta.id}
        ADD "${column.new_name}" ${DATATYPES[column.datatype].primitive};`)
      .concat(spec.columns.list.map(column => `
        UPDATE ${meta.id} 
        SET "${column.new_name}" = _Foreign.${column.name} 
        FROM ${meta.id} AS _Master
        INNER JOIN ${spec.foreign_table} AS _Foreign
        ON _Master."${spec.primary_key}" = _Foreign."${spec.foreign_key}";`));
  } catch (error) {
    console.log('Error in joinData() function: ' + error);
  }
}

// @id dIQWZ2AQ0LgOwKXmucDDFX
// @title JOIN Meta
joinMeta = function (spec, meta) {
  try {
    meta.columns.splice(
      meta.columns.findIndex(column => column.name === spec.primary_key) + 1,
      0,
      ...spec.columns.list.map(column => {
        return {
          'name': column.new_name,
          'datatype': column.datatype,
        }
      }));

    return meta;
  } catch (error) {
    console.log('Error in joinMeta() function: ' + error);
  }
}

// @id LItixbMQ5cMY9J5Y1KgUwc
// @title JOIN Test
cook([
  {
    transform: 'ADD',
    spec: {
      id: 'FkFY',
      name: 'Currencies for JOIN',
      description: 'Foreign table used to test the JOIN transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Currencies.csv'],
      }
    }
  },
  {
    transform: 'ADD',
    spec: {
      id: 'Siv5',
      name: 'Countries for JOIN',
      description: 'Primary table used to test the JOIN transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Countries.csv'],
      }
    }
  },
  {
    transform: 'JOIN',
    spec: {
      foreign_table: 'FkFY',
      primary_key: 'Currency',
      foreign_key: 'ISO Code',
      columns: {
        list: [
          { name: 'Name', new_name: 'Currency Name', datatype: 'name' },
          { name: 'Sign', new_name: 'Currency Sign', datatype: 'identifier' },
        ]
      }
    }
  }
]);