import Web3 from 'Web3';
import { Holon } from './Holon';
export declare enum ContractType {
    Holon = "holon",
    HolonToken = "holon-token",
    HolonController = "holon-controller"
}
export interface ContractProvider {
    getContract: (contractType: ContractType, address: string) => Web3.eth.Contract;
}
export declare class HolonClient implements ContractProvider {
    private provider;
    constructor(provider: Web3);
    getHolon(address: string): Holon;
    getContract(contractType: ContractType, address: string): Web3.eth.Contract;
    private getABI;
}
