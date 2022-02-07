// @id TVdNJrlBFSiRXnJfrx3n7d
/**
 * Return a nice binning configuration.
 *
 * @param lower    Lower bound of the univariate dataset for which to produce a binning.
 * @param upper    Upper bound of the univariate dataset for which to produce a binning.
 * @param options  Options.
 * @returns        Object containing the number of bins, the size of bins, and the first and last values.
 * @copyright      Sutoiku, Inc.
 */
function getBins(
  lower,
  upper,
  options = {}
) {
  let {
    sizes = [0.1, 0.125, 0.2, 0.25, 0.5, 1],  // Nice bin sizes scaled to fit within [0, 1] interval
    minBins,                                  // Minimum number of bins
    maxBins,                                  // Maximum number of bins
    desBins,                                  // Desired number of bins
    priority = 'size',                        // Priority mode (most `bins` or largest `size`)
    zero = true,                              // Whether bins include zero
  } = options;

  // Default bin sizes
  const MINBINS = 20;                         // Default minimum number of bins
  const MAXBINS = 40;                         // Default maximum number of bins

  // Handling of zero bin sizes (TODO: needed because of bug with Integer Control)
  if (minBins === 0) {
    minBins = MINBINS;
  }
  if (maxBins === 0) {
    minBins = MAXBINS;
  }

  // Default values for minimum and maximum numbers of bins:
  if (!Number.isInteger(minBins) && !Number.isInteger(maxBins)) {
    minBins = MINBINS;
    maxBins = MAXBINS;
  }

  // When minimum number of bins alone is set, priority is set to bins:
  if (Number.isInteger(minBins) && !Number.isInteger(maxBins)) {
    priority = 'size';
    maxBins = minBins;
  }

  // When maximum number of bins alone is set, priority is set to size:
  if (!Number.isInteger(minBins) && Number.isInteger(maxBins)) {
    priority = 'bins';
    minBins = maxBins;
  }

  // When ideal number of bins is set, minBins and maxBins are set to desBins:
  if (Number.isInteger(desBins)) {
    minBins = desBins;
    maxBins = desBins;
  }

  // Range
  const min = zero ? Math.min(lower, 0) : lower;                  // Minimum value of the range
  const max = zero ? Math.max(upper, 0) : upper;                  // Maximum value of the range
  const range = max - min;                                        // Range

  // Minimum and maximum bin sizes are calculated from maximum and minimum bin numbers.
  const minSize = range / maxBins;                                // Minimum size of bins
  const maxSize = range / minBins;                                // Maximum size of bins

  // Bins sizes are rescaled to fit within the [0, 1] interval.
  let minScale = Math.ceil(Math.log10(minSize));                  // Logarithmic scale for minimum size
  let maxScale = Math.ceil(Math.log10(maxSize));                  // Logarithmic scale for maximum size
  let minSizeScaled = minSize * Math.pow(10, -minScale);          // Minimum bin size rescaled
  let maxSizeScaled = maxSize * Math.pow(10, -maxScale);          // Maximum bin size rescaled

  // Scaled nice minimum bin size as smallest scaled nice bin size greater than scaled minimum bin size:
  let minSizeScaledNice = 0;
  for (let i = 0; i < sizes.length; i++) {
    minSizeScaledNice = sizes[i];
    if (minSizeScaled <= sizes[i]) {
      break;
    }
  }

  // Scaled nice maximum bin size as largest scaled nice bin size lower than scaled maximum bin size:
  let maxSizeScaledNice = 0;
  for (let i = sizes.length; i > 0; i--) {
    maxSizeScaledNice = sizes[i];
    if (maxSizeScaled >= sizes[i]) {
      break;
    }
  }

  // Fall back to minimum scale when minimum scale and maximum scale are different.
  if (maxScale > minScale) {
    maxScale = minScale;
    maxSizeScaledNice = 1;
  }

  const minSizeNice = minSizeScaledNice * Math.pow(10, minScale); // Minimum bin size nice
  const maxSizeNice = maxSizeScaledNice * Math.pow(10, maxScale); // Maximum bin size nice

  function getConfig(min, max, size) {
    const first = Math.floor(min / size) * size;
    const last = Math.ceil(max / size) * size;
    const bins = (last - first) / size;
    return { bins, size, first, last };
  }

  // When ideal number of bins is set, return the config which number of bins is closest to desBins:
  if (Number.isInteger(desBins)) {
    const minConfig = getConfig(min, max, minSizeNice);
    const maxConfig = getConfig(min, max, maxSizeNice);
    return (Math.abs(minConfig.bins - desBins)) < (Math.abs(maxConfig.bins - desBins))
      ? minConfig
      : maxConfig;
  }

  return getConfig(min, max, priority === 'bins' ? minSizeNice : maxSizeNice);
}

