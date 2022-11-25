var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/109445?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var movieName = document.querySelector(".movie-name")
var movieInfo = document.querySelector(".movie-info")
var movieImage = "https://image.tmdb.org/t/p/w500/"
var textInput = document.querySelector('.text-input');
var characterlist = [];
var movielist = [];

function evaluateInput(event) {
    characterFilmSection.textContent = "";
    event.preventDefault()

    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;
    console.log(characterVal);
   
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

textInput.addEventListener('submit', evaluateInput);

getReviewApi();