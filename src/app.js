const path = require('path');
const express = require('express');
const dotenvExtended = require('dotenv-extended');
const dotenvParseVariables = require('dotenv-parse-variables');

// Instantiate an Algolia client
const algoliasearch = require('algoliasearch');
const { nextTick } = require('process');
// const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_API_KEY);
const algoliaClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');


// load .env variables
dotenvParseVariables(
    dotenvExtended.load({
      // assign variables to process.env object for accessibility
      assignToProcessEnv: true,
      // displays "missing .env file", no need in production, where we use real env variables
      silent: process.env.APP_ENV === 'production',
      errorOnMissing: true,
      // also use process.env to fill variables in, only in production
      includeProcessEnv: process.env.APP_ENV === 'production',
    })
  );

  const app = express();
const port = process.env.PORT;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

// setup handlebars
app.set('view engine', 'hbs'); // set templating engine
app.set('views', viewsPath); // point to custom views directory instead of /views

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// setup body parsing
app.use(express.json());

// initial view
app.get('/', (req, res) => {
    res.render('index');
});

// app.post('/search', async (req, res, next) => {
//     try {
//         console.log("In post search");
//         const { requests } = req.body;
//         console.log(requests);
//         // TypeError [ERR_HTTP_INVALID_HEADER_VALUE]: Invalid value "undefined" for header "x-algolia-api-key" 
//         const results = await algoliaClient.search(requests);
//         res.status(200).send(results);
//     } catch (error) {
//         return next(error);
//     }
// });

app.post('/customsearch', async({ body }, res) => {
    try {
        console.log("In post custom search");
        const { requests } = body;
        const results = await algoliaClient.search(requests);
        console.log(results);
        res.status(200).send(results);
    } catch (error) {
        return next(error);
    }
});

app.listen(port, ()=> {
    console.log(`Server is up on Port ${port}`);
});

