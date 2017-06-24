import React from 'react';

import Leftside from "./common/leftPanel";
import { HashRouter, Switch, Route, match } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {

    return <div>
      <div className="row">
        <Leftside />
      </div>
      {this.props.children}
    </div>;

  }
}


export default App;