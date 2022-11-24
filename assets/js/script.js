var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/550?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var characterlist = [];
var movielist = [];
var textInput = document.querySelector('.text-input');

function evaluateInput(event) {
    characterFilmSection.textContent = "";
    event.preventDefault()

    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;
   
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
            characterFilm.classList.add("button-color-purple")
            characterFilm.textContent = data.data[0].films[i]

//append text to character selection section in index
            characterFilmSection.append(characterFilm);
            console.log(characterFilm);
         }
        })
}

function getReviewApi() {
    fetch(reviewApi)
    .then(function(response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
        })
    })
}
textInput.addEventListener('submit', evaluateInput);

getReviewApi();