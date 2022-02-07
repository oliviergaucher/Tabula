// @id M97t5WrzmcEkTxFK0rKtYO
// @title Overview
getTransformOverview('COLLAPSE')

// @id BLf0oY8Sifc1jbHQNrIsGB
// @title Demo Spec
COLLAPSEdemo = {
  columns: { list: [{ name: 'Area' }] },
  dimensions: { list: [{ name: 'Continent' }] },
  sortings: { list: [{ name: 'Name', order: 'DESC' }] },
}

// @id mAqaklKWjnxaZGjhUBu1K0
// @title Demo Table
`Components`.TableRenderer(await collapseCook(collapseTest, 'T4dE', 'demo'))

// @id OyxfH9aI2VPDrDTnTvkwiM
// @title COLLAPSE Class
__COLLAPSE = class extends Transform {
  getParams() {
    return collapseParams;
  }

  async getData() {
    return collapseData(this.spec, this.meta);
  }

  async getMeta() {
    return collapseMeta(this.spec, this.meta);
  }
}

// @id YeyJrbK6JO1wmqAxJDgFhh
// @title COLLAPSE Params
collapseParams = [
  {
    id: 'mode',
    name: 'Mode',
    label: 'Collapsing mode',
    hint: 'Mode by which to collapse columns',
    icon: 'mdi-form-dropdown',
    control: 'Selector',
    options: {
      items: [
        { id: 'array', name: 'Into array' },
        { id: 'period_series', name: 'Into period series' },
      ]
    },
    default: 'array',
  },
  {
    id: 'period',
    name: 'Period',
    label: 'Period column',
    hint: 'Period column collapsed alongside the column',
    icon: 'mdi-calendar',
    control: 'ColumnPicker',
    options: {
      condition: 'column.datatype === "period"',
    },
    condition: 'mode === "period_series"',
  },
  {
    id: 'columns',
    name: 'Columns',
    label: 'Columns to collapse',
    hint: 'Columns to collapse into arrays',
    icon: 'mdi-view-column-outline',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      config: true,
      multiple: true,
    },
    required: true,
  },
  {
    id: 'dimensions',
    name: 'Dimensions',
    label: 'Dimensions',
    hint: 'Columns to perform grouped collapse by',
    icon: 'mdi-cube-scan',
    control: 'DimensionsPicker',
    options: {
      mode: 'compact',
      multiple: true,
    },
  },
  {
    id: 'sortings',
    name: 'Sortings',
    label: 'Sortings',
    hint: 'Columns to perform sorted collapse by',
    icon: 'mdi-sort',
    control: 'SortingsPicker',
    options: {
      mode: 'compact',
      multiple: true,
    },
  },
];

// @id qu5LW2GjmFEtGPa2J8u9aD
// @title COLLAPSE Data
collapseData = function (spec, meta) {
  try {
    const { columns, dimensions, sortings } = spec;
    const selections = dimensions.list.map(({ name }) => '"' + name + '"');
    const orderBy = sortings.list.map(({ name, order }) => `"${name}" ${order || 'ASC'}`).join(', ');
    const arrays = [];

    for (const { name } of columns.list) {
      arrays.push(`LIST("${name}" ORDER BY ${orderBy}) as "${name}"`);
    }

    const selection = selections.concat(arrays).join(', ');
    const grouping = selections.join(', ');

    return [`SELECT ${selection} FROM ${meta.id} ${grouping ? "GROUP BY " + grouping : ''};`];
  } catch (error) {
    console.log('Error in collapseData() function: ' + error);
  }
}

// @id jsLQW0vmpNL1hIynvBj8DJ
// @title COLLAPSE Meta
collapseMeta = function (spec, meta) {
  try {
    const columns = [];

    // Produce meta for dimensions
    spec.dimensions.list.forEach(column => {
      columns.push({
        id: meta.columns.find(col => col.name === column.name).id,
        name: column.name,
        datatype: 'category',
      })
    });

    // Produce meta for measures
    spec.columns.list.forEach(column => {
      columns.push({
        id: meta.columns.find(col => col.name === column.name).id,
        name: column.name,
        datatype: 'array',
      })
    });

    // Produce meta for table
    meta.columns = columns;

    return meta;
  } catch (error) {
    console.log('Error in collapseMeta() function: ' + error);
  }
}

// @id BaYCoJ55F1tUyPg2hByeTs
// @title COLLAPSE Cook
collapseCook = async function (spec, id, purpose) {
  return await cook([
    {
      transform: 'ADD',
      spec: {
        id,
        name: 'Countries for COLLAPSE',
        description: `Table used to ${purpose} the ADD transform.`,
        dataset: {
          type: 'url',
          list: ['https://stoic.com/datasets/Countries.csv'],
        }
      }
    },
    {
      transform: 'COLLAPSE',
      spec: spec,
    }
  ], true);
}

// @id bMXjtavwIeDpzQ86Bzgwv4
// @title COLLAPSE Test
collapseTest = {
  columns: { list: [{ name: 'Area' }] },
  dimensions: { list: [{ name: 'Continent' }] },
  sortings: { list: [{ name: 'Name', order: 'DESC' }] },
}

// @id yj9dTSQP6XjJ6Se5BIGnTz
// @title COLLAPSE Actual
collapseActual = await collapseCook(collapseTest, 'rlpY', 'test');

// @id djjdm8BTHsKaC5aZlQLPJ9
// @title Unit Tests
describe('COLLAPSE', () => {
  it('should create a table of the right size', async () => {
    expect(collapseActual.meta.columns.length).to.equal(2);
    expect(collapseActual.data.length).to.equal(2);
    expect(collapseActual.data[0].length).to.equal(7);
    expect(collapseActual.data[1].length).to.equal(7);
  });

  it('should create a table with the right data', async () => {
    expect(collapseActual.data[0][0]).to.equal('Asia');
    expect(collapseActual.data[1][0].length).to.equal(54);
    expect(collapseActual.data[1][0][0]).to.equal(528076);
    expect(collapseActual.data[1][0][53]).to.equal(652864);
    expect(collapseActual.data[0][6]).to.equal('South America');
    expect(collapseActual.data[1][6].length).to.equal(18);
    expect(collapseActual.data[1][6][0]).to.equal(916445);
    expect(collapseActual.data[1][6][17]).to.equal(2780400);
  });
});