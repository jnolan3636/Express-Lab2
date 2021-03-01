const express = require("express");
const routes = require("./cart");
const app = express();
app.use(express.json());
app.use("/", routes);
const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));
console.log("http://localhost:" + port);