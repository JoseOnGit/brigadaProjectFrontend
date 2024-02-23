import React from "react";
import "./App.css";
import { PageRoutes } from "./routes/PageRoutes";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <PageRoutes />
    </AuthProvider>
  );
}

export default App;
