var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/550?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var characterlist = [];
var movielist = [];
var textInput = document.querySelector('.text-input');

function evaluateInput(event) {
    characterFilmSection.textContent = '';
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
            var characterFilm = document.createElement("h3");
            characterFilm.textContent = data.data[0].films[i]

//append text to character selection section in index
            characterFilmSection.append(characterFilm);
         }
        })
        textInput.value = '';
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

function characterDisplay() {
    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;
    //use input from disney fuction to retrieve name from disney api
    fetch(characterFetch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        for (var i = 0; i < data.data[0].films.length; i++) {

            //create element and populate film(s)
         var characterFilm = document.createElement("h3");
        characterFilm.textContent = data.data[0].films[i]
    }
    })
    
    //use input from disney function to retrieve image from disney api
    //use input from to retrieve # of films they appear in
    //use input to retrieve the date of first appearce
    //append to page
}






textInput.addEventListener('submit', evaluateInput);
textInput.addEventListener('submit', characterDisplay);

getReviewApi();
