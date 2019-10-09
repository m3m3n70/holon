"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HolonController_json_1 = __importDefault(require("../abi/HolonController.json"));
var Holon_json_1 = __importDefault(require("../abi/Holon.json"));
var HolonToken_json_1 = __importDefault(require("../abi/HolonToken.json"));
var Holon_1 = require("./Holon");
var ContractType;
(function (ContractType) {
    ContractType["Holon"] = "holon";
    ContractType["HolonToken"] = "holon-token";
    ContractType["HolonController"] = "holon-controller";
})(ContractType = exports.ContractType || (exports.ContractType = {}));
var HolonClient = /** @class */ (function () {
    function HolonClient(provider) {
        this.provider = provider;
    }
    HolonClient.prototype.getHolon = function (address) {
        return new Holon_1.Holon(address, this); // XXX - remove 'as any'
    };
    HolonClient.prototype.getContract = function (contractType, address) {
        return new this.provider.eth.Contract(this.getABI(contractType), address);
    };
    HolonClient.prototype.getABI = function (contractType) {
        switch (contractType) {
            case ContractType.HolonController:
                return HolonController_json_1.default;
            case ContractType.Holon:
                return Holon_json_1.default;
            case ContractType.HolonToken:
                return HolonToken_json_1.default;
            default:
                throw new Error('Invalid contract type.');
        }
    };
    return HolonClient;
}());
exports.HolonClient = HolonClient;
