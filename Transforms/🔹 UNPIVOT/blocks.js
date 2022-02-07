// @id JAfmamToJ0JiHsB8WoAIxo
// @title Overview
getTransformOverview('UNPIVOT')

// @id UhLBmbiKQ2fAOAsiR0H72x
// @title UNPIVOT Class
__UNPIVOT = class extends Transform {
  getParams() {
    return unpivotParams;
  }

  async getData() {
    return unpivotData(this.spec, this.meta);
  }

  async getMeta() {
    return unpivotMeta(this.spec, this.meta);
  }
}

// @id qI9eCSaW0y1DllG5CeFbF6
// @title UNPIVOT Params
unpivotParams = [
  {
    id: 'first',
    name: 'First',
    label: 'First column',
    hint: 'First column to ipvot',
    icon: 'mdi-card-account-details-outline',
    control: 'ColumnPicker',
    options: {
      mode: 'compact',
    },
    required: true,
  },
  {
    id: 'key',
    name: 'Key',
    label: 'Key column',
    hint: 'Name of the new key column',
    icon: 'mdi-key',
    control: 'ColumnCreator',
  },
  {
    id: 'value',
    name: 'Value',
    label: 'Value column',
    hint: 'Name of the new value column',
    icon: 'mdi-alpha-v-box-outline',
    control: 'ColumnCreator',
  },
];

// @id tPNTYMbIMyR8KxedSQjCTJ
// @title UNPIVOT Data
unpivotData = function (spec, meta) {
  try {
    const first = meta.columns.findIndex(column => column.name === spec.first);
    const left = meta.columns.slice(0, first).map(column => `"${column.name}"`).join(", ");
    const right = meta.columns.slice(first);

    return [right.map(column => {
      return `SELECT ${left},
        '${column.name}' AS "${spec.key}",
        "${column.name}" AS "${spec.value}"
        FROM "${meta.id}"`
    }).join(" UNION ALL ") + ";"];
  } catch (error) {
    console.log('Error in unpivotData() function: ' + error);
  }
}

// @id mmwHd7wQqQ5dLQl9Sh0ter
// @title UNPIVOT Meta
unpivotMeta = function (spec, meta) {
  try {
    return meta;
  } catch (error) {
    console.log('Error in unpivotMeta() function: ' + error);
  }
}

// @id Mxc64Tx4g35VaOBGCK4URE
// @title UNPIVOT Test
cook([
  {
    transform: 'ADD',
    spec: {
      id: 'AxfN',
      name: 'Populations for UNPIVOT',
      description: 'Table used to test the UNPIVOT transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Populations.csv'],
      }
    }
  },
  {
    transform: 'UNPIVOT',
    spec: {
      first: '1950',
      key: 'Year',
      value: 'Population',
    }
  }
]);