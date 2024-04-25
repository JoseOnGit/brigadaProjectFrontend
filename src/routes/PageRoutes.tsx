import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { EditProfilePage } from "../pages/EditProfilePage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { SuccessPage } from "../pages/SuccessPage";
import { CalendarPage } from "../pages/CalendarPage";
import { PickedDayPage } from "../pages/PickedDayPage";
import { PickedDaysConfirmPage } from "../pages/PickedDaysConfirmPage";

const routes = [
  {
    path: "/",
    page: <Navigate to="/login" />,
  },
  {
    path: "/login",
    page: <LoginPage />,
  },
  {
    path: "/registration",
    page: <RegistrationPage />,
  },
  {
    path: "/success/:type",
    page: <SuccessPage />,
  },
  {
    path: "/dashboard",
    page: <DashboardPage />,
  },
  {
    path: "/profile",
    page: <EditProfilePage />,
  },
  {
    path: "/calendar",
    page: <CalendarPage />,
  },
  {
    path: "/calendar/request/:date",
    page: <PickedDayPage />,
  },
  {
    path: "/calendar/request/all",
    page: <PickedDaysConfirmPage />,
  },
];

const PageRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageWrapper />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.page} />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);

export { PageRoutes };
