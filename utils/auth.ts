export const getTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setTokenInStorage = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};
