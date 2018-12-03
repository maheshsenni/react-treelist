import isFunction from 'lodash/isFunction';

const getRowsWithChildren = function(data, idField, parentIdField) {
  const metadata = {
    map: {},
    parentRowIds: []
  };

  data.forEach((d) => {
    if (typeof d[parentIdField] !== 'undefined') {
      if (typeof metadata.map[d[parentIdField]] === 'undefined') {
        metadata.map[d[parentIdField]] = [];
        metadata.parentRowIds.push(d[parentIdField]);
      }
      metadata.map[d[parentIdField]].push(d[idField]);
    }
  });

  return metadata;
};

const getRootParents = function(data, parentIdField) {
  return data.filter((d) => {
    return typeof d[parentIdField] === 'undefined' || d[parentIdField] === null;
  });
};

const getChildren = function(parent, data, idField, parentIdField) {
  const parentId = parent[idField];
  return data.filter((d) => {
    return d[parentIdField] === parentId;
  });
};

const getTree = function(data, idField, parentIdField) {
  // first pass - make all objects accessible via O(1)
  const all = {};
  data.forEach((d) => {
    all[d[idField]] = {
      data: d,
      children: [],
      parent: d[parentIdField]
    };
  });
  // add child and parent info to the objects
  Object.keys(all).forEach((id) => {
      let item = all[id];
      if (typeof item.data[parentIdField] === 'undefined' ||
        item.data[parentIdField] === null) {
        item.parent = null;
      } else if (item.data[parentIdField] in all) {
        let parent = all[item.data[parentIdField]];
        parent.children.push(item.data[idField]);
      }
  });
  return all;
};

const getFilteredDisplayRows = function(subset, tree, idField) {
  const ids = [];
  const rows = [];
  let temp;
  subset.forEach(function(d) {
    temp = d;
    ids.push(d[idField]);
    rows.push(d);
    while(tree[temp[idField]].parent !== null) {
      temp = tree[tree[temp[idField]].parent].data;
      if (ids.indexOf(temp[idField]) < 0) {
        ids.push(temp[idField]);
        rows.push(temp);
      }
    }
  });
  return rows;
};

const getClassName = function(className, data) {
  if (isFunction(className)) {
    return className(data);
  }
  return className || '';
}

export {
  getRowsWithChildren,
  getRootParents,
  getChildren,
  getTree,
  getFilteredDisplayRows,
  getClassName
};