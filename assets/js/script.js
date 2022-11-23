var disneyApi = 'https://api.disneyapi.dev/characters';
var reviewApi = 'https://api.themoviedb.org/3/movie/550?api_key=091a5c8f390a977d67ab12f38ec85102';

function getDisneyApi() {
    fetch(disneyApi)
    .then(function(response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
        })
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