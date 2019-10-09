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
        while (_) try {
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
var Web3_1 = __importDefault(require("Web3"));
var Holon_1 = require("./class/Holon");
var HolonClient_1 = require("./class/HolonClient");
var HolonToken_1 = require("./class/HolonToken");
var config_json_1 = __importDefault(require("./config/config.json"));
function getHolon(_holonControllerAddress, _provider) {
    return __awaiter(this, void 0, void 0, function () {
        var holon, holonName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    holon = new Holon_1.Holon(_holonControllerAddress, _provider);
                    return [4 /*yield*/, holon.getName()];
                case 1:
                    holonName = _a.sent();
                    console.log('Holon Name: ' + holonName);
                    return [2 /*return*/, holon];
            }
        });
    });
}
function getHolonToken(_holonTokenAddress, _provider) {
    return __awaiter(this, void 0, void 0, function () {
        var holonToken, tokenName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    holonToken = new HolonToken_1.HolonToken(_holonTokenAddress, _provider);
                    return [4 /*yield*/, holonToken.getName()];
                case 1:
                    tokenName = _a.sent();
                    console.log('Token Name: ' + tokenName);
                    return [2 /*return*/, holonToken];
            }
        });
    });
}
function injectProvider() {
    var providerAddress = config_json_1.default.web3host;
    var httpProvider = new Web3_1.default.providers.HttpProvider(providerAddress);
    return new HolonClient_1.HolonClient(new Web3_1.default(httpProvider));
}
function initExample() {
    return __awaiter(this, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = injectProvider();
                    return [4 /*yield*/, getHolon(config_json_1.default.holonController, provider)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getHolonToken(config_json_1.default.holonToken, provider)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
initExample();
