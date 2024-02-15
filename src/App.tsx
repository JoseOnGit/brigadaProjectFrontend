import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllStoresApiCall } from "./api/apiCalls";
import { PageRoutes } from "./routes/PageRoutes";

function App() {
  const [stores, setStores] = useState();
  console.log("%c⧭ stores ", "color: #00e600", stores);

  useEffect(() => {
    getAllStoresApiCall(setStores);
  }, []);

  return (
    <div className="App">
      <PageRoutes />
    </div>
  );
}

export default App;
