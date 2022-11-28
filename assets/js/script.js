var disneyApi = 'https://api.disneyapi.dev/characters';
var apiKey = '091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var movieName = document.querySelector(".movie-name")
var characterSelection = document.querySelector(".character-select")
var characterSelectionSub = document.querySelector(".character-select")
var characterImage = document.querySelector(".character-image")
var clearSearch = document.querySelector(".clear-search")
var movieInfo = document.querySelector(".movie-info")
var movieImage = "https://image.tmdb.org/t/p/w500/"
var textInput = document.querySelector('.text-input');
var searchHistoryBtnEl = document.querySelector('#search-history-buttons');
var characterlist = [];
var movielist = [];
renderStorage();
// adding data to local storage
function saveToStorage(value) {
  var searchHistoryArray = JSON.parse(localStorage.getItem('characters')) || []
  if (value == ""){
    return
  }
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
      searchHistoryBtnEl.textContent = "";
  for (let i = 0; i < searchHistoryArray.length; i++) {
      var searchHistoryBtn = document.createElement("button");
      searchHistoryBtn.classList.add("button")
      searchHistoryBtn.classList.add("is-primary")
      searchHistoryBtn.classList.add("button-size-large")
      searchHistoryBtn.classList.add("button-color-blue")
      searchHistoryBtn.textContent = searchHistoryArray[i]
      searchHistoryBtnEl.appendChild(searchHistoryBtn)
  }
}
searchHistoryBtnEl.addEventListener("click", function (event) {
  var searchHistoryBtnValue = (event.target.textContent)
  var searchHistoryFetch = 'https://api.disneyapi.dev/character?name=' + searchHistoryBtnValue;
  fetch(searchHistoryFetch)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
// loop based on # of films for selected character
              characterFilmSection.textContent = "";
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
        }
        characterImage.textContent = "";
        characterSelectionSub.textContent = "";
        movieInfo.textContent = "Movie Info";
        movieInfo.classList.add("title-text")

          for (var i = 0; i < data.data[0].films.length; i++) {
            var numFilms = data.data[0].films[i];
        }
        
        for (var j = 0; j < data.data[0].parkAttractions.length; j++) {
          var numPark = data.data[0].parkAttractions[j];
        }

        for (var k = 0; k < data.data[0].tvShows.length; k++) {
          var numtv = data.data[0].tvShows[k];
        }

        for (var l = 0; l < data.data[0].videoGames.length; l++) {
          var numVideo = data.data[0].videoGames[l];
        }

//apends the character input to the character selection
        var characterName = document.createElement("p");
        characterName.classList.add("title-text")
        characterName.textContent = data.data[0].name;
        characterSelection.append(characterName);
        console.log(characterName);

//append character data 
        var numFilms = document.createElement("li");
        numFilms.textContent = 'Number of appearances in Movies: ' + i;
        characterSelectionSub.append(numFilms);

        var numtv = document.createElement("li");
        numtv.textContent = 'Number of appearances in TV Shows: ' + k;
        characterSelectionSub.append(numtv);

        var numPark = document.createElement("li");
        numPark.textContent = 'Number of appearances in Park Attractions: ' + j;
        characterSelectionSub.append(numPark);

        var numVideo = document.createElement("li");
        numVideo.textContent = 'Number of appearances in Video Games ' + l;
        characterSelectionSub.append(numVideo);
        
        var firstFilmApperance = document.createElement("li");
        var firstMovie = data.data[0].films[0]
        firstFilmApperance.textContent = "First film apperance: "+ firstMovie
        characterSelectionSub.append(firstFilmApperance);

        var disneyImg = document.createElement("img");
        disneyImg.setAttribute("src", data.data[0].imageUrl);
        characterImage.textContent = "";
        characterImage.append(disneyImg);

      })
}
);

characterFilmSection.addEventListener("click", function (event) {
  movieInfo.textContent = "";
  var characterFilmValue = (event.target.textContent)
  var reviewApiTitle = "https://api.themoviedb.org/3/search/movie?api_key=" + "091a5c8f390a977d67ab12f38ec85102" +"&query=" + characterFilmValue;
  fetch(reviewApiTitle)
  .then(function(response) {
      response.json().then(function (data) {

if (data.results.length === 0) {
  var movieError = document.createElement("p");
  movieError.classList.add("title-text");
  movieError.textContent = "Sorry friend!  It looks like we are having trouble finding your movie!  Please try another movie.";
  movieInfo.append(movieError);
  return
}

// fetch movie title and append to index
var movieTitle = document.createElement("p");
  movieTitle.classList.add("title-text")
  movieTitle.textContent = data.results[0].title
  movieInfo.append(movieTitle);

// fetch movie info and append to index
var imgPull = document.createElement("img");
  imgPull.setAttribute("src", movieImage + data.results[0].backdrop_path);
  movieInfo.append(imgPull);

// fetch movie info and append to index
var movieInfoPull = document.createElement("p");
  movieInfoPull.setAttribute("style", "font-size: 18px")
  movieInfoPull.textContent = data.results[0].release_date
  movieInfo.append(movieInfoPull);
      
// fetch movie rating and append to index
var movieInfoPull = document.createElement("p");
  movieInfoPull.textContent = "Rating: " + data.results[0].vote_average
  movieInfo.append(movieInfoPull);

// fetch movie overview and append to index
var movieInfoPull = document.createElement("p");
  movieInfoPull.textContent = data.results[0].overview
  movieInfoPull.setAttribute("style", "font-size: 20px")
  movieInfo.append(movieInfoPull);
    })
  })
})

