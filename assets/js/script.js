var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/550?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var movieTitle = [];
var textInput = document.querySelector('.form-input');

function evaluateInput(event) {
    //fetch disney api
    event.preventDefault();
    
    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    // var characterInput = 'Mickey Mouse';
    console.log(characterVal);
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;

    console.log(characterVal);
    fetch(characterFetch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    //if fetch api data.character = character.val
    //name= charactername
    //call getDisneyApi()

}


function getDisneyApi() {
    fetch(disneyApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.data[0].films);
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



evaluateInput();
getDisneyApi();
getReviewApi();

