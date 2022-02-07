// @id wyf33TARSG90ljXwhUtMJW
// @title Overview
await getTransformOverview('ADD')

// @id XKQfYBa2zzXV1uATLiRQuQ
// @title Demo Spec
addDemo = {
  id: 'hI2m',
  name: 'Countries for ADD Demo',
  description: 'Table used to demo the ADD transform.',
  dataset: {
    type: 'url',
    list: ['https://stoic.com/datasets/Countries.csv'],
  },
}

// @id AYvXkCg9zh37Vv7xy92oHs
// @title Demo Form
`Components`.FormRenderer('addDemo', addParams)

// @id UFMTMeX7S5uA5nWTQkGiCJ
// @title Demo Table
`Components`.TableRenderer(await addCook(addDemo))

// @id x4fCAXSmt5MB9pLX71WAh4
// @title ADD Class
__ADD = class extends Transform {
  getParams() {
    return addParams;
  }

  async getData() {
    return addData(this.spec);
  }

  async getMeta() {
    return addMeta(this.spec);
  }
}

// @id KqOfHY2H3SArSvUDEWyJHt
// @title ADD Params
addParams = [
  {
    id: 'id',
    name: 'ID',
    label: 'Table ID',
    hint: 'Identifier of the new table',
    icon: 'mdi-tag-text-outline',
    control: 'StringInput',
  },
  {
    id: 'name',
    name: 'Name',
    label: 'Table name',
    hint: 'Name of the new table',
    icon: 'mdi-card-account-details-outline',
    control: 'TableNameInput',
  },
  {
    id: 'description',
    name: 'Description',
    label: 'Table description',
    hint: 'Description of the new table',
    icon: 'mdi-information-outline',
    control: 'StringInput',
  },
  {
    id: 'dataset',
    name: 'Dataset',
    label: 'Table dataset',
    hint: 'Dataset of the new table',
    icon: 'mdi-database',
    control: 'DatasetPicker',
  },
];

// @id TKKrKdv5mntmS5p7Skqtv9
// @title ADD Data
addData = function (spec) {
  try {
    return [`
      DROP TABLE IF EXISTS "${spec.id}";
      CREATE TABLE "${spec.id}" AS SELECT * FROM '${spec.dataset.list[0]}';
    `];
  } catch (error) {
    console.log('Error in addData() function: ' + error);
  }
}

// @id dj2m7ODINUZd2OeurxBTEv
// @title ADD Meta
addMeta = async function (spec) {
  try {
    // Lookup metadata from mock dataset (to be refactored)
    const name = spec.dataset.list[0].slice(spec.dataset.list[0].lastIndexOf('/') + 1).replace('.csv', '');
    const meta = await EVALUATE('META(`Datasets!' + name + '`)');

    for (let i = 0; i < meta.columns.length; i++) {
      const column = meta.columns[i];
      column.id = generateBase62ID();

      // Outline distinct values of Category columns
      if (column.datatype === 'category') {

        // Lookup distinct values from table in database
        let items = (await SQL(`
          SELECT DISTINCT "${column.name}"
          FROM "${spec.id}"
          ORDER BY "${column.name}";
        `))
          .data[0]
          .filter(value => value !== null)
          .map(value => { return { name: value } });

        // Assign default colors when count of distinct values is 10 or less
        if (items.length <= 10) {
          items = items.map((item, index) => {
            item.color = getCategoryItemColor(index);
            return item;
          });
        }

        column.options = { items };
      }
    }

    // Populate meta properties
    const output = {
      id: spec.id,
      name: spec.name,
      columns: meta.columns,
      description: spec.description,
      options: {},
      stats: {},
    };

    // Register table into DATABASE
    DATABASE.registerTable(output);

    return output;
  } catch (error) {
    console.log('Error in addMeta() function: ' + error);
  }
}

// @id aGwabKB1O0EvZQeZmo6VyX
// @title ADD Cook
addCook = async function (spec) {
  return await cook([
    {
      transform: 'ADD',
      spec,
    }
  ])
}

// @id OKhWJm1GhVuHGO6jddkkU0
// @title ADD Test
addTest = {
  id: 'R5VQ',
  name: 'Countries for ADD Test',
  description: 'Table used to test the ADD transform.',
  dataset: {
    type: 'url',
    list: ['https://stoic.com/datasets/Countries.csv'],
  },
}

// @id iTOSnVc9RjzCYhLxR2SN7O
// @title ADD Actual
addActual = await addCook(addTest)

// @id RrwyfJwuH1UmHx4I8pbpF5
// @title Unit Tests
describe('ADD', () => {
  it('should create a table with the right headers', async () => {
    const actual = addActual.meta.columns.map(c => c.name);
    const expected = await META(`Datasets!Countries`).columns.map(c => c.name);
    expect(actual).to.deep.equal(expected);
  });

  it('should create a table with the right data', async () => {
    const actual = addActual.data;
    const expected = tabularToColumnar(await FETCHROWS(`Datasets!Countries`, 0, 1e3)).slice(1);
    expectColumnarTableEqual(actual, expected);
  });
});