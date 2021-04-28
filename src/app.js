const path = require('path');
const express = require('express');
const env = require('dotenv').config({ path: '../.env'});

const app = express();
const port = process.env.PORT;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.listen(port, ()=> {
    console.log(`Server is up on Port ${port}`);
});

