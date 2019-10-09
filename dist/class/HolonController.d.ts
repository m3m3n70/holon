import { ContractProvider } from '../class/HolonClient';
import { HolonToken } from './HolonToken';
export declare class HolonController {
    private controllerAddress;
    private provider;
    private controller;
    private holon;
    private holonAddress;
    constructor(controllerAddress: string, provider: ContractProvider);
    getHolonName(): Promise<string>;
    getControllerAddress(): string;
    getHolonAddress(): Promise<string>;
    getPrimaryToken(): Promise<HolonToken>;
    getPrimaryTokenAddress(): Promise<string>;
    private initializeHolonController;
}
