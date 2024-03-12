import React from "react";
import "./App.css";
import { PageRoutes } from "./routes/PageRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <PageRoutes />
    </LocalizationProvider>
  );
}

export default App;
