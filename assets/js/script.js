var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/550?api_key=091a5c8f390a977d67ab12f38ec85102';
var characterFilmSection = document.getElementById("character-films");
var characterlist = [];
var movielist = [];
var textInput = document.querySelector('.text-input');
var searchHistoryBtnEl = document.querySelector('#search-history-buttons');


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
    event.preventDefault()

    var characterInput = document.getElementById('search-text');
    var characterVal = characterInput.value;
    var characterFetch = 'https://api.disneyapi.dev/character?name=' + characterVal;
    saveToStorage(characterVal)

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
}

function getReviewApi() {
    fetch(reviewApi)
        .then(function (response) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
            })
        })
}
textInput.addEventListener('submit', evaluateInput);
textInput.addEventListener('submit', renderStorage);

getReviewApi();