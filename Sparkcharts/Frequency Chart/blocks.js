// @id is3VNigAQMDjEy4tErNxxT
await SQL(`DROP TABLE IF EXISTS Countries;`)
await SQL(`CREATE TABLE Countries AS SELECT * FROM "https://stoic.com/datasets/Countries.csv";`)
await SQL(`SELECT * FROM Countries;`);

// @id EdQDfndDFAHGU8z6paKtLq
async function getFrequencyChartData(tableName, columnName) {
  const frequencies = await SQL(`
    SELECT "${columnName}", COUNT(*) AS "Count"
    FROM "${tableName}"
    GROUP BY "${columnName}"
    ORDER BY "Count" DESC;
  `).data;
  return frequencies[0].map((category, index) => {
    return {
      category: category,
      count: frequencies[1][index]
    };
  });
}

// @id isXf3mo6F7zd860fhBmval
SQL(`
    SELECT "Continent", COUNT(*) AS "Count"
    FROM "Countries"
    GROUP BY "Continent"
    ORDER BY "Count" DESC;
  `).data

// @id Lemn5mO5PLf7fCS7N46Reh
await getFrequencyChartData("Countries", "Continent");

// @id qCT3drIQ5lIj6GoLWOa4F2
async function getFrequencyChart(tableName, columnName) {
  const meta = EVALUATE("META(`Datasets!" + tableName + "`)")
    .columns.find(column => column.name === columnName);
  let data = await getFrequencyChartData(tableName, columnName);
  data = data.map((bar, index) => {
    let color = "#4c78a8";
    let title = bar.category;
    if (data.length <= 10) {
      color = [
        "#4c78a8", "#f58518", "#54a24b", "#e45756", "#72b7b2",
        "#eeca3b", "#b279a2", "#ff9da6", "#9d755d", "#bab0ac"
      ][index];
    }
    if (meta.datatype === "boolean") {
      color = bar.category ? "#66b3ab" : "#d87974";
      title = bar.category ? "Yes" : "No";
    }
    if (!title) {
      color = "#a3bbd5";
    }
    return {
      "Bar": bar.category,
      "Index": index,
      "Title": title || "None",
      "Color": color,
      "Count": bar.count,
      "Value": bar.count
    }
  }
  );
  let sort = "Index";
  if (meta.datatype === "boolean") {
    sort = "y";
  }
  return plotHorizontalBarChart(data, { sort, titles: [columnName, tableName] });
}

// @id Mg9KeqIr0sOSFikb2M20hs
await getFrequencyChart("Countries", "Independent");

// @id jL0OTn6YjZmARzCRum4hJa
await getFrequencyChart("Countries", "Continent");

// @id PErL7qhZlzFbtydUWC1JbK
await getFrequencyChart("Countries", "Associated Nation");

// @id lpATao4S8BDVMfJBWwQLKg
await getFrequencyChart("Countries", "Currency");