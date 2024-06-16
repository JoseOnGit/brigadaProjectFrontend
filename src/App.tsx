import React from "react";
import "./App.css";
import { PageRoutes } from "./routes/PageRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/cs";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import socketio from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "./components/NotificationProvider";

// Socket.io to show notifications
export const socket = socketio("http://localhost:3001");

export function App() {
  return (
    <Provider store={store}>
      <NotificationProvider socket={socket}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          <PageRoutes />
        </LocalizationProvider>
        <ToastContainer />
      </NotificationProvider>
    </Provider>
  );
}
