// @id rGqHdSvUnHH2I4CnkLOc5W
await SQL(`DROP TABLE IF EXISTS Countries;`)
await SQL(`CREATE TABLE Countries AS SELECT * FROM "https://stoic.com/datasets/Countries.csv";`)
await SQL(`SELECT * FROM Countries;`);

// @id tdo6IoloodCCn71hYBmA06
async function getFrequencyOfFrequencyChartData(tableName, columnName) {
  const frequencies = await SQL(`
    WITH frequencies
    AS (
      SELECT "${columnName}", COUNT(*) AS "Count"
      FROM "${tableName}"
      GROUP BY "${columnName}")
    SELECT "Count", COUNT(*) AS "Count of Count"
    FROM frequencies
    GROUP BY "Count"
    ORDER BY "Count" ASC;
  `).data;
  const counts = frequencies[0];
  const countsOfCounts = frequencies[1];
  const data = new Array(counts[counts.length - 1]).fill(0);
  counts.forEach((count, index) => { data[count - 1] = countsOfCounts[index]; });
  return data;
}

// @id kLeLiBZCnCo4w8GcM5RexI
getFrequencyOfFrequencyChartData("Countries", "Currency");

// @id GGfWMbMqHbvrXlBkDG6b8b
async function getFrequencyOfFrequencyChart(tableName, columnName) {
  const data = await getFrequencyOfFrequencyChartData(tableName, columnName);
  return plotHorizontalBarChart(
    data.map((frequency, index) => {
      return {
        "Bar": index + 1,
        "Title": index + 1,
        "Color": "#b8b0ac",
        "Count": frequency,
        "Value": frequency
      }
    }),
    {
      sort: "y",
      titles: ["Frequency", "Count"]
    }
  );
}

// @id QAkncw5zKhe6YmFFW0crio
getFrequencyOfFrequencyChart("Countries", "Currency");