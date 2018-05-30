export function number_eq(data, filterKey, filterValue) {
  return data.filter(function(d) {
    return d[filterKey] == filterValue;
  });
}

export function number_neq(data, filterKey, filterValue) {
  return data.filter(function(d) {
    return d[filterKey] != filterValue;
  });
}

export function number_gt(data, filterKey, filterValue) {
  return data.filter(function(d) {
    return d[filterKey] > filterValue;
  });
}

export function number_gte(data, filterKey, filterValue) {
  return data.filter(function(d) {
    return d[filterKey] >= filterValue;
  });
}

export function number_lt(data, filterKey, filterValue) {
  return data.filter(function(d) {
    return d[filterKey] !== null && d[filterKey] < filterValue;
  });
}

export function number_lte(data, filterKey, filterValue) {
  return data.filter(function(d) {
    return d[filterKey] !== null && d[filterKey] <= filterValue;
  });
}