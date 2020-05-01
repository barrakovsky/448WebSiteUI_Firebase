var firebaseConfig = {
  apiKey: "AIzaSyAPKwQdL29DOYQVetgww3fpNQK13M9SEyE",
  authDomain: "cargslist-b3dd3.firebaseapp.com",
  databaseURL: "https://cargslist-b3dd3.firebaseio.com",
  projectId: "cargslist-b3dd3",
  storageBucket: "cargslist-b3dd3.appspot.com",
  messagingSenderId: "730125733569",
  appId: "1:730125733569:web:015d3aca6c912d53844e40",
  measurementId: "G-8SJVRR7KDD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


//
// function writeCarsData(make, type, model, year, price, mileage, exteriorColor) {
//   firebase.database().ref('Cars/').set({
//   make: make,
//   type: type,
//   model: model,
//   year: year,
//   price: price,
//   mileage: mileage,
//   exteriorColor: exteriorColor
//   });
// }

var db = firebase.firestore();

function writeToFirestore(data) {
  var collection = firebase.firestore().collection('Cars');
  return collection.add(data);
};

const list_div = document.querySelector("#list_div");

db.collection("Cars").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      list_div.innerHTML += "<div class='card' style='width: 18rem;'><img class='card-img-top'' src='..' alt='Card image cap'><div class='card-body><p class='card-text'>" + doc.data().make + "</p></div></div>"

    });
});


// data1 = {
//   make: "Nisan",
//   type: "Crossovers",
//   model: "Rogue Krom",
//   year: "2010",
//   price: 11599,
//   mileage: 78000,
//   exteriorColor:  "Red"
// }
//
// data2 = {
//   make: "BMW",
//   type: "Convertibles",
//   model: "650 I",
//   year: "2015",
//   price: 37998,
//   mileage: 40000,
//   exteriorColor:  "Black"
// }
//
// data3 = {
//   make: "BMW",
//   type: "Convertibles",
//   model: "328 I",
//   year: "2011",
//   price: 16998,
//   mileage: 38000,
//   exteriorColor:  "White"
// }
//
// data4 = {
//   make: "Mercedes-Benz",
//   type: "Convertibles",
//   model: "E350",
//   year: "2012",
//   price: 22998,
//   mileage: 37000,
//   exteriorColor:  "Red"
// }
//
// data5 = {
//   make: "Volkswagen",
//   type: "Convertibles",
//   model: "Beetle S",
//   year: "2018",
//   price: 18998,
//   mileage: 35000,
//   exteriorColor:  "White"
// }
//
// data6 = {
//   make: "Chevrolet",
//   type: "Crossovers",
//   model: "Equinox LT",
//   year: "2018",
//   price: 16998,
//   mileage: 46000,
//   exteriorColor:  "Black"
// }
//
//
// data7 = {
//   make: "Ford",
//   type: "Crossovers",
//   model: "Escape S",
//   year: "2016",
//   price: 14599,
//   mileage: 42000,
//   exteriorColor:  "Grey"
// }
//
//
// data8 = {
//   make: "Audi",
//   type: "Coupes",
//   model: "A5 Premium Plus",
//   year: "2012",
//   price: 18998,
//   mileage: 42000,
//   exteriorColor:  "Grey"
// }
//
// data9 = {
//   make: "Mini Cooper",
//   type: "Coupes",
//   model: "Clubman",
//   year: "2012",
//   price: 10599,
//   mileage: 86000,
//   exteriorColor:  "Grey"
// }
//
// data10 = {
//   make: "Fiat",
//   type: "Coupes",
//   model: "500 Easy",
//   year: "2016",
//   price: 10599,
//   mileage: 34000,
//   exteriorColor:  "Grey"
// }
//
//
//
//
//
// writeToFirestore(data3);
// writeToFirestore(data4);
// writeToFirestore(data5);
// writeToFirestore(data6);
// writeToFirestore(data7);
// writeToFirestore(data8);
// writeToFirestore(data9);
// writeToFirestore(data10);


// writeCarsData("Nisan", "Crossovers", "Rogue Krom", "2010", 11599, 78000, "Red");
