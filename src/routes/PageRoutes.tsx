import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PageWrapper } from "../pages/PageWrapper";

type Props = {};

const routes = [
  {
    path: "/",
    page: <MainPage />,
  },
];

const PageRoutes: FC<Props> = () => (
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
