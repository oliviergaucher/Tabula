// @id LCWpL7HAVVzbo4qcpaute6
// @title Overview
getTransformOverview('DEDUPLICATE')

// @id TWDUBVrKw52FhXwPca9YKP
// @title DEDUPLICATE Class
__DEDUPLICATE = class extends Transform {
  getParams() {
    return deduplicateParams;
  }

  async getData() {
    return deduplicateData(this.spec, this.meta);
  }

  async getMeta() {
    return deduplicateMeta(this.spec, this.meta);
  }
}

// @id UIQSFqbk6y54mdHZLCvIlO
// @title DEDUPLICATE Params
deduplicateParams = [];

// @id ajL5etY6JfeD0pAjwq4fa8
// @title DEDUPLICATE Data
deduplicateData = function (spec, meta) {
  try {
    const selection = meta.columns
      .filter(column => column.name !== 'Row ID')
      .map(column => column.name)
      .join(', ')

    return [`
      DELETE FROM "${meta.id}"
      WHERE "Row ID" IN
        (SELECT "Row ID" FROM (
          SELECT "Row ID", ROW_NUMBER()
          OVER(PARTITION BY ${selection})
          AS DuplicateCount
          FROM "${meta.id}"
        )
        WHERE DuplicateCount > 1
      );
    `];
  } catch (error) {
    console.log('Error in deduplicateData() function: ' + error);
  }
}

// @id V2fvKzHUvcypJl2TN7PRX7
// @title DEDUPLICATE Meta
deduplicateMeta = function (spec, meta) {
  try {
    return meta;
  } catch (error) {
    console.log('Error in deduplicateMeta() function: ' + error);
  }
}

// @id rI63UGKtXLO7HXuSUvYrsy
// @title Unit Tests
const meta = {
  id: 'sTN3',
  name: 'Countries for DEDUPLICATE',
  description: 'Table used to test the DEDUPLICATE transform.',
  columns: [
    { id: 'rid', name: 'Row ID', datatype: 'identifier' },
    { id: 'name', name: 'Name', datatype: 'name' },
    { id: 'area', name: 'Area', datatype: 'integer' },
  ],
}

describe('DEDUPLICATE', () => {
  it('should delete single duplicates', async () => {
    const transform = { transform: 'DEDUPLICATE', spec: {} };
    const dataset = {
      meta, data: [
        { rid: 0, name: 'France', area: 357168 },
        { rid: 1, name: 'Germany', area: 377972 },
        { rid: 2, name: 'Germany', area: 377972 },
        { rid: 3, name: 'Japan', area: 643801 },
      ]
    };
    const { data } = await testTransform(transform, dataset);

    expectTabularTableEqual(meta.id, data, [
      { rid: 0, name: 'France', area: 357168 },
      { rid: 1, name: 'Germany', area: 377972 },
      { rid: 3, name: 'Japan', area: 643801 },
    ]);
  });

  it('should delete multiple duplicates', async () => {
    const transform = { transform: 'DEDUPLICATE', spec: {} };
    const dataset = {
      meta, data: [
        { rid: 0, name: 'France', area: 357168 },
        { rid: 1, name: 'Germany', area: 377972 },
        { rid: 2, name: 'Germany', area: 377972 },
        { rid: 3, name: 'Germany', area: 377972 },
        { rid: 4, name: 'Japan', area: 643801 },
      ]
    };
    const { data } = await testTransform(transform, dataset);

    expectTabularTableEqual(meta.id, data, [
      { rid: 0, name: 'France', area: 357168 },
      { rid: 1, name: 'Germany', area: 377972 },
      { rid: 4, name: 'Japan', area: 643801 },
    ]);
  });

  it('should preserve distinct rows', async () => {
    const transform = { transform: 'DEDUPLICATE', spec: {} };
    const dataset = {
      meta, data: [
        { rid: 0, name: 'France', area: 357168 },
        { rid: 1, name: 'Germany', area: 377972 },
        { rid: 2, name: 'Japan', area: 643801 },
      ]
    };
    const { data } = await testTransform(transform, dataset);

    expectTabularTableEqual(meta.id, data, [
      { rid: 0, name: 'France', area: 357168 },
      { rid: 1, name: 'Germany', area: 377972 },
      { rid: 2, name: 'Japan', area: 643801 },
    ]);
  });

  it('should preserve similar rows', async () => {
    const transform = { transform: 'DEDUPLICATE', spec: {} };
    const dataset = {
      meta, data: [
        { rid: 0, name: 'France', area: 357168 },
        { rid: 1, name: 'Germany', area: 377972 },
        { rid: 2, name: 'Germany', area: 377973 },
        { rid: 3, name: 'Japan', area: 643801 },
      ]
    };
    const { data } = await testTransform(transform, dataset);

    expectTabularTableEqual(meta.id, data, [
      { rid: 0, name: 'France', area: 357168 },
      { rid: 1, name: 'Germany', area: 377972 },
      { rid: 2, name: 'Germany', area: 377973 },
      { rid: 3, name: 'Japan', area: 643801 },
    ]);
  });
});