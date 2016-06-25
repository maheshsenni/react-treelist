import React from 'react';
import {render} from 'react-dom';
import TreeGrid from './js/TreeGrid';

import {DATA} from './sample-data/tree-data-nested';

const COLUMNS = [{
  title: 'ID',
  field: 'key',
  width: 100
}, {
  title: 'First Name',
  field: 'firstName'
}, {
  title: 'Last Name',
  field: 'lastName'
}, {
  title: 'Employee ID',
  field: 'employeeId'
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