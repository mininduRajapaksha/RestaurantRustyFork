const express = require("express");
const cors = require("cors");

const db = require("./database");
const userRoutes = require("./routes/users");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// User routes
app.use("/api/users", userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})