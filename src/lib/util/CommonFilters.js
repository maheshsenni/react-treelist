export function is_null(data, filterKey) {
  return data.filter(function(d) {
    return d[filterKey] === null;
  });
}

export function is_not_null(data, filterKey) {
  return data.filter(function(d) {
    return d[filterKey] !== null;
  });
}