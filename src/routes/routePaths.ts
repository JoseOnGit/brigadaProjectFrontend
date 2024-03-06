const getHomeRoutePath = () => {
  return "/";
};

const getLoginRoutePath = () => {
  return "/login";
};

const getRegistrationRoutePath = () => {
  return "/registration";
};

const getRegistrationSuccessRoutePath = () => {
  return "/registration/success";
};

const getProfileRoutePath = () => {
  return "/profile";
};

const getEditProfileRoutePath = (id: number) => {
  return `/employee/edit/${id}`;
};

const getDashboardRoutePath = () => {
  return `/dashboard`;
};

export {
  getHomeRoutePath,
  getLoginRoutePath,
  getRegistrationRoutePath,
  getRegistrationSuccessRoutePath,
  getProfileRoutePath,
  getEditProfileRoutePath,
  getDashboardRoutePath,
};
