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
