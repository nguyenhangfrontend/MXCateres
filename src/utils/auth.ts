// Helper function to store OAuth 2 Cookie
// import bcrypt from 'bcryptjs'
import { unSubcribeSocket } from '@/socket/SocketClient';

import Cookies from 'js-cookie';

const setCookieLocal = (name: string, value: string) => {
  Cookies.set(name, value, { path: '/' });
};

// Helper function to get cookie value from key
const getCookieLocal = (name: string) => {
  return Cookies.get(name);
};
const delete_cookie = (name: string) => {
  Cookies.remove(name);
};
const loggedOut = () => {
  delete_cookie('token');
  localStorage.removeItem('currentUser');
  const href = window.location.href.split('/');
  unSubcribeSocket();
  if (href[href.length - 1] !== 'signin') {
    window.location.href = '/signin';
  }
};

export { setCookieLocal, getCookieLocal, delete_cookie, loggedOut };
