import React, { Component } from 'react';
import './App.css';
import './reset.css'
import Header from './component/Header/Header.jsx';
import routes from './routes.jsx';

class App extends Component {

  render() {
    return (
    <div>

      <div className="Header">
        <Header/>
      </div>

      <div className='content'>

        {routes}

      </div>

    </div>
    );
  }
}

export default App;
