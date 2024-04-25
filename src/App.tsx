import React from "react";
import "./App.css";
import { PageRoutes } from "./routes/PageRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/cs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
      <PageRoutes />
    </LocalizationProvider>
  );
}

export default App;
