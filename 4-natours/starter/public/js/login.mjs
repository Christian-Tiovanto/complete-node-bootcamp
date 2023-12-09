import axios from 'axios';
import { showAlert, hideAlert } from './alerts';

export const login = async (email, password) => {
  await axios({
    method: 'POST',
    url: '/api/v1/users/login',
    data: {
      email,
      password,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.data.status == 'success') {
        showAlert('success', 'successfully logged in');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    })
    .catch((err) => {
      showAlert('error', err.response.data.message);
    });
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status == 'success') {
      showAlert('success', 'successfully logged out');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.data.message);
  }
};
