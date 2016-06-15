const getRowsWithChildren = function(data, idField, parentIdField) {
  const metadata = {};

  data.forEach((d) => {
    if (typeof d[parentIdField] !== 'undefined') {
      if (typeof metadata[d[parentIdField]] === 'undefined') {
        metadata[d[parentIdField]] = [];
      }
      metadata[d[parentIdField]].push(d[idField]);
    }
  });

  return metadata;
};

const getRootParents = function(data, parentIdField) {
  return data.filter((d) => {
    return typeof d[parentIdField] === 'undefined' || d[parentIdField] === null;
  });
};

export { getRowsWithChildren, getRootParents };