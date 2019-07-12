import axios from 'axios';

import { API_URL } from './constants';

export default ({

  // Auth

  postAuth: user =>
    axios.post(`${API_URL}/api/user/login`, { user }),

  postVerifyEmail: usermail =>
    axios.post(`${API_URL}/api/user/send-verify-email`, { usermail }),

  postRemindPassword: usermail =>
    axios.post(`${API_URL}/api/user/remind`, { usermail }),

  postNewPassword: user =>
    axios.post(`${API_URL}/api/user/password`, { user }),

  getLogout: () =>
    axios.get(`${API_URL}/api/user/logout`),

  // User

  getUserProfile: () =>
    axios.get(`${API_URL}/api/user/profile`),

  // Test

  getTest: () =>
    axios.get(`${API_URL}/test`),
});
