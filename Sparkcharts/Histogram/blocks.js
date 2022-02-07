// @id NueTqEovsDNBJGmIywQJig
await SQL(`DROP TABLE IF EXISTS Countries;`)
await SQL(`CREATE TABLE Countries AS SELECT * FROM "https://stoic.com/datasets/Countries.csv";`)
await SQL(`SELECT * FROM Countries;`);

// @id yDUcKWz5pPJSjliAMCXagR
async function getHistogramData(tableName, columnName, expression, discrete) {
  const variable = expression ? expression.replaceAll("value", `"${columnName}"`) : `"${columnName}"`;
  const bounds = await SQL(`SELECT
    MIN(${variable}) AS "min",
    MAX(${variable}) AS "max"
    FROM "${tableName}"`).data;
  const min = bounds[0][0];
  const max = bounds[1][0];
  const binning = wasm.getHistogramBinning(min, max, discrete ? 25 : 20);
  const bincounts = await SQL(`
    WITH binning
    AS (SELECT floor((${variable} - ${binning[2]}) / ${binning[1]}) AS bin FROM "${tableName}")
    SELECT bin, COUNT(*) FROM binning GROUP BY bin;
  `).data;
  const bins = bincounts[0];
  const counts = bincounts[1];
  const histogram = new Array(binning[0]).fill(0);
  bins.forEach((bin, index) => { histogram[bin] = counts[index]; });
  return {
    bins: binning[0],
    size: binning[1],
    first: binning[2],
    counts: histogram
  };
}

// @id P3v2gOy83q8mB9WegvBW70
getHistogramData("Countries", "Capital Latitude");

// @id RgGeHTK6XJ9Te4E2WDUqJW
async function getHistogram(tableName, columnName, options) {
  const expression = options ? options.expression : null;
  let discrete = false;
  const meta = EVALUATE("META(`Datasets!" + tableName + "`)")
    .columns.find(column => column.name === columnName);
  const textual = ["string", "text"].includes(meta.datatype);
  if (textual) {
    discrete = true;
  }
  const data = await getHistogramData(tableName, columnName, expression, discrete);
  return plotVerticalBarChart(
    data.counts.map((count, index) => {
      const min = (data.first + index * data.size).toLocaleString();
      const max = (data.first + (index + 1) * data.size).toLocaleString();
      let color = "#6a9e58";
      if (min < 0) {
        color = "#d1605d";
      }
      if (textual) {
        color = "#977762";
      }
      return {
        "Bar": index,
        "Title": `${min} to ${max}`,
        "Color": color,
        "Count": count,
        "Value": count
      }
    }),
    {
      sort: "x",
      titles: [(options && options.title) ? options.title : columnName, "Count"]
    }
  );
}

// @id jiILDtU5Uehe0LLU7kMDJ8
getHistogram("Countries", "Capital Latitude");

// @id krVTy95zcRH9yLYXwD8b86
getHistogram("Countries", "Demonym", {"expression": "length(value)", "title": "Demonym Length"});

// @id gUUX5whHVwtGG0W5bPCDxN
getHistogram("Countries", "Motto", {expression: "length(value)", "title": "Motto Length"});