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
const manageTourForm = document.querySelector('.form-edit-tour');
const mapContainer = document.getElementById('map-container');

const handleSearchResults = (searchResults, coordinates, index) => {
  searchResults.on('results', (data) => {
    const searchPlaceholder = document.getElementsByClassName('geocoder-control-input')[index];
    coordinates[index] = data.latlng;
    searchPlaceholder.value = data.text;
  });
};

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

if (manageTourForm) {
  const coordinates = [];
  manageTourForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tourName = document.getElementById('name');
    const tourSummary = document.getElementById('summary');
    const tourDesc = document.getElementById('desc');
    const tourPrice = document.getElementById('price');
    const tourDuration = document.getElementById('duration');
    const tourGroupSize = document.getElementById('group-size');
    const tourDifficulty = document.getElementById('difficulty');
  });
  if (mapContainer) {
    let mapIdCounter = 4;
    let mapZIndexCounter = 15;
    // Loop through the mapContainer Children that has an id that start with searchMap, and initialize the leaflet map inside it
    for (let i = 0; i < mapContainer.children.length; i++) {
      if (mapContainer.children[i].id.startsWith('searchMap')) {
        const searchResults = searchMap(`${mapContainer.children[i].id}`, `Location No ${i + 1}`);
        handleSearchResults(searchResults, coordinates, i)
      }
    }
    // Implementing add button, if a tour have more than 3 places
    const addButton = document.getElementById('addMap');
    addButton.addEventListener('click', (e) => {
      e.preventDefault();

      const searchContainer = document.createElement('div');
      searchContainer.id = `searchMap${mapIdCounter}`;
      searchContainer.className = 'form__label';
      searchContainer.style.position = 'relative';
      searchContainer.setAttribute('required', true);
      searchContainer.style.zIndex = `${mapZIndexCounter}`;
      mapContainer.insertBefore(
        searchContainer,
        mapContainer.children[mapIdCounter - 1]
      );
      let searchResults = searchMap(`searchMap${mapIdCounter}`, `Location no ${mapIdCounter}`);
      handleSearchResults(searchResults, coordinates, mapIdCounter - 1)
      mapIdCounter++;
      mapZIndexCounter--;
    });
    // if (searchMapContainer) {
    //   const searchResults = searchMap('searchMap');
    //   const searchResults2 = searchMap('searchMap2');
    //   const searchResults3 = searchMap('searchMap3');
    //   searchResults.on('results', (data) => {
    //     console.log(data);
    //     searchPlaceholder.value = data.text;
    //   });

    // Jika ingin menggunakan UI sendiri, maka gunakan SDK dibawah ini
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
  // }
  // }
}
if (booking) {
  booking.addEventListener('click', (e) => {
    redirectToCheckout(e.target.dataset.tourid);
  });
}

if (userForm) {
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const photo = document.getElementById('photo').files[0];
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
