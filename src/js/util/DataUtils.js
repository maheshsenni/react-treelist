import { getTree, getFilteredDisplayRows } from './TreeUtils';

const getFilteredData = function(data, filters, idField, parentIdField) {
  const filterField = Object.keys(filters)[0];
  let filteredData = data.filter(function(d) {
    return d[filterField].startsWith(filters[filterField]);
  });

  const tree = getTree(data, idField, parentIdField);
  const displayRows = getFilteredDisplayRows(filteredData, tree, idField, parentIdField);
  return displayRows;
};

export { getFilteredData };