function clearSearchHistory() {
  localStorage.clear();
  searchHistoryBtnEl.textContent = "";
  characterFilmSection.textContent = "";
  characterSelectionSub.textContent = "Character Selection";
  characterSelectionSub.classList.add("title-text")
  characterImage.textContent = "Character Image";
  characterImage.classList.add("title-text")
  movieInfo.textContent = "Movie Info"
  movieInfo.classList.add("title-text")
}
function evaluateInput(event) {
    characterFilmSection.textContent = "";
    movieInfo.textContent = "Movie Info";
    movieInfo.classList.add("title-text")
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
  

        if (data.data.length === 0) {
          var charError = document.createElement("p");
          charError.classList.add("title")
          charError.textContent = "Please Enter a Valid Character Name"
          characterSelection.append(charError);
          return
        }
      
            for (var i = 0; i < data.data[0].films.length; i++) {
         
//create element and populate film(s)        
            var characterFilm = document.createElement("button");
            characterFilm.classList.add("button")
            characterFilm.classList.add("is-primary")
            characterFilm.classList.add("button-target")
            characterFilm.classList.add("button-size-large")
            characterFilm.classList.add("button-color-purple")
            characterFilm.textContent = data.data[0].films[i]
//append text to character selection section in index
            characterFilmSection.append(characterFilm);
            textInput.reset()
         }
        })
        textInput.value = '';
}

//populate character data
function characterDisplay() {
  characterSelectionSub.textContent = "";
  characterSelection.textContent = "";
  var characterInput = document.getElementById('search-text');
  var characterVal = characterInput.value;
  var characterFetch = "https://api.disneyapi.dev/character?name=" + characterVal;
  fetch(characterFetch)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      if(characterVal == ""){
          characterImage.innerHTML = ""
          return
      }
//looping over to count the number of records
      for (var i = 0; i < data.data[0].films.length; i++) {
          var numFilms = data.data[0].films[i];
      }
      for (var j = 0; j < data.data[0].parkAttractions.length; j++) {
        var numPark = data.data[0].parkAttractions[j];
      }
      for (var k = 0; k < data.data[0].tvShows.length; k++) {
        var numtv = data.data[0].tvShows[k];
      }
      for (var l = 0; l < data.data[0].videoGames.length; l++) {
        var numVideo = data.data[0].videoGames[l];
      }
//apends the character input to the character selection
      var characterName = document.createElement("p");
      characterName.classList.add("title")
      characterName.textContent = data.data[0].name;
      characterSelection.append(characterName);

//append character data
      var numFilms = document.createElement("li");
      numFilms.textContent = "Number of appearances in Movies: " + i;
      characterSelectionSub.append(numFilms);
      var numtv = document.createElement("li");
      numtv.textContent = "Number of appearances in TV Shows: " + k;
      characterSelectionSub.append(numtv);
      var numPark = document.createElement("li");
      numPark.textContent = "Number of appearances in Park Attractions: " + j;
      characterSelectionSub.append(numPark);
      var numVideo = document.createElement("li");
      numVideo.textContent = "Number of appearances in Video Games: " + l;
      characterSelectionSub.append(numVideo);
      var firstFilmApperance = document.createElement("li");
      var firstMovie = data.data[0].films[0]
      firstFilmApperance.textContent = "First film apperance: "+ firstMovie
      characterSelectionSub.append(firstFilmApperance);
      var disneyImg = document.createElement("img");
      disneyImg.setAttribute("src", data.data[0].imageUrl);
      characterImage.textContent = "";
      characterImage.append(disneyImg);
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
    if (e) { // key
      closeAllModals();
    }
  });
});
textInput.addEventListener('submit', evaluateInput);
textInput.addEventListener('submit', characterDisplay);
textInput.addEventListener('submit', renderStorage);
clearSearch.addEventListener('click', clearSearchHistory);
clearSearch.addEventListener('click', clearSearchHistory);