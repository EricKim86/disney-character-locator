var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/550?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var characterSelection = document.querySelector('#character-select');
var characterSelectionSub = document.querySelector('.character-select');
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

//the function that will fetch data to show in display section
//grabs number of films, first appearance and name
//appends all of the above
function characterDisplay() {
    characterSelection.textContent = '';
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
        var characterName = document.createElement('h1');
        characterName.textContent = characterVal;
        characterSelection.append(characterName);

        //apends the number of films to the page by using the for loop element i.
        //in the for loop i is the equivalent to number of films
        var numFilms = document.createElement('li');
        numFilms.textContent = 'Number of films appeared in: ' + i;
        characterSelectionSub.append(numFilms);


        //order date of film by descending - mostly likely through a search parameter property
        //pull first item in data index
        //list the data from that film
        //apend data of the film to list

        getReviewApi();
        
        console.log(data.data[0].data_);
        var firstFilm = document.createElement('li');
        firstFilm.textContent = 
        characterSelectionSub.append(firstFilm);

        //retreive image from first data index
        //apend image in an image tag
    })
}

textInput.addEventListener('submit', evaluateInput);
textInput.addEventListener('submit', characterDisplay);

getReviewApi();
