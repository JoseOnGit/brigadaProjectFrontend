import React from "react";
import "./App.css";
import { PageRoutes } from "./routes/PageRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/cs";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
        <PageRoutes />
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
