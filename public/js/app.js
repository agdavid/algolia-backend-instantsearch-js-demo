console.log("Client side JS file loaded");

// Create custom client
const searchClient = {
    // Status: Not working, response has issues
    search(requests) {
        console.log("In custom search client");
        return fetch(`/customsearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests }),
        }).then(res => {
            console.log("In custom search response"); 
            res.json();
        }).catch( err => {
            console.log(err);
        });
    },

    // async search(requests) {
    //     console.log("In custom search client");
    //     const res = await fetch(`/customsearch`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ requests }),
    //     });
    //     const body = await res.json();
    //     return body;
    // },
};

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