// @id vk9S5rFOTSM7QsbvetHr6a
// @title Overview
getTransformOverview('COMPUTE')

// @id DA1dIHQksJir37geqyxF1C
// @title Tabular Demo Spec
computeDemoTabular = {
  mode: 'tabular',
  column: {
    name: 'Water Area',
    datatype: 'number',
  },
  expression: `"Area" * "Water"`,
}

// @id AhH1ylClfNTNKQGNcDcmDJ
// @title Tabular Demo Form
`Components`.FormRenderer('computeDemoTabular', computeParams, await computeContext('Countries'))

// @id QcfSajIa7zvBENoi9LNtLM
// @title Tabular Demo Table
`Components`.TableRenderer(await computeCook(
  'Wqf2',
  'demo',
  computeDemoTabular,
  'Countries',
  [{ name: 'Name' }, { name: 'Area' }, { name: 'Water' }],
))

// @id BUAhTSLEpi4z6nbPVQRJxM
// @title Bin Demo Spec
computeDemoBin = {
  mode: 'bin',
  binning: { list: [{ name: 'Area' }] },
  binPriority: 'size',
  binZero: true,
  column: {
    name: 'Area Bin',
    datatype: 'integer',
  }
};

// @id kL9LUZFb5AwqaKnjrM8v39
// @title Bin Demo Form
`Components`.FormRenderer('computeDemoBin', computeParams, await computeContext('Countries'))

// @id YeONLaem0B8QDSzgIndyVf
`Components`.TableRenderer(await computeCook(
  'Kq4x',
  'demo',
  computeDemoBin,
  'Countries',
  [{ name: 'Name' }, { name: 'Area' }],
))

// @id AYSxiga14QCPdeHx0lZTpm
// @title Window Demo Spec
computeDemoWindow = {
  mode: 'window',
  column: {
    name: 'Population Moving Average',
    datatype: 'number',
  },
  expression: `AVG("Population")`,
  sortings: { list: [{ name: "Year" }] },
  dimensions: { list: [{ name: "Country" }] },
  frame: {
    start: -1,
    end: 1,
  },
};

// @id rW2UugDVHDowOsg4U1LfuU
// @title Window Demo Form
`Components`.FormRenderer('computeDemoWindow', computeParams, await computeContext('Demographics'))

// @id Slh73gdedhdXdiD1DKrckt
// @title Window Demo Table
`Components`.TableRenderer(await computeCook(
  'g4Rd',
  'demo',
  computeDemoWindow,
  'Demographics',
  [{ name: 'Country' }, { name: 'Year' }, { name: 'Population' }],
))

// @id JmkH5KC6eaJ2fJIQXd3fDU
// @title COMPUTE Class
__COMPUTE = class extends Transform {
  getParams() {
    return computeParams;
  }

  async getData() {
    return computeData(this.spec, this.meta);
  }

  async getMeta() {
    return computeMeta(this.spec, this.meta);
  }
}

