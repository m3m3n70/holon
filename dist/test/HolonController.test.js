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
Object.defineProperty(exports, "__esModule", { value: true });
var HolonController_1 = require("../class/HolonController");
var HolonToken_1 = require("../class/HolonToken");
var HolonClient_1 = require("../class/HolonClient");
var mockDaoNameCall = jest.fn();
var mockDaoCall = jest.fn();
var mockDaoTokenCall = jest.fn();
var controllerContract = {
    methods: {
        dao: function () { return ({ call: mockDaoCall }); },
        daoToken: function () { return ({ call: mockDaoTokenCall }); },
    },
};
var holonContract = { methods: { daoName: function () { return ({ call: mockDaoNameCall }); } } };
var contractProvider = {
    getContract: jest.fn().mockImplementation(function (type, _address) {
        if (type === HolonClient_1.ContractType.HolonController) {
            return controllerContract;
        }
        else if (type === HolonClient_1.ContractType.Holon) {
            return holonContract;
        }
    }),
};
jest.mock('../class/HolonToken', function () { return ({ HolonToken: jest.fn().mockImplementation() }); });
describe('HolonController', function () {
    var subject = function (address, provider) {
        if (address === void 0) { address = ''; }
        if (provider === void 0) { provider = contractProvider; }
        return new HolonController_1.HolonController(address, provider);
    };
    beforeEach(function () { return jest.clearAllMocks(); });
    test('it gets holon name from contract', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, controller, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    name = 'carl';
                    controller = subject();
                    mockDaoNameCall.mockResolvedValue(name);
                    _a = expect;
                    return [4 /*yield*/, controller.getHolonName()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(name);
                    return [2 /*return*/];
            }
        });
    }); });
    test('it gets holon address from contract', function () { return __awaiter(void 0, void 0, void 0, function () {
        var address, controller, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
                    controller = subject();
                    mockDaoCall.mockResolvedValue(address);
                    _a = expect;
                    return [4 /*yield*/, controller.getHolonAddress()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(address);
                    return [2 /*return*/];
            }
        });
    }); });
    test('it gets controller contract for controller address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var controllerAddress, controller;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    controllerAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
                    controller = subject(controllerAddress);
                    return [4 /*yield*/, controller.getHolonName()];
                case 1:
                    _a.sent();
                    expect(contractProvider.getContract).toHaveBeenNthCalledWith(1, HolonClient_1.ContractType.HolonController, controllerAddress);
                    return [2 /*return*/];
            }
        });
    }); });
    test('it gets controller contract for holon address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var holonAddress, controller;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    holonAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
                    controller = subject();
                    mockDaoCall.mockResolvedValue(holonAddress);
                    return [4 /*yield*/, controller.getHolonName()];
                case 1:
                    _a.sent();
                    expect(contractProvider.getContract).toHaveBeenNthCalledWith(2, HolonClient_1.ContractType.Holon, holonAddress);
                    return [2 /*return*/];
            }
        });
    }); });
    test('it gets holon token for address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenAddress, controller;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
                    controller = subject();
                    mockDaoTokenCall.mockResolvedValue(tokenAddress);
                    return [4 /*yield*/, controller.getPrimaryToken()];
                case 1:
                    _a.sent();
                    expect(HolonToken_1.HolonToken).toHaveBeenCalledWith(tokenAddress, contractProvider);
                    return [2 /*return*/];
            }
        });
    }); });
    test('it gets primary token address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenAddress, controller, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokenAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
                    controller = subject();
                    mockDaoTokenCall.mockResolvedValue(tokenAddress);
                    _a = expect;
                    return [4 /*yield*/, controller.getPrimaryTokenAddress()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(tokenAddress);
                    return [2 /*return*/];
            }
        });
    }); });
});
