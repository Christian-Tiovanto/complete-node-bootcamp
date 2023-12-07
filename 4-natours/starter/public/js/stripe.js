import { showAlert } from './alerts';

export const redirectToCheckout = async (tourId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign(`${res.data.session.url}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
