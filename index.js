const express = require('express');
require(`dotenv`).config();

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const database = require("./config/database");

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

// parse application/json
app.use(bodyParser.json())

database.connect();

routesApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});