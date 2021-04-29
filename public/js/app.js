console.log("Client side JS file loaded");

const searchForm = document.querySelector('form');
const searchBar = document.querySelector('input');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = searchBar.value;
    fetchResults(query);
});

const fetchResults = query => {
    console.log(`The query is: ${query}`);
}