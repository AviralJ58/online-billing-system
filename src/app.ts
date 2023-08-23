import express from 'express';
const cors = require("cors");

import { ds } from './data-source';

const app = express();
const PORT = process.env.PORT || 3000;

ds.initialize().then(() => {
    console.log("Database connected");
});

app.use(
    cors({
        allowedHeaders: "*, auth",
    })
);
app.options(
    "*",
    cors({
        allowedHeaders: "*, auth",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/user", require("./routes/userRoute"));
app.use("/item", require("./routes/itemRoute"));
app.use("/cart", require("./routes/cartRoute"));

app.listen(3000, () => {
    console.log("Server started on port 3000!");
});

