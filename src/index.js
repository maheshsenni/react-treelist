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
    return 'EMPID' + value;
  }
}, {
  title: 'Joined on',
  field: 'joinedOn',
  type: 'date',
  format: 'dd/mm/yyyy'
}];

const OPTIONS = {
  minimumColWidth: 100
};

class App extends React.Component {
  render () {
    return (
      <div className='wrapper'>
        <TreeGrid
          data={DATA}
          columns={COLUMNS}
          options={OPTIONS}
          id={'key'}
          parentId={'parentKey'}></TreeGrid>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));