// @id pS3o52pW0JCItHPSiLKaw6
// @title Overview
getTransformOverview('REMOVE')

// @id DEAVMRH3TV9qj0COHao4p2
// @title REMOVE Class
__REMOVE = class extends Transform {
  getParams() {
    return removeParams;
  }

  async getData() {
    return removeData(this.spec);
  }

  async getMeta() {
    return removeMeta(this.spec);
  }
}

// @id p95zcv5ewp6I3Ydrj4DDDd
// @title REMOVE Params
removeParams = [
  {
    id: 'table',
    name: 'Table',
    label: 'Table to remove',
    hint: 'Table to remove',
    icon: 'mdi-table',
    control: 'TablePicker',
  },
];

// @id tPLaVc7lLSn2iSgC0DfmyC
// @title REMOVE Data
removeData = function (spec) {
  try {
    DATABASE.unregisterTable(spec.table);

    return [`DROP TABLE IF EXISTS "${spec.table}";`];
  } catch (error) {
    console.log('Error in removeData() function: ' + error);
  }
}

// @id nSaVJv2pCPr1DW0IdXHoe5
// @title REMOVE Meta
removeMeta = async function (spec) {
  try {
    return { id: spec.table };
  } catch (error) {
    console.log('Error in removeMeta() function: ' + error);
  }
}

// @id HDXqf605eymho0B8wnke7b
// @title REMOVE Test
cook([
  {
    transform: 'ADD',
    spec: {
      id: 'morA',
      name: 'Countries for REMOVE',
      description: 'Table used to test the REMOVE transform.',
      dataset: {
        type: 'url',
        list: ['https://stoic.com/datasets/Countries.csv'],
      }
    }
  },
  {
    transform: 'REMOVE',
    spec: {
      table: 'morA',
    }
  }
], true);