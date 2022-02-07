// @id JKXSbZ1kOb7lfI1SKh7JxJ
// @title Overview
getTransformOverview('GROUPBY')

// @id ZVjYtLrqLaN0sRGILkfF59
// @title GROUPBY Class
__GROUPBY = class extends Transform {
  getParams() {
    return groupbyParams;
  }

  async getData() {
    return groupbyData(this.spec, this.meta);
  }

  async getMeta() {
    return groupbyMeta(this.spec, this.meta);
  }
}

// @id SyLf0wEY3art9KvkBRxUEH
// @title GROUPBY Params
groupbyParams = [
  {
    id: 'dimensions',
    hint: 'Dimension columns to group by',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      config: true,
      multiple: true,
    },
  },
  {
    id: 'measures',
    hint: 'Measure columns to aggregate',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      config: true,
      multiple: true,
    },
  },
  {
    id: 'sortings',
    hint: 'Columns to compute sorted aggregations by',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      multiple: true,
    },
  },
];

// @id jk6jCdld94Qk7s6v8McyXn
// @title GROUPBY Data
groupbyData = function (spec, meta) {
  try {
    const selection = spec.dimensions.list
      .map(dimension => '"' + dimension + '"')
      .concat(spec.measures.list.map(
        measure => `${measure.aggregation}(${measure.column || '*'}) AS "${measure.name}"`)
      )
      .join(", ");
    const grouping = spec.dimensions.list.map(dimension => '"' + dimension + '"').join(", ");

    return [`SELECT ${selection} FROM ${meta.id} GROUP BY (${grouping});`];
  } catch (error) {
    console.log('Error in groupbyData() function: ' + error);
  }
}

// @id N6l3FiAH1zrNR0r4RdRzAF
// @title GROUPBY Meta
groupbyMeta = function (spec, meta) {
  try {
    return meta;
  } catch (error) {
    console.log('Error in groupbyMeta() function: ' + error);
  }
}

// @id wK2aUr0g57yWBzl0BuHCzR
// @title GROUPBY Test
groupbyTest = await cook([
  {
    transform: 'ADD',
    spec: {
      id: 'DB6d',
      name: 'Countries for GROUPBY',
      description: 'Table used to test the GROUPBY transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Countries.csv'],
      }
    }
  },
  {
    transform: 'GROUPBY',
    spec: {
      dimensions: { list: ['Continent'] },
      measures: { list: [{ column: null, aggregation: 'COUNT', name: 'Count' }] },
    }
  }
], true);