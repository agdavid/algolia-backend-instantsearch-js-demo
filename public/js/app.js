console.log("Client side JS file loaded");

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
const search = instantsearch({
    indexName: 'instant_search',
    searchClient,
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
    }),
]);

search.start();

const searchForm = document.querySelector('form');
const searchBar = document.querySelector('input');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = searchBar.value;
    const requests = [
        {
            "indexName": "instant_search",
            "params": {
                query
            }
        }
    ]
    fetchResults(requests);
});

const fetchResults = requests => {
    console.log("In search");
    return fetch(`/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }).then(res => { 
        res.json();
    }).then( data => {
        console.log(data);
    });
  };