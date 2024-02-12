import axios from "axios";
import { showAlert } from "./alerts";
const apiKey =
  'AAPK230f287ff34f4ae98c4e25156974beecQc2GJp-T-xco87SgkSAT10-Z3RZdpAXI1fzSJqkC9FMtCZWbKWMjCsZ-MlSDKG4i';

const basemapEnum = 'arcgis/streets';

export const displayMap = (locations) => {
  console.log(L)
  const map = L.map('map', {
    scrollWheelZoom: false,
    minZoom: 2,
  });
  const bounds = L.latLngBounds();
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  locations.forEach((loc) => {
    console.log('tes');
    L.marker([loc.coordinates[1], loc.coordinates[0]]).addTo(map);
    bounds.extend([loc.coordinates[1], loc.coordinates[0]]);
  });
  map.fitBounds(bounds).zoomOut(2);
};

export const searchMap = (id, placeholderText) => {
  console.log(id);
  const map = L.map(id, {
    center: [0, 0],
    zoom: 0,
    zoomControl: false,
  });
  const searchControl = L.esri.Geocoding.geosearch({
    expanded: true,
    collapseAfterResult: false,
    position: 'topright',
    placeholder: placeholderText,
    useMapBounds: false,
    providers: [
      L.esri.Geocoding.arcgisOnlineProvider({
        apikey: apiKey,
        nearby: {
          lat: -33.8688,
          lng: 151.2093,
        },
      }),
    ],
    zoomToResult: false,
  }).addTo(map);
  // L.esri.Geocoding.suggest()
  //   .apikey(
  //     'AAPK230f287ff34f4ae98c4e25156974beecQc2GJp-T-xco87SgkSAT10-Z3RZdpAXI1fzSJqkC9FMtCZWbKWMjCsZ-MlSDKG4i'
  //   )
  //   .text('trea')
  //   .nearby([45, -121], 5000)
  //   .run(function (error, response) {
  //     /* response syntax is documented here:
  //   https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm#ESRI_SECTION1_FC3884A45AD24E62BD11C9888F1392DB
  //   */
  //     console.log(response);
  //     console.log(error);
  //   });
  return searchControl;
};


export const updateMapSettings = async (data, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      data,
      url: `http://127.0.0.1:3000/api/v1/tours/${id}`
    })
    if (res.data.status == 'success') {
      showAlert('success', 'data changed');
      window.setTimeout(() => {
        location.assign("/")
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.data.message)
  }
}