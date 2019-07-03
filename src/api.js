import axios from 'axios';

import { API_URL } from './constants';

export default ({
  postAuth: auth =>
    axios.post(`${API_URL}/api/user/login`, { user: auth }),

  getTest: () =>
    axios.get(`${API_URL}/test`),
});
