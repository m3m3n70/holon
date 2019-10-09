import { ContractProvider } from '../class/HolonClient';
export declare class HolonToken {
    private holonTokenAddress;
    private provider;
    private _contract;
    constructor(holonTokenAddress: string, provider: ContractProvider);
    getName(): Promise<string>;
    getSymbol(): Promise<string>;
    getCap(): Promise<number>;
    getTotalSupply(): Promise<number>;
    getAddress(): string;
    getBalanceOf(_address: string): Promise<number>;
    private readonly contract;
}
