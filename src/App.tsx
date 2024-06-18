import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [state, setState] = useState<any>('');

  useEffect(() => {
    axios.get('http://localhost:3030').then(response => {
      setState(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

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
        <div>
          {state}
        </div>
      </header>
    </div>
  );
}

export default App;
