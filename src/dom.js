// DOM Exports
export {
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
};

// Base cards structure + search bar
const cardSkeleton = document.querySelector("[card-skeleton]");
// console.log(cardSkeleton); // shows the doc frag
const body = document.querySelector("body");
const cardsPanel = document.querySelector("#cards-panel");
// const searchBtn = document.createElement("button");
// searchBtn.id = "search-btn"
// searchBtn.textContent = "Search Tarot";
// body.prepend(searchBtn);
const searchBar = document.createElement("input");
searchBar.id = "card-search";
searchBar.name = "cardSearch";
searchBar.type = "text";
searchBar.placeholder = "Search cards....";
searchBar.classList.add("controls");
body.prepend(searchBar);

const header = document.createElement("header");
header.id = "header";
body.prepend(header);
header.appendChild(document.createElement("h1"));
header.firstChild.id = "title";
header.firstChild.textContent = "Tarot Explorer";

// select object and options
const select = document.createElement("select");
select.id = "card-filter";
select.name = "filter-cards";
select.classList.add("controls");
const label = document.querySelector("label");
label.after(select);
const selectFilter = document.querySelector("#card-filter");
const optionsData = [
  { value: "#", text: "Filter cards by type" },
  { value: "major", text: "Major Arcana", id: "major" },
  { value: "minor", text: "Minor Arcana", id: "minor" },
  // { value: "wands", text: "Wands (Suit)", id: "wands" },
  // { value: "cups", text: "Cups (Suit)", id: "cups" },
  // { value: "swords", text: "Swords (Suit)", id: "swords" },
  // { value: "pentacles", text: "Pentacles (Suit)", id: "pentacles" },
]; // end of optionsData array of objects

// reset button
const button = document.createElement("button");
button.id = "resetDeck";
button.textContent = "Reset Deck";
button.ariaLabel = "Reset all cards to default";
button.classList.add("controls");
selectFilter.after(button);
const resetBtn = document.querySelector("#resetDeck");

// creating a header for the page
