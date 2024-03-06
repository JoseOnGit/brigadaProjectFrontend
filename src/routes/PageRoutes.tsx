import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PageWrapper } from "../components/PageWrapper";
import { EditProfilePage } from "../pages/EditProfilePage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage2 } from "../pages/RegistrationPage2";
import { RegistrationSuccessPage } from "../pages/RegistrationSuccessPage";

const routes = [
  {
    path: "/",
    page: <MainPage />,
  },
  {
    path: "/login",
    page: <LoginPage />,
  },
  {
    path: "/registration",
    // page: <RegistrationPage />,
    page: <RegistrationPage2 />,
  },
  {
    path: "/registration/success",
    page: <RegistrationSuccessPage />,
  },
  {
    path: "/dashboard",
    page: <DashboardPage />,
  },
  {
    path: "/employee/edit/:id",
    page: <EditProfilePage />,
  },
  {
    path: "/stores/:id",
    page: <MainPage />,
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
