const getHomeRoutePath = () => {
  return "/";
};

const getLoginRoutePath = () => {
  return "/login";
};

const getRegistrationRoutePath = () => {
  return "/registration";
};

const getProfileRoutePath = (id: number) => {
  return `/employee/${id}`;
};

export {
  getHomeRoutePath,
  getLoginRoutePath,
  getRegistrationRoutePath,
  getProfileRoutePath,
};
