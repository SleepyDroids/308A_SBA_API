export { liveSearch, cardFilter, linkImages };

// Live search functionality for the main deck page
function liveSearch() {
  const allCards = document.getElementsByClassName("card");
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

// can use template to make the cards again for each filter type
// or if it would be easier just to use the data I've already pulled in my first request
// but I need to figure out how to prioritze the DOM loading in first
// so I have data to iterate over for the filter

function cardFilter() {
  const allCards = document.getElementsByClassName("card");
  if (allCards.length === 0) return; // guard in case the API hasn't retrieved the info

  const userPick = document.getElementById("card-filter").value.toLowerCase();

  for (let card of allCards) {
    // grabbing the type info from my doc frag again which should be rendered at this point
    const typeElement = card.querySelector("[card-type]");
    // if the type of the rendered, grab the text or give an empty string if it didn't load in
    const typeActualText = typeElement
      ? typeElement.textContent.toLowerCase()
      : "";

      // similar logic to the live search
    if (userPick === "major") {
      card.style.display = typeActualText.includes("major") ? "block" : "none";
    } else if (userPick === "minor") {
      card.style.display = typeActualText.includes("minor") ? "block" : "none";
    } else {
      card.style.display = "";
    }
  }
} // end of cardFilter() function

// separate function here to link images I've downloaded to each card's src accordingly
function linkImages() {
  // can link cards by their name to the appropriate image
  // alternatively each card has a unique value in the API so if I name the images that way
  // that could work too
  // trying to figure out how to do this without having 78 if statements to account for each card
  // according to stackoverflow I need to use .split() method
  // to get to an image's file name and then maybe I can link it that way
  // if card name = image file name since I downloaded them according to their file name
}
