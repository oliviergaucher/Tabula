// @id ArNXqZRdjm8iWRZlnWxut1
async function TableRendererOld(columnar) {
  try {
    const COLUMNS = 5;
    const DATATYPES = await FETCHROWS(`Datatypes!Datatypes`, 0, 100);

    function width(index, length) {
      if (length < COLUMNS) {
        return 100 / length + '%';
      }
      return index === 0 ? '28%' : '18%';
    }

    const table = `Transforms`.columnarToTabular(columnar);
    const columnsCount = table.meta.columns.length;
    const columnsDisplayed = Math.min(columnsCount, COLUMNS);
    const headers = table.meta.columns.map((column, index) => {
      return {
        text: column.name,
        value: column.id,
        width: width(index, columnsCount),
      }
    }).slice(0, columnsDisplayed);
    const data = table.data;

    // Header Templates
    let templates = table.meta.columns.slice(0, columnsDisplayed).map(column => {
      return `
        <template v-slot:header.${column.id}="{ header }">
          <v-icon
            small
            style = "margin-top: -3px"
            title = "${column.datatype.charAt(0).toUpperCase() + column.datatype.slice(1)}"
          >
            ${DATATYPES.find(datatype => datatype.id === column.datatype).icon}
          </v-icon>
          ${column.name}
        </template>
      `;
    }).join('');

    // Cell Templates
    templates += table.meta.columns.slice(0, columnsDisplayed).map(column => {
      const sparkcell = `Sparkcells`.SPARKCELLS_OLD[column.datatype];
      return sparkcell
        ? `<template v-slot:item.${column.id}="{ item }">`
        + sparkcell(`item.${column.id}`, column)
        + '</template>'
        : '';
    }).join('');

    return VUE({
      props: { headers, data, templates },
      template: `
        <v-data-table
          dense
          disable-sort
          class           = "tabula"
          :headers        = "headers"
          :items          = "data"
          :items-per-page = "10"
        >
          ${templates}
        </v-data-table>`
    });
  } catch (error) {
    console.log('Error in TableRenderer() function: ' + error);
    return HTML`<code>Sorry, table cannot be rendered.</code>`;
  }
}

// @id DJCDTrf6pA6Cd4V0zXQl8d
async function TableRenderer(columnar) {
  try {
    const COLUMNS = 5;
    const DATATYPES = await FETCHROWS(`Datatypes!Datatypes`, 0, 100);

    function width(index, length) {
      if (length < COLUMNS) {
        return 100 / length + '%';
      }
      return index === 0 ? '28%' : '18%';
    }

    const table = `Transforms`.columnarToTabular(columnar);
    const columnsCount = table.meta.columns.length;
    const columnsDisplayed = Math.min(columnsCount, COLUMNS);
    const headers = table.meta.columns.map((column, index) => {
      return {
        text: column.name,
        value: column.id,
        width: width(index, columnsCount),
      }
    }).slice(0, columnsDisplayed);
    const data = table.data;

    // Header Templates
    let templates = table.meta.columns.slice(0, columnsDisplayed).map(column => {
      return `
        <template v-slot:header.${column.id}="{ header }">
          <v-icon
            small
            style = "margin-top: -3px"
            title = "${column.datatype.charAt(0).toUpperCase() + column.datatype.slice(1)}"
          >
            ${DATATYPES.find(datatype => datatype.id === column.datatype).icon}
          </v-icon>
          ${column.name}
        </template>
      `;
    }).join('');

    // Cell Templates
    templates += table.meta.columns.slice(0, columnsDisplayed).map(column => {
      // To use local registry (created in `Sparkcells` workfolder)
      //  const sparkCell = `Sparkcells`.SPARKCELLS[column.datatype];

      // Following line when `System.registry.findComponent` function is merged on master
      // to use the store registry
      const sparkCell = System.registry.findComponent("Sparkcell" + CAPITALIZE(column.datatype));
      if (!sparkCell) {
        return '';
      }

      const sparkCellInstance = new sparkCell();
      return `<template v-slot:item.${column.id}="{ item }">`
        + sparkCellInstance.render(`item.${column.id}`, column)
        + '</template>';
    }).join('');

    return VUE({
      props: { headers, data, templates },
      template: `
        <v-data-table
          dense
          disable-sort
          class           = "tabula"
          :headers        = "headers"
          :items          = "data"
          :items-per-page = "10"
        >
          ${templates}
        </v-data-table>`
    });
  } catch (error) {
    console.log('Error in TableRenderer() function: ' + error);
    return HTML`<code>Sorry, table cannot be rendered.</code>`;
  }
}

// @id P9N9CgwoZbRrVPjdC137wa
cook = `Transforms`.addCook;
table = await cook(`Transforms`.addDemo)

// @id etlJ2R3qyp19XxtBDAscgr
TableRenderer(table)

// @id SfCinvVvPp0L9xyoHVB5LZ
cook2 = `Transforms`.computeCook;
table2 = await cook2(
  'Wqf2',
  'demo',
  `Transforms`.computeDemoTabular,
  'Countries',
  [{ name: 'Name' }, { name: 'Area' }, { name: 'Water' }],
)

// @id pbR2uKx1IBWQneuIwTpMNh
TableRenderer(table2)

// @id VzV1PMSwcjXw4ypvzWy0Hr
cook3 = `Transforms`.pickCook;
table3 = await cook3(`Transforms`.pickDemo, 'pw5G', 'demo')

// @id oKZjzQbVh58WAXjXGAvmYS
TableRenderer(table3)