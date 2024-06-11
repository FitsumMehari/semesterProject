const express = require("express");

const PORT = 3000;
const app = express();
app.use(express.json());


//ROUTE NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("Sorry, route could not be located!");
});

//ERROR
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});