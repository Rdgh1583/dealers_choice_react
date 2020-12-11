const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const {
  syncAndSeed,
  db,
  models: { Suitcase, Content },
} = require("./db");

//middleware (always use app.use when requiring middleware...)
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/api", require("./api"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, ".", "client", "index.html"));
});

// app.post("/", async (req, res, next) => {
//   try {
//     await createUser(req.body);
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.get("/", async (req, res, next) => {
//   try {
//     res.send(await Suitcase.findAll());
//   } catch (ex) {
//     next(ex);
//   }
// });

//ROUTES =====================================
// app.post("/todos", async (req, res) => {
//   //await (waits for the function to complete before it continues)
//   try {
//     con;
//   } catch (error) {
//     console.log(error.message);
//   }
// });
const port = 8080;
app.listen(port, () => {
  console.log(`Server running. Listening on Port ${port}...`);
});

// const init = async () => {
//   try {
//     await db.authenticate();
//     await syncAndSeed();
//   } catch (err) {
//     console.log(err);
//   }
// };

// init();

module.exports = { app };
