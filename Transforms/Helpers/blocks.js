// @id J9b5HLS13mXfpyanp8qVZp
async function declareContent(id, content) {
  await SETUI(id, content);
}

// @id NFuQvXeJkSuBUOv0A0rU6G
async function registerComponent(id, component) {
  await SETUI(id, component);
}

// @id Qoovw2jHLqxj1Tx8vDIwmf
function columnarToTabular(columnar) {
  try {
    return {
      meta: columnar.meta,
      data: columnar.data[0].map((r, j) => {
        let row = {};
        for (let i = 0; i < columnar.meta.columns.length; i++) {
          row[columnar.meta.columns[i].id] = columnar.data[i][j];
        }
        return row;
      })
    }
  } catch (error) {
    console.log('Error in columnarToTabular() function: ' + error);
  }
}

// @id VyJlEtiJti61VlJkLV4IzU
function tabularToColumnar(tabular) {
  return Object.keys(tabular[0]).map(key => tabular.map(row => row[key]))
}

// @id YlFxRUr8piuzsGxpf4aHhw
function cloneMeta(meta) {
  return {
    id: meta.id,
    name: meta.name,
    columns: JSON.parse(JSON.stringify(meta.columns)),
    description: meta.description,
    options: JSON.parse(JSON.stringify(meta.options)),
    stats: JSON.parse(JSON.stringify(meta.stats)),
  };
}

// @id tTJACyhdeomS2dBZhoBRVL
function generateBase62ID(size) {
  function generateChar(initial) {
    const CHARS = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]
    return CHARS[Math.floor(Math.random() * (initial ? 52 : 62))]; // Do not use digit as initial
  }

  return (new Array(size || 4)).fill(0).map((value, index) => generateChar(index === 0)).join('');
}

// @id TA7RZzLBRiLt7sdzhkUPbh
function getCategoryItemColor(index) {
  return [
    "#4c78a8", "#f58518", "#54a24b", "#e45756", "#72b7b2",
    "#eeca3b", "#b279a2", "#ff9da6", "#9d755d", "#bab0ac"
  ][index];
}

// @id NSmEO04Qg3MFhG3JT7tslI
function getColumnByName(meta, name) {
  return meta.columns.find(column => column.name === name);
}

// @id tlkqVS33h6AmjBnWYAP0PU
function getPrimitive(datatype) {
  return DATATYPES[datatype].primitive;
}

// @id dIocB0tc20IjbsUgYpg6tp
function selectColumns(columns, prefix = null) {
  return columns.map(column => `${prefix ? prefix + '.' : ''}"${column.name}"`).join(', ');
}

// @id LMHUHveoS93Zb9MUVXhgkN
async function getTransformOverview(transform) {
  const meta = await DLOOKUP(`Transforms!Transforms`, transform);

  return HTML`
    <link href="https://stoic.com/css/main.css" rel="stylesheet" type="text/css"></style>
    <h2 style="font-family: 'Fira Mono'">${meta.name}</h2>
    <div>${meta.description.replaceAll("{", "").replaceAll("}", "")}</div>
    <table width="100%">
      <tr>
        <td width="16%">Status:</td>
        <td width="19%"><code>${meta.status}</code></td>
        <td width="16%">Repeatable:</td>
        <td width="19%"><code>${yesNo(meta.repeatable)}</code></td>
        <td>Sharded:</td>
        <td><code>${yesNo(meta.sharded)}</code></td>
      </tr>
      <tr>
        <td>Type:</td>
        <td><code>${meta.type}</code></td>
        <td>Selectable:</td>
        <td><code>${yesNo(meta.selectable)}</code></td>
        <td width="16%">Prepared:</td>
        <td width="19%"><code>${yesNo(meta.preparation)}</code></td>
      </tr>
      <tr>
        <td>Columns:</td>
        <td><code>${meta.columns}</code></td>
        <td>Dropable:</td>
        <td><code>${yesNo(meta.dropable)}</code></td>
        <td>Reduced:</td>
        <td><code>${yesNo(meta.reduced)}</code></td>
      </tr>
      <tr>
        <td>Rows:</td>
        <td><code>${meta.rows}</code></td>
        <td>Reconfigurable:</td>
        <td><code>${yesNo(meta.reconfigurable)}</code></td>
        <td>Adjusted:</td>
        <td><code>${yesNo(meta.adjusted)}</code></td>
      </tr>
    </table>
    <br>
  `;
}

// @id K056LwUmvebYkU0M4rknJe
function yesNo(boolean) {
  return boolean ? 'Yes' : 'No';
}

// @id EStl98IInBrqRgWx8bfyJ6
function expectColumnarTableEqual(actual, expected) {
  for (const [i, column] of actual.entries()) {
    for (const [j, value] of column.entries()) {
      if (Object.is(value, NaN)) {
        expect(expected[i][j]).to.be.null;
      } else if (typeof expected[i][j] === 'object' && expected[i][j] !== null) {
        expect(JSON.parse(value)).to.be.deep.equal(expected[i][j]);
      } else {
        expect(value).to.be.oneOf([expected[i][j], -2147483648]);
      }
    }
  }
}

// @id AFEDUmxJIWEzzfmZDFbSQh
function expectTabularTableEqual(id, actual, expected) {
  DATABASE.unregisterTable(id);
  return expectColumnarTableEqual(actual, tabularToColumnar(expected));
}

// @id rnXGbZ1rE7nwfv7MdSw7WL
async function testTransform(transform, { meta, data }) {
  return cook([
    {
      transform: 'TABULATE',
      spec: { meta, data },
    },
    transform,
  ])
}