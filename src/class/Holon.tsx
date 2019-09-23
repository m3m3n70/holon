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
    private holonName: string;
    private holonAddress: string; 
    private primaryTokenAddress: string;
    private controllerAddress: string;
    private holonControllerInstance: HolonControllerType;

    constructor(provider: () => Web3Provider) {
        this.provider = provider();
    }

    public async initializeExistingHolon(_holonControllerAddress: string) {
        try {
            this.controllerAddress = _holonControllerAddress;
            this.holonControllerInstance = await new this.provider.eth.Contract(HolonControllerABI, this.controllerAddress);
            this.holonAddress = await this.holonControllerInstance.methods.dao().call();
            this.primaryTokenAddress = await this.holonControllerInstance.methods.daoToken().call();
            this.controllerAddress = this.holonControllerInstance._address;
            await this.initHolon(this.holonAddress);
        } catch (e) {
            console.error(e);
        }
    }

    private async initHolon(_holonAddress: string) {
        let holon = await new this.provider.eth.Contract(HolonABI, _holonAddress);
        this.holonName = await holon.methods.daoName().call();
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
        return this.holonControllerInstance.methods.getNeurons().call();
    }

    // To Implement:
    // new token
}