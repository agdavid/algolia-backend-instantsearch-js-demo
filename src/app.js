const path = require('path');
const express = require('express');
const dotenvExtended = require('dotenv-extended');
const dotenvParseVariables = require('dotenv-parse-variables');

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
app.set('views', viewsPath); // point to custom views directory

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// initial view
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, ()=> {
    console.log(`Server is up on Port ${port}`);
});

