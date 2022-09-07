const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const backendRoutes = require("./routes/backend");

const app = express();
const port = 3000;

const db = require("./utils/database");
const dbUrl = db.dbNameUrl();

const store = new MongoDBStore({
  uri: dbUrl,
  collection: "sessions",
});

app.use(
  session({
    secret: "secretkeyvalue",
    store: store,
    resave: false,
    rolling: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/api/backend", backendRoutes);

db.mongoConnect((db) => {
  app.db = db;
  app.listen(port, () =>
    console.log(`Example app listening on port 
${port}!`)
  );
});
