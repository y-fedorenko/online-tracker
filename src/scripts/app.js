'use strict';

const getMyLocationButton = document.querySelector('#btn-track');
const dialog = document.querySelector("#dialog-box");
const buttonX = document.querySelector(".btn-x");

mapboxgl.accessToken = 'pk.eyJ1IjoieWFyb3NsYXZmZWRvcmVua28iLCJhIjoiY2x1dTBjcTZ5MDRkbDJpcG85MDQzeDZmciJ9.qVQwJzOGk5_wi1vpYQv0SQ';
let myLatitude ;
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
  dialog.style.visibility = 'visible';
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, {enableHighAccuracy: true});
    setTimeout(() => {
      map.flyTo({
        center: [myLongitude, myLatitude],
        zoom: 18,
        essential: true
      });
    }, 300);
    setTimeout(() => {
      const marker = new mapboxgl.Marker({
        color: "#cc273a",
        draggable: false
      }).setLngLat([myLongitude, myLatitude])
        .addTo(map);
    }, 400);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function dialogClosed() {
  dialog.style.visibility = 'hidden';
  map.flyTo({
    zoom: 12, // starting zoom, makes user see some action is going on
    essential: true
  });
}

/* map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(
  new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
  }) , 'top-left'
); */

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
// Closes by pressing the Escape key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dialogClosed();
  }
});
//closes by clicking the x button
buttonX.addEventListener('click', dialogClosed);
//search button
getMyLocationButton.addEventListener('click', getClientLocation);


//setting some images in bulk
const products = document.querySelectorAll('.box');
window.addEventListener('load', () => {
  products.forEach((product, index) => {
    product.style.backgroundImage = `url("./src/media/products/p-${index + 1}.jpg")`;
  });
})