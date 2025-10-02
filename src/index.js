import { liveSearch, cardFilter } from "./functions.js";
import {
  cardSkeleton,
  body,
  cardsPanel,
  searchBar,
  select,
  label,
  selectFilter,
  optionsData,
  button,
  resetBtn,
} from "./dom.js";

// 308A SBA

// Other Variables
let deck; // initializing

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
    // all data SHOULD be loaded by here
    // deck targets the array inside my data so I can loop through it more easily
    deck = data.cards;
    // console.log(data);
    // for each card, do the following (78 cards total - indexed from 0 - 77)

    deck.forEach((card, _index) => {
      // setting up template/document fragment cloning for cards
      // grab everything inside the template (content) and clone it
      // which returns a document fragment
      const cardFrag = cardSkeleton.content.firstElementChild.cloneNode(true);
      const cardImg = cardFrag.querySelector("[card-img]");
      const cardName = cardFrag.querySelector("[card-title]");
      const type = cardFrag.querySelector("[card-type]");
      const suit = cardFrag.querySelector("[card-suit]");
      const upright = cardFrag.querySelector("[card-upright]");
      const reverse = cardFrag.querySelector("[card-reversed]");
      const desc = cardFrag.querySelector("[card-desc]");
      const newImgSrc = `./card-img/${card.name}.jpg`;
      cardName.textContent = card.name;
      cardImg.src = newImgSrc;
      cardImg.alt = card.name;
      type.textContent += card.type;
      upright.textContent += card.meaning_up;
      reverse.textContent += card.meaning_rev;
      desc.textContent += card.desc;

      // ----------------

      //-----------------

      // major arcana cards don't have a suit so applying logic to account for that
      card.suit === undefined ? suit.remove() : (suit.textContent += card.suit);
      cardsPanel.append(cardFrag);
    }); // end of forEach loop

    // liveSearch();
  } catch (error) {
    console.error(error.message);
  }
}

initialPanel(); // initializes the cards so that there's something on the page when the user loads in

// live searches based on user input
searchBar.addEventListener("input", liveSearch);

// DOM - Creating the filter
optionsData.forEach((data) => {
  // console.log(data);
  const optionCreate = document.createElement("option");
  optionCreate.value = data.value;
  optionCreate.textContent = data.text;
  optionCreate.id = data.id;
  selectFilter.appendChild(optionCreate);
});

selectFilter.addEventListener("change", cardFilter);

resetBtn.addEventListener("click", () => {
  window.location.reload();
});

// const cardImg = document.getElementsByTagName("img");
// console.log(cardImg);
// const imgArray = [...cardImg];
// console.log(imgArray);
