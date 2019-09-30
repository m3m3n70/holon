import HolonABI from "../abi/Holon.json";
import HolonControllerABI from "../abi/HolonController.json";
import { Web3Provider } from "./Web3Provider";

export interface HolonControllerType {
    methods: {
        dao(): { call(): string },
        daoToken(): { call(): string },
        getNeurons(): { call(): Array<any> }
    };
    _address: string;
}

export interface HolonType {
    methods: {
        daoName(): { call(): string }
    }
}

export interface HolonInterface {
    getHolonName: () => string;
    getControllerAddress: () => Promise<string>;
    getHolonAddress: () => Promise<string>;
    getPrimaryTokenAddress: () => Promise<string>;
}

export class HolonController implements HolonInterface {
    private controller: HolonControllerType;
    private holon: HolonType;
    private holonAddress: string; 
    private holonName: string;
    private primaryTokenAddress: string;

    constructor(private controllerAddress: string, private provider: Web3Provider, ) {}

    public async initializeHolonController() {
        try {
            this.controller = await new this.provider.eth.Contract(HolonControllerABI, this.controllerAddress);
            this.holonAddress = await this.controller.methods.dao().call();
            this.holon = await new this.provider.eth.Contract(HolonABI, this.holonAddress);
            this.holonName = await this.holon.methods.daoName().call();
        } catch (e) {
            console.error(e);
        }
    }

    public getHolonName() {
        return this.holonName;
    }   

    public async getControllerAddress() {
        this.controllerAddress = this.controller._address;
        return this.controllerAddress;
    }

    public async getHolonAddress() {
        return this.holonAddress;
    }

    public async getPrimaryTokenAddress() {
        this.primaryTokenAddress = await this.controller.methods.daoToken().call();
        return this.primaryTokenAddress;
    }

}