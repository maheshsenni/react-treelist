import React from 'react';
import TreeList from '../lib';

const { DATA, COLUMNS, OPTIONS } = window.TreeListOptions;

const App = () => (
  <TreeList
    data={DATA}
    columns={COLUMNS}
    options={OPTIONS}
    id={'id'}
    parentId={'parentId'}></TreeList>
);

export default App;
