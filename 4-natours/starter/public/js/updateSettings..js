import axios from 'axios';
import { showAlert } from './alerts';
export const updateUserData = async (type, data) => {
  try {
    const res = await axios({
      method: 'POST',
      data,
      url:
        type == 'password'
          ? 'http://127.0.0.1:3000/api/v1/users/updatePassword'
          : 'http://127.0.0.1:3000/api/v1/users/updateMe',
    });
    if (res.data.status == 'success') {
      showAlert('success', 'data changed');
      window.setTimeout(() => {
        if (type != 'password') {
          location.assign('/me');
        } else {
          location.assign('/');
        }
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.data.message);
  }
};
