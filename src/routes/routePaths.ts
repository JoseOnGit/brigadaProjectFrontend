import { SuccesPageTypes } from "../types/commonTypes";

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

const getPickedDayRoutePath = (date: string) => {
  return `/calendar/request/${date}`;
};

const getPickedDaysConfirmRoutePath = () => {
  return "/calendar/request/all";
};

export {
  getLoginRoutePath,
  getRegistrationRoutePath,
  getSuccessRoutePath,
  getProfileRoutePath,
  getDashboardRoutePath,
  getCalendarRoutePath,
  getPickedDayRoutePath,
  getPickedDaysConfirmRoutePath,
};