// @id DPVFjM0cAd2ZDWuIj1GdS1
// @title COMPUTE Params
computeParams = [
  {
    id: 'mode',
    name: 'Mode',
    label: 'Compute mode',
    hint: 'Tabular for row-by-row, table-wide otherwise',
    icon: 'mdi-form-dropdown',
    control: 'ButtonToggle',
    options: {
      items: [
        {
          id: 'tabular',
          name: 'Tabular',
          hint: 'Row-by-row',
          icon: 'mdi-table-large',
        },
        {
          id: 'bin',
          name: 'Bin',
          hint: 'Discretization binning',
          icon: 'mdi-square-wave',
        },
        {
          id: 'window',
          name: 'Window',
          hint: 'Moving window',
          icon: 'mdi-contain',
        },
      ]
    },
    default: 'tabular',
  },
  {
    id: 'binning',
    name: 'Binning',
    label: 'Columns to bin',
    hint: 'Columns to bin (discretize or re-discretize)',
    icon: 'mdi-view-column-outline',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
      config: true,
      multiple: true,
    },
    required: true,
    modes: ['bin'],
  },
  {
    id: 'minBins',
    name: 'Minimum bins',
    label: 'Minimum bins',
    hint: 'Minimum number of bins',
    icon: 'mdi-battery-low',
    control: 'IntegerInput',
    modes: ['bin'],
  },
  {
    id: 'desBins',
    name: 'Desired bins',
    label: 'Desired bins',
    hint: 'Desired number of bins',
    icon: 'mdi-battery-medium',
    control: 'IntegerInput',
    modes: ['bin'],
  },
  {
    id: 'maxBins',
    name: 'Maximum bins',
    label: 'Maximum bins',
    hint: 'Maximum number of bins',
    icon: 'mdi-battery-high',
    control: 'IntegerInput',
    modes: ['bin'],
  },
  {
    id: 'binZero',
    name: 'Zero',
    label: 'Include zero',
    hint: 'Include zero within bins',
    icon: 'mdi-numeric-0-box-outline',
    control: 'SwitchToggle',
    modes: ['bin'],
  },
  {
    id: 'binPriority',
    name: 'Priority',
    label: 'Priority',
    hint: 'Prioritze for largest bin size or largest number of bins',
    icon: 'mdi-format-list-number',
    control: 'ButtonToggle',
    options: {
      items: [
        {
          id: 'bins',
          name: 'Bins',
          hint: 'Largest number of bins',
          icon: 'mdi-battery-high',
        },
        {
          id: 'size',
          name: 'Size',
          hint: 'Largest bin size',
          icon: 'mdi-battery-outline',
        },
      ]
    },
    default: 'size',
    modes: ['bin'],
  },
  {
    id: 'column',
    name: 'Column',
    label: 'New column',
    hint: 'Configuration of the new computed column',
    icon: 'mdi-table-column',
    control: 'ColumnCreator',
    options: {
      config: true,
      repeatable: true,
      uniform: true,
    },
    required: true,
  },
  {
    id: 'dimensions',
    name: 'Dimensions',
    label: 'Group-by columns',
    hint: 'Columns to group rows by',
    icon: 'mdi-cube-scan',
    control: 'ColumnPicker',
    options: {
      mode: 'checklist',
      config: true,
      multiple: true,
    },
    modes: ['window']
  },
  {
    id: 'sortings',
    name: 'Sortings',
    label: 'Sortings columns',
    hint: 'Columns to sort rows by ',
    icon: 'mdi-sort',
    control: 'ColumnPicker',
    options: {
      mode: 'checklist',
      config: true,
      multiple: true,
    },
    modes: ['window'],
  },
  {
    id: 'frame',
    name: 'Frame',
    label: 'Windowing frame',
    hint: 'Frame to perform the computation within',
    icon: 'mdi-contain',
    control: 'FrameEditor',
    modes: ['window'],
  },
  {
    id: 'expression',
    name: 'Expression',
    label: 'Expression',
    hint: 'Expression evaluated to compute values of the new column',
    icon: 'mdi-function',
    control: 'ExpressionEditor',
    modes: ['tabular', 'window'],
  },
];

// @id ffCuKLlDXMD2xpK2xlgo5S
// @title COMPUTE Data
computeData = async function (spec, meta) {
  try {
    return [computeCreateColumnQuery(spec, meta), await computeUpdateColumnQuery(spec, meta)];
  } catch (error) {
    console.log('Error in computeData() function: ' + error);
  }
}

// @id lj764WvPd74n1NpJhEAX95
// @title COMPUTE Meta
computeMeta = function (spec, meta) {
  try {
    if (!spec.items) {
      spec.items = [1];
    }

    spec.items.forEach(item => {
      meta.columns.push({
        id: generateBase62ID(),
        name: spec.column.name,
        datatype: spec.column.datatype,
      });
    });

    return meta;
  } catch (error) {
    console.log('Error in computeMeta() function: ' + error);
  }
}

// @id PstAKiVU8tdgfD9DCVZjVq
computeCreateColumnQuery = function (spec, meta) {
  return `
    ALTER TABLE "${meta.id}"
    ADD "${spec.column.name}" ${`Datatypes`.DATATYPES[spec.column.datatype].primitive};`;
}

// @id clZgSkq30cqUNOE2v6EruK
computeUpdateColumnQuery = async function (spec, meta) {
  switch (spec.mode) {
    case 'bin':
      return await computeBinQuery(spec, meta);

    case 'window':
      return computeWindowQuery(spec, meta);

    default:
      return computeTabularQuery(spec, meta);
  }
}

// @id cEup9bwgyUWOtnr4kRfJmD
computeBinQuery = async function (spec, meta) {
  const binning = spec.binning.list[0].name;

  const bounds = await SQL(`
    SELECT MIN("${binning}"), MAX("${binning}")
    FROM "${meta.id}";`);

  const min = bounds.data[0][0];
  const max = bounds.data[1][0];

  const bins = `Functions`.getBins(min, max, {
    minBins: spec.minBins,
    desBins: spec.desBins,
    maxBins: spec.maxBins,
    priority: spec.binPriority,
    zero: spec.binZero,
  });

  return `
    UPDATE "${meta.id}"
    SET "${spec.column.name}" = FLOOR(("${binning}" - ${min}) / ${bins.size});`;
}

