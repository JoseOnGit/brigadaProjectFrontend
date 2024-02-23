import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PageWrapper } from "../components/PageWrapper";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { ProfilePage } from "../pages/ProfilePage";

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
    page: <RegistrationPage />,
  },
  {
    path: "/employee/:id",
    page: <ProfilePage />,
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