// @id RG8qRBvcFa5C4ZqVUiR4v6
describe('getBins()', () => {
  it('should handle positive bounds', async () => {
    expect(getBins(0, 0.628)).to.deep.equal({ bins: 26, size: 0.025, first: 0, last: 0.65 });
    expect(getBins(0, 6.28)).to.deep.equal({ bins: 26, size: 0.25, first: 0, last: 6.5 });
    expect(getBins(0, 62.8)).to.deep.equal({ bins: 26, size: 2.5, first: 0, last: 65 });
    expect(getBins(0, 628)).to.deep.equal({ bins: 26, size: 25, first: 0, last: 650 });
    expect(getBins(0, 10)).to.deep.equal({ bins: 20, size: 0.5, first: 0, last: 10 });
    expect(getBins(0, 20)).to.deep.equal({ bins: 20, size: 1, first: 0, last: 20 });
    expect(getBins(0, 30)).to.deep.equal({ bins: 30, size: 1, first: 0, last: 30 });
    expect(getBins(0, 40)).to.deep.equal({ bins: 40, size: 1, first: 0, last: 40 });
    expect(getBins(0, 50)).to.deep.equal({ bins: 20, size: 2.5, first: 0, last: 50 });
    expect(getBins(0, 100)).to.deep.equal({ bins: 20, size: 5, first: 0, last: 100 });
    expect(getBins(100, 628)).to.deep.equal({ bins: 26, size: 25, first: 0, last: 650 });
  });
  it('should handle negative bounds', async () => {
    expect(getBins(-628, 0)).to.deep.equal({ bins: 26, size: 25, first: -650, last: 0 });
    expect(getBins(-628, -100)).to.deep.equal({ bins: 26, size: 25, first: -650, last: 0 });
  });
  it('should handle mixed signs bounds', async () => {
    expect(getBins(-314, 314)).to.deep.equal({ bins: 26, size: 25, first: -325, last: 325 });
    expect(getBins(-10.1, 9.9)).to.deep.equal({ bins: 21, size: 1, first: -11, last: 10 });
  });
  it('should handle minBins and maxBins parameters', async () => {
    expect(getBins(0, 628, { minBins: 1, maxBins: 3 }))
      .to.deep.equal({ bins: 2, size: 500, first: 0, last: 1000 });
    expect(getBins(0, 628, { minBins: 10, maxBins: 30 }))
      .to.deep.equal({ bins: 13, size: 50, first: 0, last: 650 });
    expect(getBins(0, 628, { minBins: 100, maxBins: 300 }))
      .to.deep.equal({ bins: 126, size: 5, first: 0, last: 630 });
  });
  it('should handle minBins parameter alone', async () => {
    expect(getBins(0, 628, { minBins: 20 }))
      .to.deep.equal({ bins: 26, size: 25, first: 0, last: 650 });
  });
  it('should handle maxBins parameter alone', async () => {
    expect(getBins(0, 628, { minBins: 60 }))
      .to.deep.equal({ bins: 51, size: 12.5, first: 0, last: 637.5 });
  });
  it('should handle desBins parameter', async () => {
    expect(getBins(0, 628, { desBins: 40 }))
      .to.deep.equal({ bins: 32, size: 20, first: 0, last: 640 });
  });
  it('should handle priority parameter', async () => {
    expect(getBins(0, 628, { minBins: 100, maxBins: 300, priority: 'bins' }))
      .to.deep.equal({ bins: 252, size: 2.5, first: 0, last: 630 });
    expect(getBins(0, 628, { minBins: 100, maxBins: 300, priority: 'size' }))
      .to.deep.equal({ bins: 126, size: 5, first: 0, last: 630 });
  });
  it('should handle zero parameter', async () => {
    expect(getBins(100, 628))
      .to.deep.equal({ bins: 26, size: 25, first: 0, last: 650 });
    expect(getBins(100, 628, { zero: false }))
      .to.deep.equal({ bins: 22, size: 25, first: 100, last: 650 });
  });
  it('should handle sizes parameter', async () => {
    expect(getBins(0, 628, { desBins: 40 }))
      .to.deep.equal({ bins: 32, size: 20, first: 0, last: 640 });
    expect(getBins(0, 628, { desBins: 40, sizes: [0.1, 0.125, 0.25, 0.5, 1] }))
      .to.deep.equal({ bins: 51, size: 12.5, first: 0, last: 637.5 });
  });
});

// @id CZGdP4t9feXtWyxVsqSpKk
/**
 * Return the bin containing a value.
 *
 * @param first   Lower bound of the first bin.
 * @param size    Size of the bins.
 * @param value   Value.
 * @returns       Ordinal of the bin containing the value.
 * @description   Lower bound included, upper bound excluded.
 * @copyright     Sutoiku, Inc.
 */
function getBin(
  first,
  size,
  value
) {
  return Math.floor((value - first) / size);
}

// @id fX3TsUgJNWGb3KkKK4JmWh
describe('getBin()', () => {
  it('should return the right bin', async () => {
    expect(getBin(0, 25, 0)).to.equal(0);
    expect(getBin(0, 25, 1)).to.equal(0);
    expect(getBin(0, 25, 10)).to.equal(0);
    expect(getBin(0, 25, 25)).to.equal(1);
    expect(getBin(0, 25, 30)).to.equal(1);
    expect(getBin(0, 25, 50)).to.equal(2);
  });
});