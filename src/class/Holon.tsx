import { Web3Provider } from "./Web3Provider";
import { HolonController } from "./HolonController";

export interface HolonInterface {
    getProvider: () => Web3Provider;
    getHolonName: () => string;
    getControllerAddress: () => string;
    getHolonAddress: () => string;
    getPrimaryTokenAddress: () => string;
    getNeurons: () => Array<any>;
}

export class Holon implements HolonInterface {
    private provider: Web3Provider;
    private controllerAddress: string;
    private controller: HolonController;
    private holonAddress: string; 
    private holonName: string;
    private primaryTokenAddress: string;

    constructor(_provider: Web3Provider, _controllerAddress: string) {
        this.provider = _provider;
        this.controllerAddress = _controllerAddress;
    }

    public async initializeExistingHolon() {
        try {
            await this.setController();
            await this.setHolonAddress();
            await this.setHolonName();
            await this.setPrimaryTokenAddress();
        } catch (e) {
            console.error(e);
        }
    }

    private async setController() {
        this.controller = await new HolonController(this.provider, this.controllerAddress);
        await this.controller.initializeHolonController();
    }

    private async setHolonAddress() {
        this.holonAddress = await this.controller.getHolonAddress();
    }

    private async setHolonName() {
        this.holonName = await this.controller.getHolonName();
    }

    private async setPrimaryTokenAddress() {
        this.primaryTokenAddress = await this.controller.getPrimaryTokenAddress();
    }

    public getProvider() {
        return this.provider;
    }
    
    public getHolonName() {
        return this.holonName;
    }   

    public getControllerAddress() {
        return this.controllerAddress;
    }

    public getHolonAddress() {
        return this.holonAddress;
    }

    public getPrimaryTokenAddress() {
        return this.primaryTokenAddress;
    }

    public getNeurons() {
        return this.controller.getNeurons();
    }

    // To Implement:
    //   new Token
    //   new Smart Token
    //   update primaryToken
}