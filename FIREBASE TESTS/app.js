(function(){

const config = {
    apiKey: "AIzaSyCqkzOS8R5k6y6NZ3YKdQdj14iMO7Uvkq8",
    authDomain: "wcs-puissance-4.firebaseapp.com",
    databaseURL: "https://wcs-puissance-4.firebaseio.com",
    projectId: "wcs-puissance-4",
    storageBucket: "wcs-puissance-4.appspot.com",
    messagingSenderId: "899774202606"
  };
  firebase.initializeApp(config);


const preObject = document.getElementById('object');

const dbRefObject = firebase.database().ref().child('object');

dbRefObject.on('value', snap => console.log(snap.val()));


}());