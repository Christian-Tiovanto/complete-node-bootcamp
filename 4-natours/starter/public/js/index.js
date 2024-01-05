import { showAlert } from './alerts';
import { login, logout } from './login.mjs';
import { redirectToCheckout } from './stripe';
import { updateUserData } from './updateSettings.';
import { displayMap, searchMap } from './map';
import axios from 'axios';
const loginForm = document.querySelector('.login-form');
const booking = document.getElementById('book-tour');
const logOutBtn = document.querySelector('.nav__el--logout');
const userForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-password');
const tourMapContainer = document.getElementById('map');
const searchMapContainer = document.getElementById('searchMap');
const mapContainer = document.getElementById('map-container');
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

if (mapContainer) {
  let idCounter = 4;
  const addButton = document.getElementById('addMap');
  console.log(mapContainer.children);
  addButton.addEventListener('click', () => {
    const searchContainer = document.createElement('div');
    console.log(searchContainer);
    searchContainer.id = `searchMap${idCounter}`;
    searchContainer.className = 'form__label';
    mapContainer.insertBefore(
      searchContainer,
      mapContainer.children[idCounter - 1]
    );
    let coba = searchMap(`searchMap${idCounter}`);
    coba.on('results', (data) => {
      console.log('eaaaa');
    });
    idCounter++;
  });
  if (searchMapContainer) {
    const searchResults = searchMap('searchMap');
    const searchResults2 = searchMap('searchMap2');
    const searchResults3 = searchMap('searchMap3');
    const searchPlaceholder = document.querySelector('.geocoder-control-input');
    searchResults.on('results', (data) => {
      console.log(data);
      searchPlaceholder.value = data.text;
    });
    // const inputSearch = document.querySelector('.geocoder-control-input');
    // inputSearch.addEventListener('input', (e) => {
    //   console.log(e.target.value);

    //   L.esri.Geocoding.suggest()
    //     .apikey(
    //       'AAPK230f287ff34f4ae98c4e25156974beecQc2GJp-T-xco87SgkSAT10-Z3RZdpAXI1fzSJqkC9FMtCZWbKWMjCsZ-MlSDKG4i'
    //     )
    //     .text(e.target.value)
    //     .nearby([45, -121], 5000)
    //     .run(function (error, response) {
    //       console.log(response);
    //     });
    // });
  }
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

if (tourMapContainer) {
  const locations = JSON.parse(mapContainer.dataset.locations);
  displayMap(locations);
}
logOutBtn.addEventListener('click', async (e) => {
  await logout();
});
