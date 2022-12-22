
 document.getElementById("rating-form").addEventListener("submit", submitRating);

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

const database = firebase.database();

async function displayJoke() {
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist');
  const joke = await response.json();

  // Remove special characters from joke name
  const jokeName = joke.name.replace(/[^\w\s]/gi, '');

  // Display joke
  const jokeContainer = document.querySelector('#joke-container');
  jokeContainer.innerHTML = `<p>${joke.joke}</p>`;

  // Store joke in database
  database.ref(`jokes/${jokeName}`).set({
    joke: joke.joke
  });
}

displayJoke();

async function submitRating(event) {
  event.preventDefault();

  // Get joke name and rating from form
  const form = event.target;
  const jokeName = form.elements.jokeName.value.replace(/[^\w\s]/gi, '');
  const rating = form.elements.rating.value;

  // Store rating in database
  const ratingsRef = database.ref(`jokes/${jokeName}/ratings`);
  ratingsRef.push({
    rating
  });
}

async function getAverageRating(jokeName) {
  // Get all ratings for the joke from the database
  const ratingsRef = database.ref(`jokes/${jokeName}/ratings`);
  const snapshot = await ratingsRef.once('value');
  const ratings = snapshot.val();

  // Calculate average rating
  let sum = 0;
  let count = 0;
  for (const key in ratings) {
    sum += ratings[key].rating;
    count++;
  }
  const averageRating = sum / count;

  return averageRating;
}

async function displayAverageRating() {
  // Get joke name from page
  const jokeContainer = document.querySelector('#joke-container');
  const jokeHtml = jokeContainer.innerHTML;
  const jokeName = jokeHtml.replace(/<\/?[^>]+(>|$)/g, '').replace(/[^\w\s]/gi, '');

  // Get average rating for joke from database
  const averageRating = await getAverageRating(jokeName);

  // Display average rating on page
  const averageRatingContainer = document.querySelector('#average-rating-container');
  averageRatingContainer.innerHTML = `<p>Average Rating: ${averageRating}</p>`;
}

displayAverageRating();

document.querySelector('#rating-form').addEventListener('submit', submitRating);


    // JavaScript function to copy the joke to the clipboard
    function copyJoke() {
      // Get the joke text
      const joke = document.getElementById("joke-container").innerText;

      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = joke;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Copy the text to the clipboard
      document.execCommand("copy");

      // Remove the textarea element
      document.body.removeChild(textarea);
    }

      function saveMeme() {
        // Get the URL of the current meme
        var currentMemeUrl = document.getElementById("joke-container").innerText;
        // Get the saved memes from local storage
        var savedMemes = JSON.parse(localStorage.getItem("jokes")) || [];
        // Add the current meme to the list of saved memes
        savedMemes.push(currentMemeUrl);
        // Store the updated list of saved memes in local storage
        localStorage.setItem("jokes", JSON.stringify(savedMemes));
      }

      function warnAndSendJoke() {
  console.warn("%cDo not paste anything into the console because it can potentially harm your computer or steal your information!", "color: red; font-size: larger;");

  // Get a joke from the joke API
  fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist")
    .then(response => response.json())
    .then(data => {
      // Check if the API response includes a joke
      if (data.joke) {
        // Display the joke in the console
        console.log("%c" + data.joke, "color: green; font-size: larger;");

        // Display a message saying that ChatGPT made this website with some styling
        console.log("%cMade by ChatGPT", "color: blue; font-size: smaller; font-style: italic; text-decoration: underline;");
      } else {
        // Display an error message in the console
        console.error("Unable to get joke.");
      }
    })
    .catch(error => {
      // Display an error message in the console
      console.error("An error occurred while fetching the joke: " + error);
    });
}
