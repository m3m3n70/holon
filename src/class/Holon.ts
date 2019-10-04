import { Web3Provider } from './Web3Provider';
import { HolonController } from './HolonController';

export interface HolonInterface {
    getProvider: () => Web3Provider;
    getHolonName: () => Promise<string>;
    getControllerAddress: () => string;
    getHolonAddress: () => Promise<string>;
    getPrimaryTokenAddress: () => Promise<string>;
    getNeurons: () => any[];
}

export class Holon implements HolonInterface {
    private controller: HolonController;
    private holonAddress: string;
    private holonName: string;
    private primaryTokenAddress: string;

    constructor(private controllerAddress: string, private provider: Web3Provider) {}

    public async initializeExistingHolon() {
        try {
            this.controller = await new HolonController(this.controllerAddress, this.provider);
            await this.controller.initializeHolonController();
        } catch (e) {
            console.error(e);
        }
    }

    public getProvider() {
        return this.provider;
    }

    public async getHolonName() {
        this.holonName = await this.controller.getHolonName();
        return this.holonName;
    }

    public getControllerAddress() {
        return this.controllerAddress;
    }

    public async getHolonAddress() {
        this.holonAddress = await this.controller.getHolonAddress();
        return this.holonAddress;
    }

    public async getPrimaryTokenAddress() {
        this.primaryTokenAddress = await this.controller.getPrimaryTokenAddress();
        return this.primaryTokenAddress;
    }

}
