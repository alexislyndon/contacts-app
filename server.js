const express = require("express");
const app = express();
//const db = require("./services/dbService/db");

//require("./services/routeService")(app);

//routes
app;

app;

//app;

//routes
//app.use("/", require("./routes/person"));

app

  .use(express.static("public"))

  .use(express.urlencoded({ urlencoded: true }))

  .use("/", require("./routes/index"))

  .use("/person", require("./routes/person/index"))

  .set("view engine", "ejs")

  .listen(5001, () => console.log(`Server Running`));
