import HolonTokenABI from "../abi/HolonToken.json";
import { Web3Provider } from "./Web3Provider";

export interface HolonTokenType {
    methods: {
        name(): { call(): string },
        symbol(): { call(): string },
        cap(): { call(): number },
        totalSupply(): { call(): number },
        daoToken(): { call(): string },
        balanceOf(address: string): { call(): string },
        owner(): { call(): string }
    };
}

export interface HolonTokenInterface {
    initializeExistingToken: (_holonTokenAddress: string) => Object;
    getProvider: () => Web3Provider;
    getTokenName: () => string;
    getTokenSymbol: () => string;
    getTokenCap: () => number;
    getTokenTotalSupply: () => number;
    getBalanceOf: (address: string) => Promise<Number>;
}

export class HolonToken implements HolonTokenInterface {
    private provider: Web3Provider;
    private holonTokenAddress: string;
    private holonTokenInstance: HolonTokenType;
    private tokenName: string;
    private tokenSymbol: string;
    private tokenCap: number;
    private tokenTotalSupply: number;
    private owner: string;

    constructor(provider: () => Web3Provider) {
        this.provider = provider();
    }

    public async initializeExistingToken(_holonTokenAddress: string) {
        try {
            this.holonTokenAddress = _holonTokenAddress;
            this.holonTokenInstance = await new this.provider.eth.Contract(HolonTokenABI, this.holonTokenAddress);
            this.tokenName = await this.holonTokenInstance.methods.name().call();
            this.tokenSymbol = await this.holonTokenInstance.methods.symbol().call();
            this.tokenCap = await this.holonTokenInstance.methods.cap().call();
            this.tokenCap = Number(this.tokenCap);
            this.tokenTotalSupply = await this.holonTokenInstance.methods.totalSupply().call();
            this.tokenTotalSupply = Number(this.tokenTotalSupply);
            this.owner = await this.holonTokenInstance.methods.owner().call();
            return this.holonTokenInstance;
        } catch (e) {
            console.error(e);
        }
    }

    public getProvider() {
        return this.provider;
    }

    public getAddress() {
        return this.holonTokenAddress;
    }

    public getTokenName()  {
        return this.tokenName;
    }   

    public getTokenSymbol() {
        return this.tokenSymbol;
    }

    public getTokenCap() {
        return this.tokenCap;
    }

    public getTokenTotalSupply() {
        return this.tokenTotalSupply;
    }

    public async getBalanceOf(_address: string) {
        let balance = await this.holonTokenInstance.methods.balanceOf(_address).call();
        let strNumber = parseInt(balance);
        return strNumber;
    }

    public getOwner() {
        this.holonTokenInstance.methods.owner().call();
        return this.owner;
    }
}