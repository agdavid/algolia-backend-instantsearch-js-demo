console.log("Client side JS file loaded");

// Create custom client
const searchClient = {
  search(requests) {
    return fetch(`/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const search = instantsearch({
  indexName: "instant_search",
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    transformItems(items) {
      return items.map((item) => {
        return {
          ...item,
          // Hydrate with data here
          frontendCustomData: "hydratedInFrontend",
        };
      });
    },
    templates: {
      item: `
    <article>
        <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
        <p>Custom: {{ backendCustomData }}</p>
        <p>Custom: {{ frontendCustomData }}</p>
    </article>
    `,
    },
  }),
  instantsearch.widgets.refinementList({
    container: "#brand-list",
    attribute: "brand",
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();
