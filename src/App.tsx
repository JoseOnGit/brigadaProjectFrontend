import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAllStoresApiCall } from "./api/apiCalls";

function App() {
  const [stores, setStores] = useState();
  console.log("%c⧭ stores ", "color: #00e600", stores);

  useEffect(() => {
    getAllStoresApiCall(setStores);
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
      </header>
    </div>
  );
}

export default App;
