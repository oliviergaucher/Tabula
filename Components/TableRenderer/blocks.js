// @id ArNXqZRdjm8iWRZlnWxut1
async function TableRenderer(columnar) {
  try {
    const COLUMNS = 5;

    // Table Width
    function getTableWidth(index, length) {
      if (length < COLUMNS) {
        return 100 / length + '%';
      }
      return index === 0 ? '28%' : '18%';
    }

    // Table Data
    const table = `Transforms`.columnarToTabular(columnar);
    const columnsCount = table.meta.columns.length;
    const columnsDisplayedCount = Math.min(columnsCount, COLUMNS);
    const columnsDisplayed = table.meta.columns.slice(0, columnsDisplayedCount);
    const headers = table.meta.columns.map((column, index) => {
      return {
        text: column.name,
        value: column.id,
        width: getTableWidth(index, columnsCount),
      }
    }).slice(0, columnsDisplayedCount);
    const data = table.data;

    // Column Dialogs
    const dialogs = {};
    columnsDisplayed.forEach(column => dialogs[column.id] = false);

    // Header Templates
    let templates = columnsDisplayed.map(column => {
      return `
        <template v-slot:header.${column.id}="{ header }">
          <v-dialog v-model="dialogs['${column.id}']" width="500">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" title="${CAPITALIZE(column.datatype)} · Click for statistics">
                <v-icon small style="margin-top: -3px">
                  ${`Datatypes`.DATATYPES[column.datatype].icon}
                </v-icon>
                ${column.name}
              </div>
            </template>
            ${getStatsDialog(column.id, column.name, column.stats)}
          </v-dialog>
        </template>
      `;
    }).join('');

    // Cell Templates
    templates += columnsDisplayed.map((column, index) => {
      const component = "Sparkcell" + CAPITALIZE(column.datatype);
      const sparkcell = System.registry.findComponent(component);

      if (!sparkcell) {
        return '';
      }

      const css = new sparkcell().css;

      return `
        <template v-slot:item.${column.id}="{ item }">
          <component 
            v-if = "${!!css}"
            is   = "style">
            ${css}
          </component>
          <${component}
            :value  = "item.${column.id}"
            :column = "meta.columns[${index}]">
          </${component}>
        </template>'`;
    }).join('');

    // Table Template
    return VUE({
      props: { headers, data, dialogs, templates, meta: table.meta },
      template: `
        <v-data-table dense disable-sort
          class           = "tabula"
          :headers        = "headers"
          :items          = "data"
          :items-per-page = "10">
          ${templates}
        </v-data-table>`
    });
  } catch (error) {
    console.log('Error in TableRenderer() function: ' + error);
    return HTML`<code>Sorry, table cannot be rendered.</code>`;
  }
}

// @id StrqQCY1dAabr51ks6CJ5S
function getStatsDialog(id, name, stats) {
  let contents = 'No statistics available for this column.';
  if (Object.keys(stats).length > 1) {
    contents = `
      <div style="color: #000;">AGGREGATIONS</div>
      <div>Count ${renderStat(stats.count.value)}</div>
      <div>Sum ${renderStat(stats.fsum.value)}</div>
      <div>Entropy ${renderStat(stats.entropy.value)}</div>

      <div style="color: #000; margin-top: 1em;">SCALE</div>
      <div>Minimum ${renderStat(stats.min.value)}</div>
      <div>Maximum ${renderStat(stats.max.value)}</div>
      <div>Range ${renderStat(stats.max.value - stats.min.value)}</div>

      <div style="color: #000; margin-top: 1em;">LOCATION</div>
      <div>Average ${renderStat(stats.favg.value)}</div>
      <div>First Quartile ${renderStat(stats.quartile_cont.value[0][0])}</div>
      <div>Second Quartile <span style="color: #aaa;">(Median)</span> ${renderStat(stats.median.value)}</div>
      <div>Third Quartile ${renderStat(stats.quartile_cont.value[0][2])}</div>
      <div>Mode ${renderStat(stats.mode.value)}</div>

      <div style="color: #000; margin-top: 1em;">DISPERSION</div>
      <div>Standard Deviation Population ${renderStat(stats.stddev_pop.value)}</div>
      <div>Standard Deviation Sample ${renderStat(stats.stddev_samp.value)}</div>
      <div>Variance Population ${renderStat(stats.var_pop.value)}</div>
      <div>Variance Sample ${renderStat(stats.var_samp.value)}</div>

      <div style="color: #333; margin-top: 1em;">MOMENTS</div>
      <div>Skewness ${renderStat(stats.skewness.value)}</div>
      <div>Kurtosis ${renderStat(stats.kurtosis.value)}</div>
    `;
  }
  return `
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        ${name}&nbsp;<span style="color: #aaa; font-weight: 100">Column Statistics</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogs['${id}'] = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div style="margin-top: 1em;">
          ${contents}
        </div>
      </v-card-text>
    </v-card>`;
}

// @id hYy93g9a2EDUQgJStd2MGF
function renderStat(stat) {
  const DIGITS = 3;
  const SEPARATOR = '.';

  // Format value
  let value = new Intl.NumberFormat('en-US', { maximumFractionDigits: DIGITS }).format(stat);

  // Add right padding to center decimal separators horizontally
  const padding = '&nbsp;'.repeat(value.includes(SEPARATOR)
    ? DIGITS + 1 + value.indexOf(SEPARATOR) - value.length
    : DIGITS + 1);
  value += padding;

  // Color decimal separator and fraction digits
  if (value.includes(SEPARATOR)) {
    value = value.replace(SEPARATOR, '<span style="color: #666;">.') + '</span>';
  }

  return `
    <code style="cursor: pointer; color: #000; font-family='Fira Code'; float: right;" title="${stat}">
      ${value}
    </code>`;
}