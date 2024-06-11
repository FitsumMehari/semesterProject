const express = require("experss");

const PORT = 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});