// @id TVdNJrlBFSiRXnJfrx3n7d
/**
 * Return a nice binning configuration for a histogram.
 *
 * @param minimum  Minimum value of the univariate dataset for which to produce a histogram.
 * @param maximum  Maximum value of the univariate dataset for which to produce a histogram.
 * @param minbars  Minimum number of bars for the histogram.
 * @returns        Array of three values: [Number of bins, Size of an individual bin, First bin minimum].
 * @copyright      Sutoiku, Inc.
 */
export function getHistogramBinning(
  minimum: f64,
  maximum: f64,
  minbars: i32 = 20,
): f64[] {
  const maxbars = 2 * minbars;
  const range = Math.max(maximum, 0) - Math.min(minimum, 0);
  const scale = Math.pow(10, Math.ceil(Math.log10(range)) - 2);
  const rescaling = range / scale;
  let factor = 1.0;
  if (rescaling < minbars) {
    factor = 0.5;
  } else if (rescaling > maxbars) {
    factor = 100 / maxbars;
  }
  const size = scale * factor;
  let bins = Math.ceil(rescaling / factor);
  let first = minimum < 0 ? - bins * size : 0;
  if (minimum * maximum < 0) {
    first = - Math.ceil(- minimum / size) * size;
    if (first + bins * size < maximum) {
      bins++;
    }
  }
  return [bins, size, first];
}