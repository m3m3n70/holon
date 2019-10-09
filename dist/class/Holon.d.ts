import { ContractProvider } from './HolonClient';
export declare class Holon {
    private controllerAddress;
    private provider;
    private _controller;
    constructor(controllerAddress: string, provider: ContractProvider);
    getProvider(): ContractProvider;
    getName(): Promise<string>;
    getPrimaryToken(): Promise<import("./HolonToken").HolonToken>;
    getControllerAddress(): string;
    getAddress(): Promise<string>;
    getPrimaryTokenAddress(): Promise<string>;
    private readonly controller;
}
