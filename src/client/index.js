import React from 'react';
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

const App = () => (
  <div>
    <Helmet>
      <title>First Page</title>
    </Helmet>
    <div>
      THIS IS IN APP!!!
    </div>
  </div>
);


ReactDOM.render(<App />, document.querySelector('#app-root'))