import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DAO} from './utils/DAO' ;

function App() {

  const d = new DAO();
  d.save({id:1, name:'OMAAAGAAA'})
  d.save({name:'OMAAAGAAA3'})
  d.save({id:1, name:'OMAAAGAAA26'})
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
