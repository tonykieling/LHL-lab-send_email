/**
 * *within the directory to export:
 * npm init to create the package.json file - need to include the dependecy(ies)
 * npm login
 * npm publish
 */


const express   = require("express");
const PORT      = process.env.PORT || 3789;
const app       = express();
const sendEmail = require("easymailing");

require('dotenv').config();

const cors = require('cors');
app.use(cors());

// package to handle data from body
const bodyParser  = require("body-parser");
// package being used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// checks for JSON malformatted messages
app.use((err, req, res, next) => {
  if (err) {
    res.status(409).json({
      error: `Sorry, ERROR: ${err.message}`
    });
  }
  else
    next()
});

const config = {
  user: process.env.user,
  password: process.env.password,
  to: "tony.kieling@gmail.com",
  path: '/mail',
}

app.use(sendEmail(config));


// server running
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));