const express = require("express");
const cors = require("cors");

require("./models/init");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/expenses", require("./routes/expenses"));
app.use("/budget", require("./routes/budget"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});