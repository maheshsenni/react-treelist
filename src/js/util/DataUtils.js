import { getTree, getFilteredDisplayRows } from './TreeUtils';
import { sortBy } from 'lodash';

const getFilteredData = function(data, filters, idField, parentIdField) {
  let filteredData = data;

  for(let filterKey in filters) {
    let filterValue = filters[filterKey];
    filteredData = filteredData.filter(function(d) {
      return d[filterKey].startsWith(filters[filterKey]);
    });
  }

  const tree = getTree(data, idField, parentIdField);
  const displayRows = getFilteredDisplayRows(filteredData, tree, idField, parentIdField);
  return displayRows;
};

// Sort on multiple fields solution from
// http://blog.falafel.com/nifty-underscore-tricks-sorting-by-multiple-properties-with-underscore/
const getSortedData = function(data, sortOptions) {
  const sortKeys = Object.keys(sortOptions);
  sortKeys.reverse();

  let sortedData = data;
  for (var i = 0, length = sortKeys.length; i < length; i++) {
    sortedData = sortBy(sortedData, sortKeys[i]);
    if (sortOptions[sortKeys[i]] === 'desc') {
      sortedData.reverse();
    }
    if (sortKeys[i + 1] && sortOptions[sortKeys[i + 1]] === 'desc') {
      sortedData.reverse();
    }
  }

  return sortedData;
}

export { getFilteredData, getSortedData };