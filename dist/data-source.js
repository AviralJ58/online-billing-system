"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ds = void 0;
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ds = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: ["dist/entities/*{.js,.ts}"],
    logging: true,
    synchronize: true,
});
