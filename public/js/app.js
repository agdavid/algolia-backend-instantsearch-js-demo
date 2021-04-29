console.log("Client side JS file loaded");

// Create custom client
const searchClient = {
    search(requests) {
        return fetch(`/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests }),
        }).then(res => {
            return res.json();
        }).catch( err => {
            console.log(err);
        });
    },
};

const search = instantsearch({
    indexName: 'instant_search',
    searchClient,
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
    }),
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
          item: `
    <article>
      <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
      <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
    </article>
    `,
        },
      }),
]);

search.start();