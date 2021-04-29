console.log("Client side JS file loaded");

const searchForm = document.querySelector('form');
const searchBar = document.querySelector('input');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = searchBar.value;
    fetchResults(query);
});

const fetchResults = query => {
    const opts = {
        query
    };
    console.log(opts);

    fetch(`/search`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(opts)
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
    });
};