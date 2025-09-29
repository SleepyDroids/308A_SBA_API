//308A SBA

// DOM
const bodyEl = document.querySelector("body");
const cardsPanel = document.querySelector("#cards-panel");
// const searchBtn = document.createElement("button");
// searchBtn.id = "search-btn"
// searchBtn.textContent = "Search Tarot";
// bodyEl.prepend(searchBtn);
const searchBar = document.createElement("input");
searchBar.id = "card-search";
searchBar.type = "text";
searchBar.placeholder = "Search cards...."
bodyEl.prepend(searchBar);
console.log(searchBar)

// Data Retrieval
// baseURL provided by the docs
const baseURL = "https://tarotapi.dev/api/v1";

// In case I need or want to use this later
const config = { method: "GET", headers: {} };

// Initilization of all cards available on the main page
async function initialPanel() {
  try {
    // retrieve the promise data from the API
    const response = await fetch(baseURL, config);

    // if response.ok = false aka fetch couldn't retrieve the data
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // Convert the promise received into json data
    const data = await response.json();
    // deck targets the array inside my data so I can loop through it more easily
    const deck = data.cards;
    console.log(data);
    // for each card, do the following (78 cards total - indexed from 0 - 77)
    deck.forEach((card, index) => {
      const newDiv = document.createElement("div");
      // setting up a universal class for each card div
      newDiv.className = "card";
      // adding their index as an id in case I need to use that for later
      newDiv.id = index;
      // for accessibility, repurposing divs to act like list items 
      newDiv.role = "listitem";
      // testing data retrieval is successful
      newDiv.textContent = card.name;
    //   newDiv.innerHTML = `
    //   <u>Name of Card:</u> ${card.name} <br />
    //   <u>Type:</u> ${card.type} <br />
    //   <u>Meanings:</u> ${card.meaning_up} <br />
    //   <u>Reversed Meanings:</u> ${card.meaning_rev} <br />
    //   <u>Description:</u> ${card.desc}
    //   `;
      cardsPanel.append(newDiv);
    }); // end of forEach loop
  } catch (error) {
    console.error(error.message);
  }
}

initialPanel(); // initializes the cards so that there's something on the page when the user loads in

console.log(cardsPanel);
const allCards = document.getElementsByClassName("card");
console.log(allCards) // returns HTML collection

// live searches based on user input
searchBar.addEventListener("input", liveSearch)

function liveSearch() {
  // the user's input
    const query = this.value.toLowerCase(); 
   // for each card inside of the HTML collection (deck) 
    for (let card of allCards) {
      // the text content of each card
        const text = card.textContent.toLowerCase();
        // if it includes the user search, show it : if not, don't 
        card.style.display = text.includes(query) ? "block" : "none"
    }
}
