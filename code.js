
    // Initialize Firebase
const firebaseConfig = {
 apiKey: "AIzaSyD9J8Zo7shjTli5RRIMZXt-ffkr_yPZB6s",
  authDomain: "database-4968f.firebaseapp.com",
  databaseURL: "https://database-4968f-default-rtdb.firebaseio.com",
  projectId: "database-4968f",
  storageBucket: "database-4968f.appspot.com",
  messagingSenderId: "165048515702",
  appId: "1:165048515702:web:1ff5d368bc00ae5a817357"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Set up the database reference for storing and retrieving joke ratings
const jokesRef = database.ref("jokes");

async function getJoke() {
  // Get a joke from the API
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist');
  const joke = await response.json();

  // Display the joke
  displayJoke(joke);
}



const form = document.getElementById('rating-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const rating = form.elements.rating.value;
  const joke = document.getElementById('joke-container').innerText;

  const jokeKey = joke.replace(/[^a-zA-Z0-9]/g, '');

  const ratingsRef = firebase.database().ref(`jokes/${jokeKey}/ratings`);
  const snapshot = await ratingsRef.once('value');
  const ratings = snapshot.val() || [];
  ratings.push(rating);

  await ratingsRef.set(ratings);

  displayAverageRating(jokeKey);
});

