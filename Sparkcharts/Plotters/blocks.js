// @id WKWgquxD8lKAr3kQvkZTDk
_SPARKCHART_HEIGHT = 120;
_SPARKCHART_WIDTH = 200;
MD`Sparkchart dimensions set`

// @id OPTYgU6ikafSs2lzoSLpi0
function displayZeroValues(data) {
  const zeroValue = Math.max(...data.map(bar => bar.Value)) / 1000;
  data.forEach(bar => { bar.Value = Math.max(bar.Value, zeroValue); });
  return data;
}

// @id E0MfcgxBdwCtfQQZkvAUDT
function gatherOthers(data) {
  const MAXBARS = 25;
  if (data.length > MAXBARS) {
    const others = data.slice(MAXBARS - 1).reduce((current, previous) => current + previous.Count, 0);
    data = data.slice(0, MAXBARS - 1).concat({
      "Bar": "Others",
      "Index": MAXBARS - 1,
      "Title": "Others",
      "Color": data[0].Color,
      "Count": others,
      "Value": others > data[0].Count ? data[0].Count * data[0].Count / others : others
    });
    if (others > data[0].Count) {
      data = data.concat({
        "Bar": "Others",
        "Index": MAXBARS - 1,
        "Title": "Others",
        "Color": lightenColor(data[0].Color),
        "Count": others,
        "Value": data[0].Count - data[0].Count * data[0].Count / others
      });
    }
  }
  return data;
}

// @id SfiDnTTNVVCK3kRgTdxOPA
function plotHorizontalBarChart(data, options) {
  data = displayZeroValues(gatherOthers(data));
  return VPLOT({
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "height": _SPARKCHART_HEIGHT,
    "width": _SPARKCHART_WIDTH,
    "data": { "values": data },
    "mark": {
      "type": "bar",
      "fill": { "expr": "datum.Bar == null ? 'white' : datum.Color" },
      "stroke": { "expr": "datum.Color" }
    },
    "encoding": {
      "x": {
        "aggregate": "sum",
        "field": "Value",
        "type": "quantitative",
        "axis": { "domain": false, "grid": false, "labels": false, "ticks": false, "title": null }
      },
      "y": {
        "field": "Bar",
        "type": "nominal",
        "axis": { "domain": false, "grid": false, "labels": false, "ticks": false, "title": null },
        "sort": options.sort || "-x"
      },
      "color": { "field": "Color", "type": "nominal", "scale": null },
      "tooltip": [
        { "field": "Title", "type": "nominal", "title": options.titles[0] },
        { "field": "Count", "type": "quantitative", "title": options.titles[1] }
      ]
    },
    "config": { "view": { "stroke": "transparent" } }
  })
}

// @id G8ljQBofle3lOGpZHpS2wB
function plotVerticalBarChart(data, options) {
  data = displayZeroValues(data);
  return VPLOT({
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "height": _SPARKCHART_HEIGHT,
    "width": _SPARKCHART_WIDTH,
    "data": { "values": data },
    "mark": { "type": "bar" },
    "encoding": {
      "x": {
        "field": "Bar",
        "type": "nominal",
        "axis": { "domain": false, "grid": false, "labels": false, "ticks": false, "title": null },
        "sort": options.sort || "-y"
      },
      "y": {
        "field": "Value",
        "type": "quantitative",
        "axis": { "domain": false, "grid": false, "labels": false, "ticks": false, "title": null }
      },
      "color": { "field": "Color", "type": "nominal", "scale": null },
      "tooltip": [
        { "field": "Title", "type": "nominal", "title": options.titles[0] },
        { "field": "Count", "type": "quantitative", "title": options.titles[1] }
      ]
    },
    "config": { "view": { "stroke": "transparent" } }
  })
}