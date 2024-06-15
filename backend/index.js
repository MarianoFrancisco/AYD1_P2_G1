/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
require("dotenv").config();

const app = require('./app.js')
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Port: ", PORT, " enabled");
})