// @id I5ew5FqsiUR9PbsGerbSvi
computeTabularQuery = function (spec, meta) {
  return `
    UPDATE "${meta.id}"
    SET "${spec.column.name}" = ${spec.expression};`;
}

// @id CFnwBpw0OGuOnRWeRBd6e1
computeWindowQuery = function (spec, meta) {
  return `
    UPDATE "${meta.id}" target
    SET "${spec.column.name}" = source.computedColumn
    FROM (
      SELECT ROWID, ${spec.expression} OVER windowDefinition as computedColumn
      FROM "${meta.id}"
      WINDOW windowDefinition AS (${computeWindowDefinition(spec)})
    ) source
    WHERE source.ROWID = target.ROWID; `;
}

// @id E2aT4Q6fvc5bgLCrg5MfHU
computeWindowDefinition = function (spec) {
  let definition = '';

  if (spec.dimensions && spec.dimensions.list && spec.dimensions.list.length > 0) {
    const partitions = spec.dimensions.list.map(({ name }) => `"${name}"`);
    definition += `PARTITION BY ${partitions.join(', ')} `;
  }

  if (spec.sortings && spec.sortings.list && spec.sortings.list.length > 0) {
    const sortings = spec.sortings.list.
      map(({ name, order = 'ASC' }) => `"${name}" ${order}`);
    definition += `ORDER BY ${sortings.join(', ')} `;
  }

  if (spec.frame) {
    definition += `ROWS ${computeWindowFrame(spec.frame)} `;
  }

  return definition;
}

// @id b9qJUdwQ9XHFxPgmHvFP8f
computeWindowFrame = function (frame) {
  const { start, end } = frame;
  return `
    BETWEEN ${computeWindowFrameBound(start, true)}
    AND ${computeWindowFrameBound(end, false)}`;
}

// @id AbK0sMd53CwGv6TTUbmkZm
computeWindowFrameBound = function (bound, start) {
  if (bound === null) {
    return `UNBOUNDED ${start ? 'PRECEDING' : 'FOLLOWING'}`;
  } else if (bound === 0) {
    return 'CURRENT ROW';
  } else {
    return `${Math.abs(bound)} ${bound > 0 ? 'FOLLOWING' : 'PRECEDING'}`;
  }
}

// @id jobON4Hivfai6WJfwfATGz
// @title COMPUTE Context
computeContext = async function (dataset) {
  return {
    datatypes: await FETCHROWS(`Datatypes!Datatypes`, 0, 100),
    meta: await META(EVALUATE("`Datasets!" + dataset + "`")),
  }
}

// @id wV1Wstv7jtbNWccUTYhIno
// @title COMPUTE Cook
computeCook = async function (id, purpose, spec, dataset, columns) {
  return await cook([
    {
      transform: 'ADD',
      spec: {
        id,
        name: `${dataset} for COMPUTE`,
        description: `Table used to ${purpose} the COMPUTE transform.`,
        dataset: {
          type: 'url',
          list: [`https://stoic.com/datasets/${dataset}.csv`],
        }
      }
    },
    {
      transform: 'PICK',
      spec: {
        mode: 'keep',
        columns: {
          list: columns,
        }
      }
    },
    {
      transform: 'COMPUTE',
      spec,
    }
  ]);
}

// @id npjhMnsP2iCydDIr7DBCwz
// @title COMPUTE Test
computeTest = {
  column: {
    mode: 'tabular',
    name: 'Water Area',
    datatype: 'number',
  },
  expression: `"Area" * "Water"`,
}

// @id JoseH9tmZ6elh3plqdjg8V
// @title COMPUTE Actual
computeActual = await computeCook(
  'FrMp',
  'test',
  computeTest,
  'Countries',
  [{ name: 'Name' }, { name: 'Area' }, { name: 'Water' }],
);

// @id E8NrqNYpA3Xz6mkYJhM4wo
// @title Unit Tests
describe('COMPUTE', () => {
  it('should compute a new column', async () => {
    expect((await computeActual).meta.columns.length).to.equal(4);
    expect((await computeActual).data.length).to.equal(4);
    expect((await computeActual).data[0].length).to.equal(250);
    expect((await computeActual).data[3][0]).to.equal(0);
    expect((await computeActual).data[3][2]).to.equal(1437.4);
  });
});