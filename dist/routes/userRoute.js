"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create routes for user login and signup
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var checkJWT_1 = require("../middlewares/checkJWT");
var router = (0, express_1.Router)();
// login route
router.post('/login', userController_1.default.login);
// signup route
router.post('/signup', userController_1.default.signup);
// change password route
router.post('/change-password', [checkJWT_1.checkJwt], userController_1.default.changePassword);
module.exports = router;
