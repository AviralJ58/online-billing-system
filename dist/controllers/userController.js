"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entities/User");
var data_source_1 = require("../data-source");
var jwt = __importStar(require("jsonwebtoken"));
var class_validator_1 = require("class-validator");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, password, userRepository, user, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        if (!(username && password)) {
                            res.status(400).send("Please provide username and password");
                        }
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { username: username } })];
                    case 2:
                        user = _b.sent();
                        // check if encrypted password match
                        if (!bcryptjs_1.default.compareSync(password, user.password)) {
                            res.status(401).send("Incorrect password");
                            return [2 /*return*/];
                        }
                        token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        // send the jwt in the response
                        res.send({
                            "token": token,
                            "user": {
                                "id": user.id,
                                "username": user.username,
                                "email": user.email,
                                "role": user.role
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res.status(401).send("User not found");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.signup = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, password, role, email, user, errors, userRepository, userExists, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, role = _a.role, email = _a.email;
                        user = new User_1.User();
                        user.username = username;
                        user.email = email;
                        user.password = password;
                        user.role = role;
                        return [4 /*yield*/, (0, class_validator_1.validate)(user)];
                    case 1:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return [2 /*return*/];
                        }
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ where: { username: user.username } })];
                    case 2:
                        userExists = _b.sent();
                        if (userExists) {
                            res.status(409).send("Username already exists");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, userRepository.findOne({ where: { email: user.email } })];
                    case 3:
                        //check if email already exists
                        userExists = _b.sent();
                        if (userExists) {
                            res.status(409).send("Email already exists");
                            return [2 /*return*/];
                        }
                        // hash the password, to securely store on DB
                        return [4 /*yield*/, bcryptjs_1.default.hash(user.password, 8).then(function (hash) {
                                user.password = hash;
                            })];
                    case 4:
                        // hash the password, to securely store on DB
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        res.status(409).send();
                        return [2 /*return*/];
                    case 8:
                        // if all ok, send 201 response
                        res.status(201).send('User created');
                        return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, oldPassword, newPassword, userRepository, user_1, errors, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = res.locals.jwtPayload.userId;
                        _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                        if (!(oldPassword && newPassword)) {
                            res.status(400).send();
                        }
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, userRepository.findOne({ where: { id: id } })];
                    case 2:
                        user_1 = _b.sent();
                        if (!user_1) {
                            res.status(401).send("User not found");
                            return [2 /*return*/];
                        }
                        // check if old password matchs
                        if (!bcryptjs_1.default.compareSync(oldPassword, user_1.password)) {
                            res.status(401).send("Old password is incorrect");
                            return [2 /*return*/];
                        }
                        // validate model (password length)
                        user_1.password = newPassword;
                        return [4 /*yield*/, (0, class_validator_1.validate)(user_1)];
                    case 3:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return [2 /*return*/];
                        }
                        // hash the new password and save
                        return [4 /*yield*/, bcryptjs_1.default.hash(user_1.password, 8).then(function (hash) {
                                user_1.password = hash;
                            })];
                    case 4:
                        // hash the new password and save
                        _b.sent();
                        return [4 /*yield*/, userRepository.save(user_1)];
                    case 5:
                        _b.sent();
                        res.status(200).send("Password updated");
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        res.status(401).send();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
exports.default = new UserController();
