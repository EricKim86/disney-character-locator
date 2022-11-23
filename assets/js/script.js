var characterFilmSection = document.getElementById("character-films")

var disneyAPI = "https://api.disneyapi.dev/character?name=Elsa"
// var characterName = []

fetch(disneyAPI)
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




