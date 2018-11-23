import React from 'react';
import TreeList from '../lib';

const { DATA, COLUMNS, OPTIONS, HANDLERS } = window.TreeListOptions;

const App = () => (
  <TreeList
    data={DATA}
    columns={COLUMNS}
    options={OPTIONS}
    handlers={HANDLERS}
    id={'id'}
    parentId={'parentId'}></TreeList>
);

export default App;
