//308A SBA

// Other Variables
let hasSuit = false;
let isMajor = false;
let isMinor = false;

// DOM
// grabbing the template I made and selecting it by attribute
const cardSkeleton = document.querySelector("[card-skeleton]");
console.log(cardSkeleton); // shows the doc frag
const bodyEl = document.querySelector("body");
const cardsPanel = document.querySelector("#cards-panel");
// const searchBtn = document.createElement("button");
// searchBtn.id = "search-btn"
// searchBtn.textContent = "Search Tarot";
// bodyEl.prepend(searchBtn);
const searchBar = document.createElement("input");
searchBar.id = "card-search";
searchBar.name = "cardSearch";
searchBar.type = "text";
searchBar.placeholder = "Search cards....";
bodyEl.prepend(searchBar);
console.log(searchBar);

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
    // console.log(data);

    // for each card, do the following (78 cards total - indexed from 0 - 77)
    deck.forEach((card, index) => {
      // setting up template/document fragment cloning for cards
      // grab everything inside the template (content) and clone it
      // which returns a document fragment
      const cardFrag = cardSkeleton.content.cloneNode(true).children[0];
      const cardName = cardFrag.querySelector("[card-title]");
      const type = cardFrag.querySelector("[card-type]");
      const suit = cardFrag.querySelector("[card-suit]");
      const upright = cardFrag.querySelector("[card-upright]");
      const reverse = cardFrag.querySelector("[card-reversed]");
      const desc = cardFrag.querySelector("[card-desc]");
      cardName.textContent = card.name;
      type.textContent += card.type;
      upright.textContent += card.meaning_up;
      reverse.textContent += card.meaning_rev;
      desc.textContent += card.desc;
      // major arcana cards don't have a suit so applying logic to account for that
      card.suit === undefined ? suit.remove() : (suit.textContent += card.suit);
      cardsPanel.append(cardFrag);
      // const newDiv = document.createElement("div");
      // // setting up a universal class for each card div
      // newDiv.className = "card";
      // // adding their index as an id in case I need to use that for later
      // newDiv.id = index;
      // // for accessibility, repurposing divs to act like list items
      // newDiv.role = "listitem";
      // // testing data retrieval is successful
      // newDiv.textContent = card.name;
      // cardsPanel.append(newDiv);
    }); // end of forEach loop
  } catch (error) {
    console.error(error.message);
  }
}

initialPanel(); // initializes the cards so that there's something on the page when the user loads in

console.log(cardsPanel);
const allCards = document.getElementsByClassName("card");
console.log(allCards); // returns HTML collection with null properties

// live searches based on user input
searchBar.addEventListener("input", liveSearch);

function liveSearch() {
  // the user's input
  const query = this.value.toLowerCase();
  // for each card inside of the HTML collection (deck)
  for (let card of allCards) {
    // the text content of each card
    const text = card.textContent.toLowerCase();
    // if it includes the user search, show it : if not, don't
    card.style.display = text.includes(query) ? "block" : "none";
  }
}

// DOM - Creating the filter
// const label = document.createElement("label");
// label.for = "card-filter";
// searchBar.after(label)
const select = document.createElement("select");
select.id = "card-filter";
select.name = "filter-cards";
const label = document.querySelector("label");
label.after(select);
const selectFilter = document.querySelector("#card-filter");
const optionsData = [
  { value: "major", text: "Major Arcana" },
  { value: "minor", text: "Minor Arcana" },
  { value: "wands", text: "Wands (Suit)" },
  { value: "cups", text: "Cups (Suit)" },
  { value: "swords", text: "Swords (Suit)" },
  { value: "pentacles", text: "Pentacles (Suit)" },
]; // end of optionsData array of objects
optionsData.forEach((data) => {
  console.log(data);
  const optionCreate = document.createElement("option");
  optionCreate.value = data.value;
  optionCreate.textContent = data.text;
  selectFilter.appendChild(optionCreate);
});

console.log(selectFilter)
selectFilter.addEventListener("change", cardFilter)

function cardFilter() {
  
}
