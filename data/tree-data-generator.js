var args = process.argv.splice(2);

var parentsCount = parseInt(args[0]);
var childrenCount = parseInt(args[1]);

if (!parentsCount || !childrenCount) {
  // parent count and children count are required
  console.error('Parent count and children count are required');
  process.exit(1);
}

var tree = [];

var id = 0, obj, cobj;
for (var i = 0; i < parentsCount; i++, id++) {
  obj = {};
  obj.id = id;
  obj.firstName = 'Parent ' + id;
  obj.lastName = 'Name ' + id;
  obj.employeeId = Math.floor(Math.random() * 10000);
  obj.level = 0;
  tree.push(obj);

  id++;

  for (var j = 0; j < childrenCount; j++, id++) {
    cobj = {};
    cobj.id = id;
    cobj.firstName = 'Child ' + id;
    cobj.lastName = 'Last ' + id;
    cobj.employeeId = Math.floor(Math.random() * 10000);
    cobj.level = 1;
    cobj.parentId = obj.id;
    tree.push(cobj);
  }
}

console.dir(tree);