const list = document.querySelector(".game-list")
const details = document.querySelector(".game-details")
const image = document.querySelector("#detail-image")
const title = document.querySelector("#detail-title")
const highScore = document.querySelector("#detail-high-score")
const scoreForm = document.querySelector("#high-score-form")
const scoreInput = document.querySelector("#score-input")
let currentGame

fetch("http://localhost:3000/games")
.then((res) => res.json())
.then(data => {
    listGames(data);
    displayDetails(data[0])
    setHighScore()
})

function listGames (gameDetails) {
    gameDetails.forEach(game => {
        let sepContent = document.createElement("h5");
        sepContent.textContent += `${game.name} (${game.manufacturer_name})`
        list.appendChild(sepContent);
        sepContent.addEventListener('click', (e) =>
            displayDetails(game))
    })
}

function displayDetails(game) {
    currentGame = game
    image.src = game.image
    title.textContent = game.name
    highScore.textContent = game.high_score
}

function setHighScore(){
    scoreForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        currentGame.high_score = e.target["score-input"].value

        displayDetails(currentGame)
        e.target.reset()
    })
}

