var args = process.argv.splice(2);

var parentsCount = parseInt(args[0]);
var childrenCount = parseInt(args[1]);
var children2Count = parseInt(args[2]);

if (!parentsCount || !childrenCount || !children2Count) {
  // parent count and children count are required
  console.error('Parent count and children count are required');
  process.exit(1);
}

var prepareData = function(a, b, c) {
  var data = [];
  var tempObj1, tempObj2, tempObj3;
  var count = 0;
  var parentId1, parentId2;
  for (var i = 0; i < a; i++) {
    tempObj1 = {
      id: count++,
      firstName: 'Parent ' + i,
      lastName: 'Level 1',
      joinedOn: new Date().getTime()
      // employeeId: Math.ceil(Math.random() * 10000)
    };
    parentId1 = tempObj1.id;
    data.push(tempObj1);
    for (var j = 0; j < b; j++) {
      tempObj2 = {
        id: count++,
        firstName: 'Child ' + j,
        lastName: 'Parent ' + i,
        employeeId: Math.ceil(Math.random() * 10000),
        parentId: parentId1,
        joinedOn: new Date().getTime()
      };
      parentId2 = tempObj2.id;
      data.push(tempObj2);
      for (var k = 0; k < c; k++) {
        tempObj3 = {
          id: count++,
          firstName: 'Nested ' + k,
          lastName: 'Child ' + j,
          employeeId: Math.ceil(Math.random() * 10000),
          parentId: parentId2,
          joinedOn: new Date().getTime()
        };
        data.push(tempObj3);
      }
    }
  }
  console.info('Generated ' + data.length + ' records...');
  return data;
};

var tree = prepareData(parentsCount, childrenCount, children2Count);

// var id = 0, obj, cobj;
// for (var i = 0; i < parentsCount; i++, id++) {
//   obj = {};
//   obj.id = id;
//   obj.firstName = 'Parent ' + id;
//   obj.lastName = 'Name ' + id;
//   obj.employeeId = Math.floor(Math.random() * 10000);
//   obj.level = 0;
//   tree.push(obj);

//   id++;

//   for (var j = 0; j < childrenCount; j++, id++) {
//     cobj = {};
//     cobj.id = id;
//     cobj.firstName = 'Child ' + id;
//     cobj.lastName = 'Last ' + id;
//     cobj.employeeId = Math.floor(Math.random() * 10000);
//     cobj.level = 1;
//     cobj.parentId = obj.id;
//     tree.push(cobj);
//   }
// }

console.dir(tree);