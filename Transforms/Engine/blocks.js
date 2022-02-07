// @id ck2HSyaAL5zp5glkf7Rgpk
DATABASE.tables // Refresh block to lookup up-to-date information

// @id MuNMRisVgDxndsheVQjIRx
DATABASE.getTableById('R5VQ') // Use this block to lookup a table by ID

// @id f6FWyvw1J51peip6RCcbWB
DatabaseDirectory = class {
  constructor() {
    this.tables = {};
  }

  registerTable(meta) {
    // if (this.tables[meta.id]) {
    //   throw new Error(`Table ${meta.name} already registered as ${meta.id}.`);
    // }
    this.tables[meta.id] = meta;
  }

  unregisterTable(id) {
    // if (!this.tables[id]) {
    //   throw new Error(`Table ${id} does not exist.`);
    // }
    delete this.tables[id];
  }

  getTableById(id) {
    return this.tables[id];
  }
}

// @id P6QJC0iWdVVqQZ2ypL0oXH
DATABASE = new DatabaseDirectory();

// @id cjoAxvyfMbZFZsK6UXhymD
Transform = class {
  constructor(spec, meta) {
    this.spec = spec;
    this.meta = meta;
  }

  async prepare() {
    return;
  }

  getParams() {
    throw new Error('Not implemented');
  }

  async getMeta() {
    throw new Error('Not implemented');
  }

  async getData() {
    throw new Error('Not implemented');
  }

  async getMetrics() {
    throw new Error('Not implemented');
  }
}

// @id Lml3KHa1moGPJzN5hDva9i
async function cook(recipe, terminal) {
  try {
    let data = null;
    let meta = null

    // Loop on steps of recipes
    for (const step of recipe) {
      if (!step.skip) {
        const transform = new TRANSFORMS[step.transform](step.spec, meta);
        await transform.prepare();

        // Loop on SQL statements of step
        for (const statement of await transform.getData()) {
          data = await SQL(statement);
        }

        // Produce meta of resulting table
        meta = await transform.getMeta();

        // Update meta within Database Tables Directory
        DATABASE[meta.id] = meta;
      }
    }

    // Produce output
    let output = terminal ? data : await SQL(`SELECT * FROM "${meta.id}";`);
    output.meta = meta;

    // Cleanup output
    delete output.datasetStats;
    delete output.headers;
    delete output.result;

    return output;
  } catch (error) {
    console.log('Error in cook() function: ' + error);
  }
}

// @id YE9ZLmL3y6o8gN42hu7HvT
TRANSFORMS = {
  ADD: __ADD,
  COLLAPSE: __COLLAPSE,
  COMPUTE: __COMPUTE,
  CONFIGURE: __CONFIGURE,
  DEDUPLICATE: __DEDUPLICATE,
  DUPLICATE: __DUPLICATE,
  EXPAND: __EXPAND,
  FILTER: __FILTER,
  FORWARD: __FORWARD,
  GROUPBY: __GROUPBY,
  INSERT: __INSERT,
  JOIN: __JOIN,
  MERGE: __MERGE,
  PICK: __PICK,
  PIVOT: __PIVOT,
  QUERY: __QUERY,
  REMOVE: __REMOVE,
  REPLACE: __REPLACE,
  SPLIT: __SPLIT,
  TABULATE: __TABULATE,
  UNION: __UNION,
  UNPIVOT: __UNPIVOT,
  UPDATE: __UPDATE,
}

// @id pgnv1PZTFgKJTrTx2raTdo
DATATYPES = { datatypes: {} }

FETCHROWS(`Datatypes!Datatypes`, 0, 100)
  .forEach(datatype => { DATATYPES[datatype.id] = datatype; });

DATATYPES;