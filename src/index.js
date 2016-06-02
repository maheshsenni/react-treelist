import React from 'react';
import {render} from 'react-dom';
import TreeGrid from './TreeGrid';

import {DATA} from './sample-data/reddit-all';

const OPTIONS = {
  columns: [{
    title: 'ID',
    field: 'id'
  }, {
    title: 'Subreddit',
    field: 'subreddit'
  }, {
    title: 'Author',
    field: 'author'
  }, {
    title: 'Title',
    field: 'title'
  }]
};

class App extends React.Component {
  render () {
    return <TreeGrid data={DATA} options={OPTIONS}></TreeGrid>;
  }
}

render(<App/>, document.getElementById('app'));