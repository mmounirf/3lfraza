export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const loginAction = (user) => {
  return {
    type: LOGIN,
    user
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT
  };
};

export const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories
  };
};