// @id d2tKY46SUUW5rE5Z3ZcerC
SPARKCELLS_OLD = {
  array: SparkcellArrayOld,
  category: SparkcellCategoryOld,
  image: SparkcellImageOld,
  name: SparkcellNameOld,
  percent: SparkcellPercentOld,
}

// @id hZXPmTi4oWAamDk2EnnGrW
SPARKCELLS = {
  array: SparkcellArray,
  category: SparkcellCategory,
  image: SparkcellImage,
  name: SparkcellName,
  percent: SparkcellPercent,
}

// @id pwHAdZ3KHLn4YqS6AXhA5a
comp = new (System.registry.findComponent("SparkcellArray"))();
comp.render('[1, 2]');