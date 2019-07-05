import axios from 'axios';

import { API_URL } from './constants';

// Auto auth
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token; // eslint-disable-line
}

export default ({
  postAuth: auth =>
    axios.post(`${API_URL}/api/user/login`, { user: auth }),

  getLogout: t =>
    axios.get(`${API_URL}/api/user/logout`, { headers: { Authorization: `Token ${t}` } }),

  getTest: () =>
    axios.get(`${API_URL}/test`),
});
