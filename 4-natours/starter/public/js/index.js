import { login } from './login.mjs';
import { redirectToCheckout } from './stripe';
const loginForm = document.querySelector('.login-form');
const booking = document.getElementById('book-tour');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email);
    console.log(password);
    login(email, password);
  });
}

if (booking) {
  booking.addEventListener('click', (e) => {
    console.log(e.target.dataset.tourid);
    redirectToCheckout(e.target.dataset.tourid);
  });
}
