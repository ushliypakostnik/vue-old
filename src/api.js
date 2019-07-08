import axios from 'axios';

import { API_URL } from './constants';

export default ({

  // Auth

  postAuth: user =>
    axios.post(`${API_URL}/api/user/login`, { user }),

  getVerifyEmail: (usermail, token) =>
    axios.get(`${API_URL}/api/user/send-verify-email`, {
      user: { usermail },
      headers: { Authorization: `Token ${token}` },
    }),

  getLogout: token =>
    axios.get(`${API_URL}/api/user/logout`, {
      headers: { Authorization: `Token ${token}` },
    }),

  // User

  getUserProfile: token =>
    axios.get(`${API_URL}/api/user/profile`, {
      headers: { Authorization: `Token ${token}` },
    }),

  // Test

  getTest: () =>
    axios.get(`${API_URL}/test`),
});
