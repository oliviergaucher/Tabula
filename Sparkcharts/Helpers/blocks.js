// @id IVte9ShyrrI1c0af86yPAH
function lightenColor(color) {
  return {
    "#4c78a8": "#a3bbd5",
    "#b8b0ac": "#dbd7d5"
  }[color];
}

// @id Ls1fKMmoPP3PX3Tmqwt9zs
async function getStatistics(dataset, column) {
  // https://duckdb.org/docs/sql/aggregates
  await SQL(`DROP TABLE IF EXISTS Countries;`);
  await SQL(`CREATE Table Countries AS SELECT * FROM "${dataset}";`);
  return await SQL(`SELECT
    COUNT("${column}") AS "Count",
    MIN("${column}") AS "Minimum",
    MAX("${column}") AS "Maximum",
    FSUM("${column}") AS "Sum",
    FAVG("${column}") AS "Average",
    MODE("${column}") AS "Mode",
    MEDIAN("${column}") AS "Median",
    QUANTILE_CONT("${column}", [0.25, 0.5, 0.75]) AS "Interpolated Quartiles",
    QUANTILE_DISC("${column}", [0.25, 0.5, 0.75]) AS "Exact Quartiles",
    QUANTILE_CONT("${column}", [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) AS "Interpolated Dciles",
    QUANTILE_DISC("${column}", [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) AS "Exact Deciles",
    STDDEV_POP("${column}") AS "Population Standard Deviation",
    STDDEV_SAMP("${column}") AS "Sample Standard Deviation",
    VAR_POP("${column}") AS "Population Variance",
    VAR_SAMP("${column}") AS "Sample Variance",
    MAD("${column}") AS "Median Absolute Deviation",
    SKEWNESS("${column}") AS "Skewness",
    KURTOSIS("${column}") AS "Kurtosis",
    ENTROPY("${column}") AS "Entropy"
    FROM Countries;`);
}

// @id VD3LViABDFXQaReEjYVlBv
await getStatistics("https://stoic.com/datasets/Countries.csv", "Area");