import React from 'react';
import {render} from 'react-dom';
import TreeGrid from './TreeGrid';

import {DATA} from './sample-data/reddit-all';


class App extends React.Component {
  render () {
    return <TreeGrid data={'DATA'}></TreeGrid>;
  }
}

render(<App/>, document.getElementById('app'));