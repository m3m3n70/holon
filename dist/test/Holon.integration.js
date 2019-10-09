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
var Holon_1 = require("../class/Holon");
var config_json_1 = __importDefault(require("../config/config.json"));
var HolonClient_1 = require("../class/HolonClient");
expect.extend({
    toBeType: function (received, argument) {
        var initialType = typeof received;
        var type = initialType === 'object' ? Array.isArray(received) ? 'array' : initialType : initialType;
        return type === argument ? {
            message: function () { return "expected " + received + " to be type " + argument; },
            pass: true,
        } : {
            message: function () { return "expected " + received + " to be type " + argument; },
            pass: false,
        };
    },
});
describe('Test methods with existing Holon', function () {
    var subject = function () {
        var providerAddress = config_json_1.default.web3host;
        var httpProvider = new Web3_1.default.providers.HttpProvider(providerAddress);
        var provider = new HolonClient_1.HolonClient(new Web3_1.default(httpProvider));
        return new Holon_1.Holon(config_json_1.default.holonController, provider);
    };
    test('Holon is initialized with a Provider', function () { return __awaiter(void 0, void 0, void 0, function () {
        var currentProvider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, subject().getProvider()];
                case 1:
                    currentProvider = _a.sent();
                    expect(currentProvider).toHaveProperty('eth');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Holon has a Controller Address', function () {
        expect(subject().getControllerAddress()).toBeDefined();
    });
    test('Holon has a Holon Address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, subject().getAddress()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Holon has a Primary Token Address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, subject().getPrimaryTokenAddress()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
