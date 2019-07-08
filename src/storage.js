import axios from 'axios';

// Auto auth
const t = localStorage.getItem('user-token');
if (t) {
  axios.defaults.headers.common['Authorization'] = t; // eslint-disable-line
}

export default ({

  // Auth

  setAuth: (token) => {
    localStorage.setItem('user-token', token);
    // eslint-disable-next-line dot-notation
    axios.defaults.headers.common['Authorization'] = token;
  },

  deleteAuth: () => {
    localStorage.removeItem('user-token');
    // eslint-disable-next-line dot-notation
    delete axios.defaults.headers.common['Authorization'];
  },

  // User

  setUserProfile: (responce) => {
    localStorage.setItem('user-id', responce.data.user.id);
    localStorage.setItem('user-mail', responce.data.user.usermail);
    localStorage.setItem('user-name', responce.data.user.username);
  },

  deleteUserProfile: () => {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-mail');
    localStorage.removeItem('user-name');
  },
});
