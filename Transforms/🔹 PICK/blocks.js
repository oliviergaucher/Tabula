// @id EAAs2ABbWWYStZVjHUds4k
// @title Overview
getTransformOverview('PICK')

// @id MtdOcdvuKNd8Yp40z0lHeD
// @title Demo Spec
pickDemo = {
  mode: 'keep',
  columns: {
    list: [
      { name: 'Name' },
      { name: 'Flag' },
      { name: 'Continent' },
    ]
  }
}

// @id vbZxE3CagL2lOrhS2tUHRX
// @title Demo Form
`Components`.FormRenderer('pickDemo', pickParams, pickContext)

// @id MhE9KqfLze7RORN3oRDLhN
// @title Demo Table
`Components`.TableRenderer(await pickCook(pickDemo, 'pw5G', 'demo'))

// @id IxWkTj52CuGcpg87cOfJ8Q
// @title PICK Class
__PICK = class extends Transform {
  getParams() {
    return pickParams;
  }

  async getData() {
    return pickData(this.spec, this.meta);
  }

  async getMeta() {
    return pickMeta(this.spec, this.meta);
  }
}

// @id yppaQKmh5rlW529mVcSOGc
// @title PICK Params
pickParams = [
  {
    id: 'mode',
    name: 'Mode',
    label: 'Picking mode',
    hint: 'Mode by which to pick columns in (keep) or out (drop)',
    icon: 'mdi-form-dropdown',
    control: 'ButtonToggle',
    options: {
      items: [
        {
          id: 'keep',
          name: 'Keep',
          hint: 'Pick columns in (keep)',
          icon: 'mdi-check-bold',
        },
        {
          id: 'drop',
          name: 'Drop',
          hint: 'Pick columns out (drop)',
          icon: 'mdi-close-thick',
        },
      ],
    },
    default: 'keep',
  },
  {
    id: 'columns',
    name: 'Columns',
    label: 'Columns to pick',
    hint: 'Columns to pick in our out',
    icon: 'mdi-view-column-outline',
    control: 'ColumnPicker',
    options: {
      mode: 'checklist',
      config: true,
      multiple: true,
    },
    required: true,
  },
];

// @id B8xM2kOfW6DnSZXeTMARtL
// @title PICK Data
pickData = function (spec, meta) {
  try {
    if (spec.mode === 'keep') {
      let columns = meta.columns
        .map(column => column.name)
        .filter(column => !spec.columns.list.map(column => column.name).includes(column));
      return columns.map(column => `ALTER TABLE ${meta.id} DROP COLUMN "${column}"`);
    }

    return spec.columns.list.map(column => `ALTER TABLE "${meta.id}" DROP COLUMN "${column.name}"`);
  } catch (error) {
    console.log('Error in pickData() function: ' + error);
  }
}

// @id VuXcxJXMtFwcpSnmIuXXpp
// @title PICK Meta
pickMeta = function (spec, meta) {
  try {
    meta.columns = meta.columns.filter(column => {
      const included = spec.columns.list.map(column => column.name).includes(column.name);
      return spec.mode === 'keep' ? included : !included;
    });

    return meta;
  } catch (error) {
    console.log('Error in pickMeta() function: ' + error);
  }
}

// @id hCS0syyDEZ56socLQsqQMy
// @title PICK Context
pickContext = {
  meta: await META(`Datasets!Countries`),
}

// @id YGYkdFtgfhpTjQgbPN48Us
// @title PICK Cook
pickCook = async function (spec, id, purpose) {
  return await cook([
    {
      transform: 'ADD',
      spec: {
        id,
        name: 'Countries for PICK',
        description: `Table used to ${purpose} the PICK transform.`,
        dataset: {
          type: 'url',
          list: ['https://stoic.com/datasets/Countries.csv'],
        }
      }
    },
    {
      transform: 'PICK',
      spec,
    }
  ]);
}

// @id lYY4MT3jp2zIeHN1YqHBfY
// @title PICK Test
pickTest = {
  mode: 'keep',
  columns: {
    list: [
      { name: 'Name' },
      { name: 'Flag' },
      { name: 'Continent' },
    ]
  }
}

// @id x5S3t7lSqV1B0ss1jhyRVS
// @title PICK Actual
pickActual = await pickCook(pickTest, 'yv4l', 'test');