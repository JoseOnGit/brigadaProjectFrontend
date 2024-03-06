import { SuccesPageTypes } from "../pages/SuccessPage";

const getLoginRoutePath = () => {
  return "/login";
};

const getRegistrationRoutePath = () => {
  return "/registration";
};

const getSuccessRoutePath = (type: SuccesPageTypes) => {
  return `/success/${type}`;
};

const getDashboardRoutePath = () => {
  return `/dashboard`;
};

const getProfileRoutePath = () => {
  return "/profile";
};

export {
  getLoginRoutePath,
  getRegistrationRoutePath,
  getSuccessRoutePath,
  getProfileRoutePath,
  getDashboardRoutePath,
};
