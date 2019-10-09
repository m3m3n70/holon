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
var Holon_json_1 = __importDefault(require("../abi/Holon.json"));
var HolonToken_json_1 = __importDefault(require("../abi/HolonToken.json"));
var HolonController_json_1 = __importDefault(require("../abi/HolonController.json"));
var HolonClient_1 = require("../class/HolonClient");
var Holon_1 = require("../class/Holon");
jest.mock('../class/Holon', function () { return ({ Holon: jest.fn().mockImplementation() }); });
var controllerContract = { methods: { dao: function () { return undefined; } } };
var eth = { Contract: jest.fn().mockImplementation() };
describe('HolonClient', function () {
    var subject = function () {
        return new HolonClient_1.HolonClient({ eth: eth });
    };
    beforeEach(function () { return jest.clearAllMocks(); });
    test('it creates a new holon for address', function () {
        var address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
        var client = subject();
        client.getHolon(address);
        expect(Holon_1.Holon).toHaveBeenCalledWith(address, client);
    });
    test('it returns new Holon', function () {
        var client = subject();
        var holon = client.getHolon('0x0D1C97113D70E4D04345D55807CB19C648E17FBA');
        expect(holon).toBeInstanceOf(Holon_1.Holon);
    });
    test('it creates new controller contract for controller address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var controllerAddress, client;
        return __generator(this, function (_a) {
            controllerAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
            client = subject();
            client.getContract(HolonClient_1.ContractType.HolonController, controllerAddress);
            expect(eth.Contract).toHaveBeenCalledWith(HolonController_json_1.default, controllerAddress);
            return [2 /*return*/];
        });
    }); });
    test('it creates new Holon contract for Holon address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var address, client;
        return __generator(this, function (_a) {
            address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
            client = subject();
            client.getContract(HolonClient_1.ContractType.Holon, address);
            expect(eth.Contract).toHaveBeenCalledWith(Holon_json_1.default, address);
            return [2 /*return*/];
        });
    }); });
    test('it creates new HolonToken contract for HolonToken address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var address, client;
        return __generator(this, function (_a) {
            address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
            client = subject();
            client.getContract(HolonClient_1.ContractType.HolonToken, address);
            expect(eth.Contract).toHaveBeenCalledWith(HolonToken_json_1.default, address);
            return [2 /*return*/];
        });
    }); });
    test('it throws for invalid contract type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, getInvalidContract;
        return __generator(this, function (_a) {
            client = subject();
            getInvalidContract = function () {
                client.getContract('cats', '0x0D1C97113D70E4D04345D55807CB19C648E17FBA');
            };
            expect(getInvalidContract).toThrow();
            return [2 /*return*/];
        });
    }); });
    test('it returns new contract', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, contract;
        return __generator(this, function (_a) {
            client = subject();
            contract = client.getContract(HolonClient_1.ContractType.HolonController, '0x0D1C97113D70E4D04345D55807CB19C648E17FBA');
            expect(contract).toBeInstanceOf(eth.Contract);
            return [2 /*return*/];
        });
    }); });
});
