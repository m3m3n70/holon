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
    getProvider: () => Web3Provider;
    getHolonName: () => string;
    getControllerAddress: () => string;
    getHolonAddress: () => string;
    getPrimaryTokenAddress: () => string;
    getNeurons: () => Array<any>;
}

export class HolonController implements HolonInterface {
    private provider: Web3Provider;
    private controller: HolonControllerType;
    private controllerAddress: string;
    private holon: HolonType;
    private holonAddress: string; 
    private holonName: string;
    private primaryTokenAddress: string;

    constructor(_provider: Web3Provider, _controllerAddress: string) {
        this.provider = _provider;
        this.controllerAddress = _controllerAddress
    }

    public async initializeHolonController() {
        try {
            await this.setHolonControllerInstance();
            await this.setHolonAddress();
            await this.setPrimaryTokenAddress();
            await this.setControllerAddress();
            await this.setHolonContract();
        } catch (e) {
            console.error(e);
        }
    }

    private async setHolonControllerInstance() {
        this.controller = await new this.provider.eth.Contract(HolonControllerABI, this.controllerAddress);
    }

    private async setHolonAddress() {
        this.holonAddress = await this.controller.methods.dao().call();
    }

    private async setPrimaryTokenAddress() {
        this.primaryTokenAddress = await this.controller.methods.daoToken().call();
    }

    private async setControllerAddress() {
        this.controllerAddress = this.controller._address;
    }

    private async setHolonContract() {
        this.holon = await new this.provider.eth.Contract(HolonABI, this.holonAddress);
        this.holonName = await this.holon.methods.daoName().call();
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
        return this.controller.methods.getNeurons().call();
    }

    // To Implement:
    // new token
    // update default token
}