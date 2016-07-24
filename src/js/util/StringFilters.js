export function string_eq(data, filterKey, filterValue) {
  const fv = filterValue.toLowerCase();
  return data.filter(function(d) {
    if (typeof d[filterKey] !== 'string') {
      return false;
    } else {
      return d[filterKey].toLowerCase() === fv;
    }
  });
}

export function string_neq(data, filterKey, filterValue) {
  const fv = filterValue.toLowerCase();
  return data.filter(function(d) {
    if (typeof d[filterKey] !== 'string') {
      return true;
    } else {
      return d[filterKey].toLowerCase() !== fv;
    }
  });
}

export function string_sw(data, filterKey, filterValue) {
  const fv = filterValue.toLowerCase();
  let val;
  return data.filter(function(d) {
    val = d[filterKey];
    if (typeof val !== 'string') {
      return false;
    } else {
      return val.toLowerCase().indexOf(fv) === 0;
    }
  });
}

export function string_ew(data, filterKey, filterValue) {
  const fv = filterValue.toLowerCase();
  let val;
  return data.filter(function(d) {
    val = d[filterKey];
    if (typeof val !== 'string') {
      return false;
    } else {
      val = val.toLowerCase();
      return val.lastIndexOf(fv) === (val.length - fv.length);
    }
  });
}

export function string_c(data, filterKey, filterValue) {
  const fv = filterValue.toLowerCase();
  let val;
  return data.filter(function(d) {
    val = d[filterKey];
    if (typeof val !== 'string') {
      return false;
    } else {
      return val.toLowerCase().indexOf(fv) > -1;
    }
  });
}

export function string_dc(data, filterKey, filterValue) {
  const fv = filterValue.toLowerCase();
  let val;
  return data.filter(function(d) {
    val = d[filterKey];
    if (typeof val !== 'string') {
      return true;
    } else {
      return val.toLowerCase().indexOf(fv) === -1;
    }
  });
}

export function string_e(data, filterKey) {
  let val;
  return data.filter(function(d) {
    val = d[filterKey];
    if (typeof val === 'undefined') {
      return true;
    } else {
      return typeof val === 'string' && val.length === 0;
    }
  });
}

export function string_ne(data, filterKey) {
  let val;
  return data.filter(function(d) {
    val = d[filterKey];
    if (typeof val === 'string') {
      return val.length > 0;
    } else {
      return typeof val !== 'undefined';
    }
  });
}