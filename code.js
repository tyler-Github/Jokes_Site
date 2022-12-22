
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
  try {
    // Make a GET request to the API
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any", {
      params: {
        blacklistFlags: "religious,political,racist,sexist",
      },
    });

    // Extract the joke and its ID from the response
    const joke = response.data.joke;
    const jokeId = response.data.id;

    // Display the joke on the page
    const jokeContainer = document.getElementById("joke-container");
    jokeContainer.innerHTML = joke;

    // Store the joke ID in a hidden input field
    const jokeInput = document.getElementById("joke-input");
    jokeInput.value = jokeId;
  } catch (error) {
    console.error(error);
  }
}
