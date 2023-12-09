import { showAlert } from './alerts';
import { login, logout } from './login.mjs';
import { redirectToCheckout } from './stripe';
import { updateUserData } from './updateSettings.';
import axios from 'axios';
const loginForm = document.querySelector('.login-form');
const booking = document.getElementById('book-tour');
const logOutBtn = document.querySelector('.nav__el--logout');
const userForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-password');
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

if (userForm) {
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const photo = document.getElementById('photo').files[0];
    console.log(document.getElementById('photo'));
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('photo', photo);

    await updateUserData('data', formData);
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateUserData('password', {
      currentPassword,
      password,
      passwordConfirm,
    });
  });
}

logOutBtn.addEventListener('click', async (e) => {
  await logout();
});
