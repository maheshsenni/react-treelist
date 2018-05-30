import { getTree, getFilteredDisplayRows } from './TreeUtils';

const getFilteredData = function(data, filters, idField, parentIdField) {
  let filteredData = data;

  for(let filterKey in filters) {
    filteredData = filteredData.filter(function(d) {
      return d[filterKey].startsWith(filters[filterKey]);
    });
  }

  const tree = getTree(data, idField, parentIdField);
  const displayRows = getFilteredDisplayRows(filteredData, tree, idField, parentIdField);
  return displayRows;
};

export default getFilteredData;