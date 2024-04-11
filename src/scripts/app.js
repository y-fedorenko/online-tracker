'use strict';

const getMyLocationButton = document.querySelector('#btn-track');
const dialog = document.querySelector("#dialog-box");
const buttonX = document.querySelector(".btn-x");
const searchText = document.querySelector("input[type='text']");

mapboxgl.accessToken = 'pk.eyJ1IjoieWFyb3NsYXZmZWRvcmVua28iLCJhIjoiY2x1dTBjcTZ5MDRkbDJpcG85MDQzeDZmciJ9.qVQwJzOGk5_wi1vpYQv0SQ';
let myLatitude;
let myLongitude;

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [-100, 30], // starting position [lng, lat]
	zoom: 2, // starting zoom
});

function addMarker() {
  const marker = new mapboxgl.Marker({
    color: "#FFFFFF",
    draggable: false
  }).setLngLat([myLongitude, myLatitude])
    .addTo(map);
}

function getLocation(position) {
    let {latitude, longitude} = position.coords;
    myLatitude = latitude;
    myLongitude = longitude;
  }
  
  // The error case
function errorHandler() {
    console.log('Unable to retrieve your location');
  }
  
  function getClientLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getLocation(position);
        dialog.style.visibility = 'visible';
        map.flyTo({ center: [myLongitude, myLatitude], zoom: 17, essential: true });
        let myPosition = [myLongitude, myLatitude];
        let inputText = `<p> Your LociTag #${searchText.value} is here! </p>`;
        const marker = new mapboxgl.Marker({ color: "#cc273a", draggable: false }).setLngLat(myPosition).addTo(map);
        const popup = new mapboxgl.Popup({ offset: 50, closeOnClick: false, closeButton: true })
          .setHTML(inputText).setLngLat(myPosition).setMaxWidth(400).addTo(map);
        map.resize();
      }, errorHandler, { enableHighAccuracy: true });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  

function dialogClosed() {
  dialog.style.visibility = 'hidden';
  map.flyTo({
    zoom: 13, // starting zoom, makes user see some action is going on
    essential: true
  });
}

function addMarker(longitude, latitude) {
  let marker = new mapboxgl.Marker({
    color: "#860D0D",
    width: '10px',
    height: '10px',
    draggable: false
    }).setLngLat([longitude, latitude])
    .addTo(map);
}

//Event listeners 
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dialogClosed();
  }
});
buttonX.addEventListener('click', dialogClosed);
getMyLocationButton.addEventListener('click', getClientLocation);
window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, {enableHighAccuracy: true})
}});

//setting some images in bulk
const products = document.querySelectorAll('.box');
window.addEventListener('load', () => {
  products.forEach((product, index) => {
    product.style.backgroundImage = `url("./src/media/products/p-${index + 1}.jpg")`;
  });
})