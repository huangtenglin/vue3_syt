export const GET_TOKEN = () => {
  return localStorage.getItem('userInfo');
};

export const SET_TOKEN = (data: { [key: string]: any }) => {
  localStorage.setItem('userInfo', JSON.stringify(data));
};

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('userInfo');
};
