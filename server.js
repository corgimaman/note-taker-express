const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

require("./controllers/api.js")(app);
require("./controllers/html.js")(app);

app.listen(PORT, () => {
    console.log(`App listening on localhost:${PORT}`)
});