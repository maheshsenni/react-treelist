import { getTree, getFilteredDisplayRows } from './TreeUtils';
import { sortBy } from 'lodash';

const getFilteredData = function(data, filters, idField, parentIdField) {
  const filterField = Object.keys(filters)[0];
  let filteredData = data.filter(function(d) {
    return d[filterField].startsWith(filters[filterField]);
  });

  const tree = getTree(data, idField, parentIdField);
  const displayRows = getFilteredDisplayRows(filteredData, tree, idField, parentIdField);
  return displayRows;
};

// Sort on multiple fields solution from
// http://blog.falafel.com/nifty-underscore-tricks-sorting-by-multiple-properties-with-underscore/
const getSortedData = function(data, sortOptions) {
  console.log(sortOptions);

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