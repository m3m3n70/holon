import { Web3Provider } from './Web3Provider';
import { HolonController } from './HolonController';

export interface HolonInterface {
    getProvider: () => Web3Provider;
    getHolonName: () => Promise<string>;
    getControllerAddress: () => string;
    getHolonAddress: () => Promise<string>;
    getPrimaryTokenAddress: () => Promise<string>;
}

export class Holon implements HolonInterface {
    // @ts-ignore: TS2564 - no initializer
    private controller: HolonController;

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
        return await this.controller.getHolonName();
    }

    public getControllerAddress() {
        return this.controllerAddress;
    }

    public async getHolonAddress() {
        return await this.controller.getHolonAddress();
    }

    public async getPrimaryTokenAddress() {
        return await this.controller.getPrimaryTokenAddress();
    }

}
