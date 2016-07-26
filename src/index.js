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
  type: 'number'
}, {
  title: 'Joined on',
  field: 'joinedOn',
  type: 'date',
  format: 'mm/dd/yyyy'
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