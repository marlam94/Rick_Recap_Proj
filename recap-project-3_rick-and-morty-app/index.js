import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

searchBarContainer.addEventListener("submit", (event) =>{
  event.preventDefault(); 
  searchQuery = searchBar.querySelector(".search-bar__input").value;
  page =1 ;
  fetchCharacters();
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  // console.log(data.info.pages);

  cardContainer.innerHTML = "";

  data.results.forEach((character) => {
    const card = CharacterCard(character);
    cardContainer.appendChild(card);
  });

  maxPage = data.info.pages;

  pagination.textContent = `${page} / ${maxPage}`;
}

fetchCharacters();
