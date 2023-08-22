"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require("cors");
var data_source_1 = require("./data-source");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
data_source_1.ds.initialize().then(function () {
    console.log("Database connected");
});
app.use(cors({
    allowedHeaders: "*, auth",
}));
app.options("*", cors({
    allowedHeaders: "*, auth",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.use("/user", require("./routes/userRoute"));
app.listen(3000, function () {
    console.log("Server started on port 3000!");
});
