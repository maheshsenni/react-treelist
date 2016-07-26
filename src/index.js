import React from 'react';
import {render} from 'react-dom';
import TreeGrid from './js/TreeGrid';

import {DATA} from './sample-data/tree-data-nested';

const COLUMNS = [{
  title: 'ID',
  field: 'key',
  type: 'number',
  width: 100
}, {
  title: 'First Name',
  field: 'firstName',
  type: 'string'
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
    return value + ' - x'
  }
}, {
  title: 'Joined on',
  field: 'joinedOn',
  type: 'date',
  format: 'dd/mm/yyyy'
}];

class App extends React.Component {
  render () {
    return (
      <TreeGrid
        data={DATA}
        columns={COLUMNS}
        id={'key'}
        parentId={'parentKey'}></TreeGrid>
    );
  }
}

render(<App/>, document.getElementById('app'));