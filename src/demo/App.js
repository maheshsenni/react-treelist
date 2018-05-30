import React from 'react';
import TreeList from '../lib';

import { DATA } from '../sample-data/tree-data-nested';

const COLUMNS = [{
  title: 'ID',
  field: 'id',
  type: 'number',
  width: 100
}, {
  title: 'First Name',
  field: 'firstName',
  type: 'string',
  expand: true,
}, {
  title: 'Last Name',
  field: 'lastName',
  type: 'string'
}, {
  title: 'Employee ID',
  field: 'employeeId',
  type: 'number',
  class: 'red',
  formatter: function(value) {
    if (value) {
      return 'EMPID' + value;
    }
  }
}, {
  title: 'Joined on',
  field: 'joinedOn',
  type: 'date',
  format: 'dd/mm/yyyy'
}];

const OPTIONS = {
  height: 350,
  minimumColWidth: 100,
  expandAll: true
};

let counter = 1;

class App extends React.Component {
  constructor() {
    super();
    this.rerender = this.rerender.bind(this);
  }

  rerender() {
    DATA[0].firstName = 'Updated ' + counter++;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button onClick={this.rerender}>Update</button>
        <TreeList
          data={DATA}
          columns={COLUMNS}
          options={OPTIONS}
          id={'id'}
          parentId={'parentId'}></TreeList>
      </div>
    );
  }
}

export default App;
