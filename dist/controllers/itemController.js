"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../data-source");
var class_validator_1 = require("class-validator");
var Product_1 = require("../entities/Product");
var Service_1 = require("../entities/Service");
var uuid_1 = require("uuid");
var ItemController = /** @class */ (function () {
    function ItemController() {
        var _this = this;
        this.getAllItems = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, servRepository, products, services, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, prodRepository.find()];
                    case 2:
                        products = _a.sent();
                        return [4 /*yield*/, servRepository.find()];
                    case 3:
                        services = _a.sent();
                        res.send({
                            "products": products,
                            "services": services
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        res.status(401).send("Items not found");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getProductById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, item, id, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, prodRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        item = _a.sent();
                        res.send(item);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getServiceById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var servRepository, item, id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, servRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        item = _a.sent();
                        res.send(item);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllProducts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, products, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prodRepository.find()];
                    case 2:
                        products = _a.sent();
                        res.send(products);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        res.status(401).send("Products not found");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllServices = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var servRepository, services, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, servRepository.find()];
                    case 2:
                        services = _a.sent();
                        res.send(services);
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        res.status(401).send("Services not found");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, product, errors, prod, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        product = new Product_1.Product();
                        product.name = req.body.name;
                        product.price = req.body.price;
                        product.id = (0, uuid_1.v4)();
                        return [4 /*yield*/, (0, class_validator_1.validate)(product)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, prodRepository.findOne({ where: { name: product.name } })];
                    case 3:
                        prod = _a.sent();
                        if (prod) {
                            res.status(409).send("Product already exists");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, prodRepository.save(product)];
                    case 4:
                        _a.sent();
                        res.status(201).send(product);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        res.status(409).send("Product already exists");
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.createService = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var servRepository, service, errors, serv, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        service = new Service_1.Service();
                        service.name = req.body.name;
                        service.provider = req.body.provider;
                        service.price = req.body.price;
                        service.id = (0, uuid_1.v4)();
                        return [4 /*yield*/, (0, class_validator_1.validate)(service)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, servRepository.findOne({ where: { name: service.name } })];
                    case 3:
                        serv = _a.sent();
                        if (serv) {
                            res.status(409).send("Service already exists");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, servRepository.save(service)];
                    case 4:
                        _a.sent();
                        res.send(service);
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        res.status(409).send("Service already exists");
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, product, id, errors, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, prodRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        product = _a.sent();
                        product.name = req.body.name;
                        product.price = req.body.price;
                        return [4 /*yield*/, (0, class_validator_1.validate)(product)];
                    case 3:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, prodRepository.update(product.id, { name: product.name, price: product.price })];
                    case 4:
                        _a.sent();
                        res.status(200).send("Updated successfully");
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateService = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var servRepository, service, id, errors, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, servRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        service = _a.sent();
                        service.name = req.body.name;
                        service.provider = req.body.provider;
                        service.price = req.body.price;
                        return [4 /*yield*/, (0, class_validator_1.validate)(service)];
                    case 3:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, servRepository.update(service.id, { name: service.name, provider: service.provider, price: service.price })];
                    case 4:
                        _a.sent();
                        res.status(200).send("Updated successfully");
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, product, id, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        id = req.params.id;
                        return [4 /*yield*/, prodRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        product = _a.sent();
                        return [4 /*yield*/, prodRepository.remove(product)];
                    case 3:
                        _a.sent();
                        res.status(200).send("Deleted successfully");
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deleteService = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var servRepository, service, id, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        id = req.params.id;
                        return [4 /*yield*/, servRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        service = _a.sent();
                        return [4 /*yield*/, servRepository.remove(service)];
                    case 3:
                        _a.sent();
                        res.status(200).send("Deleted successfully");
                        return [3 /*break*/, 5];
                    case 4:
                        error_9 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return ItemController;
}());
exports.default = new ItemController();
