var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/109445?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var movieName = document.querySelector(".movie-name")
var characterSelection = document.getElementById("character-select")
var characterSelectionSub = document.querySelector(".character-select")
var movieInfo = document.querySelector(".movie-info")
var movieImage = "https://image.tmdb.org/t/p/w500/"
var textInput = document.querySelector('.text-input');
var searchHistoryBtnEl = document.querySelector('#search-history-buttons');
var characterlist = [];
var movielist = [];

renderStorage()

// addign data to local storage
function saveToStorage(value) {
  var searchHistoryArray = JSON.parse(localStorage.getItem('characters')) || []
  if (searchHistoryArray.includes(value)) {
      return
  }
  searchHistoryArray.push(value);
  localStorage.setItem('characters', JSON.stringify(searchHistoryArray))
}

function renderStorage() {
  var searchHistoryArray = JSON.parse(localStorage.getItem('characters')) || []
  if (searchHistoryArray.length === 0) {
      return
  }
  // searchHistoryBtnEl.innerHTML = ""
  console.log("Rendering storage")
  for (let i = 0; i < searchHistoryArray.length; i++) {
      console.log(searchHistoryArray[i])
      // var searchHistoryBtnEl = document.querySelector('#search-history-buttons');
      var searchHistoryBtn = document.createElement("button");
      searchHistoryBtn.textContent = searchHistoryArray[i]
      searchHistoryBtnEl.appendChild(searchHistoryBtn)
  }
}

searchHistoryBtnEl.addEventListener("click", function (event) {
  console.log("Good");
  var searchHistoryBtnValue = (event.target.textContent)
  console.log(searchHistoryBtnValue);
  var searchHistoryFetch = 'https://api.disneyapi.dev/character?name=' + searchHistoryBtnValue;
  fetch(searchHistoryFetch)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          console.log(data);

          // loop based on # of films for selected character
          for (var i = 0; i < data.data[0].films.length; i++) {

              //create element and populate film(s)
              var characterFilm = document.createElement("h3");
              characterFilm.textContent = data.data[0].films[i]

              //append text to character selection section in index
              characterFilmSection.append(characterFilm);

          }
      })
}

);


function evaluateInput(event) {
    characterFilmSection.textContent = "";
    event.preventDefault()

    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;
    saveToStorage(characterVal);
   
//fetch disney api
    fetch(characterFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // loop based on # of films for selected character
            for (var i = 0; i < data.data[0].films.length; i++) {

//create element and populate film(s)        
            var characterFilm = document.createElement("button");
            characterFilm.classList.add("button")
            characterFilm.classList.add("is-primary")
            characterFilm.classList.add("button-size-large")
            characterFilm.classList.add("button-color-purple") 
            characterFilm.textContent = data.data[0].films[i]

//append text to character selection section in index
            characterFilmSection.append(characterFilm);
            textInput.reset()
         }
        })
}

function getReviewApi() {
    fetch(reviewApi)
    .then(function(response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
// fetch movie title and append to index
            var movieTitle = document.createElement("p");
            movieTitle.classList.add("title")
            movieTitle.textContent = data.title
            movieName.append(movieTitle);

// fetch movie info and append to index
var imgPull = document.createElement("img");
    imgPull.setAttribute("src", movieImage + data.backdrop_path);
    movieInfo.append(imgPull);

// fetch movie info and append to index
var movieInfoPull = document.createElement("p");
movieInfoPull.setAttribute("style", "font-size: 14px")
    movieInfoPull.textContent = data.release_date + " | " + data.runtime + " min" + " | " + data.genres[0].name
    movieInfo.append(movieInfoPull);
        
// fetch movie rating and append to index
var movieInfoPull = document.createElement("p");
    movieInfoPull.textContent = "Rating: " + data.vote_average
    movieInfo.append(movieInfoPull);

// fetch movie overview and append to index
var movieInfoPull = document.createElement("p");
    movieInfoPull.textContent = data.overview
    movieInfoPull.setAttribute("style", "font-size: 14px")
    movieInfo.append(movieInfoPull);
  })
})
}


// introduction modal with instructions on how to use the app
document.addEventListener('DOMContentLoaded', () => {
    
    function openModal($el) {
      $el.classList.add("is-active");
    }
  
    function closeModal($el) {
      $el.classList.remove("is-active");
    }
  
    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

  (document.querySelectorAll(".modal") || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

    document.addEventListener("keydown", (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });


//the function that will fetch data to show in display section
//grabs number of films, first appearance and name
//appends all of the above
function characterDisplay() {
    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;

    fetch(characterFetch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        //looping over to count the number of films
        for (var i = 0; i < data.data[0].films.length; i++) {
            //this counts the films and allows us to use i as a counter
            var numFilms = data.data[0].films[i];
        }
        console.log(characterVal);

        //apends the character input to the character selection
        var characterName = document.createElement('h3');
        characterName.textContent = characterVal;
        characterSelection.append(characterName);

        //apends the number of films to the page by using the for loop element i.
        //in the for loop i is the equivalent to number of films
        var numFilms = document.createElement('li');
        numFilms.textContent = 'Number of films appeared in: ' + i;
        characterSelection.append(numFilms);


        //order date of film by descending - mostly likely through a search parameter property
        //pull first item in data index
        //list the data from that film
        //apend data of the film to list
        //pull disney film title
        //pull title from review api
        //for title === title display release date
        var firstFilm = document.createElement('li');
        firstFilm.textContent = 
        characterSelection.append(firstFilm);

        //retreive image from first data index
        //apend image in an image tag
    })
}

textInput.addEventListener('submit', evaluateInput);
textInput.addEventListener('submit', characterDisplay);
textInput.addEventListener('submit', evaluateInput);
textInput.addEventListener('submit', renderStorage);


getReviewApi();
