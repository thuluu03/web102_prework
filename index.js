/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games) {
        const game_card = document.createElement("div")
        game_card.classList.add("game-card")

        game_card.innerHTML = `
            <div>
                <img class="game-img" src='${game.img}'/>
                <p>${game.name}</p>
                <p>${game.description}</p>
            </div>
        `;

        gamesContainer.appendChild(game_card);
        
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contributions = GAMES_JSON.reduce( (acc, card) => {return acc + card.backers}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <div>${total_contributions.toLocaleString('en-US')}</div>
`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_raised = GAMES_JSON.reduce( (acc, card) => {return acc + card.pledged}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
    <div>$${total_raised.toLocaleString('en-US')}</div>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const total_games = GAMES_JSON.reduce( (acc, game) => {return acc + 1}, 0);

gamesCard.innerHTML = `
    <div>${total_games.toLocaleString('en-US')}</div>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal
    })

    console.log("1: " + unfundedGames.length)

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal
    })

    console.log("2: " + fundedGames.length)
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly)

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly)

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames)

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// count unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const unfundedCount = unfundedGames.length;

// total raised
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. 
Currently, ${unfundedCount} game${unfundedCount !== 1 ? 's' : ''} remain${unfundedCount !== 1 ? '' : 's'} unfunded. 
We need your help to fund these amazing projects!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedString = document.createElement("p");
unfundedString.textContent = descriptionText;

descriptionContainer.appendChild(unfundedString)


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgeGame = document.createElement("div");
topPledgeGame.innerText = first.name;
firstGameContainer.appendChild(topPledgeGame)

// do the same for the runner up item
const secPledgeGame = document.createElement("div");
secPledgeGame.innerText = second.name;
secondGameContainer.appendChild(secPledgeGame)

/************************************************************************************
 * functionality for the fund button
*/

const gameDropdown = document.getElementById("game-dropdown")

function addGameOptions() {

    for (const game of GAMES_JSON) {
        const option = document.createElement("option")
        option.innerText = game.name
        gameDropdown.appendChild(option)
    }
}

// Call function top set up options
addGameOptions()


// changes the popup to stop hiding
function togglePopup() {
    // TODO: reset state
    document.getElementById("fund-popup").classList.toggle("active")
}

function togglePledgePage() {
    document.getElementById("pledge-popup").classList.toggle("active")
}

// open fund 
const fundBtn = document.getElementById("fund-btn");
fundBtn.addEventListener("click", togglePopup)

// Close fund popup
const fundCloseBtn = document.getElementById("fund-close-btn");
fundCloseBtn.addEventListener("click", togglePopup);

// Close pledge popup
const pledgeCloseBtn = document.getElementById("pledge-close-btn");
pledgeCloseBtn.addEventListener("click", togglePledgePage);

function addFunds(e) {
    e.preventDefault();

    const dropdown = document.getElementById("game-dropdown");
    const amountInput = document.getElementById("fund-amount");
    const innerPopup = document.getElementById("fund-inner");

    // Clear previous error messages
    const existingError = document.querySelector(".error");
    if (existingError) existingError.remove();

    // Validate inputs
    if (dropdown.value && amountInput.value && Number(amountInput.value) > 0) {
        togglePopup();
        togglePledgePage();
    } else {
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("error");
        errorMsg.innerText = "Please fill in all information";
        innerPopup.appendChild(errorMsg);
    }
}

// Submit pledge
const submitFundBtn = document.getElementById("fund-submit-btn");

submitFundBtn.addEventListener("click", addFunds);