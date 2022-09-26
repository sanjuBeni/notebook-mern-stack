const connectToMongoose = require("./db");
const express = require("express");
const cros = require("cors");

connectToMongoose();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cros());

// Router in nodejs

// app.get('/', (req,res) => {
//     res.send("Hello World!");
// });

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

app.listen(port, () => {
  console.log(`NoteBook app listening on port ${port}`);
});
