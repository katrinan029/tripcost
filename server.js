const express = require("express");
const mongo = require("mongodb").MongoClient;
const app = express();
const url = "mongodb://localhost:27017";

// Connect db and get reference to trips and expenses collections
let db, trips, expenses;

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    db = client.db("tripcost");
    trips = db.collection("trips");
    expenses = db.collection("expenses");
  }
)

app.use(express.json());

app.post("/trip", (req, res) => {
  const name = req.body.name
  trips.insertOne({ name: name }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: err});
      return
    }
    console.log(result);
    res.status(200).json({ ok: true })
  })
});

app.get("/trips", (req, res) => {
  res.send('hello')
});

app.post("/expense", (req, res) => {

})

app.get("/expenses", (req, res) => {

})

app.listen(3000, () => console.log("Server ready"))