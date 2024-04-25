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

const getCalendarRoutePath = () => {
  return "/calendar";
};

const getTimePickRoutePath = (date: string) => {
  return `/calendar/request/${date}`;
};

const getPickedDaysRoutePath = () => {
  return "/calendar/request/all";
};

export {
  getLoginRoutePath,
  getRegistrationRoutePath,
  getSuccessRoutePath,
  getProfileRoutePath,
  getDashboardRoutePath,
  getCalendarRoutePath,
  getTimePickRoutePath,
  getPickedDaysRoutePath,
};
