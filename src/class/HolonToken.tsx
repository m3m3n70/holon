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
    private holonToken: HolonTokenType;
    private tokenName: string;
    private tokenSymbol: string;
    private tokenCap: number;
    private tokenTotalSupply: number;
    private owner: string;

    constructor(_provider: Web3Provider, _holonTokenAddress: string) {
        this.provider = _provider;
        this.holonTokenAddress = _holonTokenAddress;
    }

    public async initializeExistingToken() {
        try {
            await this.setHolonToken();
            await this.setName();
            await this.setSymbol();
            await this.setCap();
            await this.setTotalSupply();
            await this.setOwner();
        } catch (e) {
            console.error(e);
        }
    }

    private async setHolonToken() {
        this.holonToken = await new this.provider.eth.Contract(HolonTokenABI, this.holonTokenAddress);
    }

    private async setName() {
        this.tokenName = await this.holonToken.methods.name().call();
    }

    private async setSymbol() {
        this.tokenSymbol = await this.holonToken.methods.symbol().call();
    }

    private async setCap() {
        this.tokenCap = await this.holonToken.methods.cap().call();
        this.tokenCap = Number(this.tokenCap);
    }

    private async setTotalSupply() {
        this.tokenTotalSupply = await this.holonToken.methods.totalSupply().call();
        this.tokenTotalSupply = Number(this.tokenTotalSupply);
    }

    private async setOwner() {
        this.owner = await this.holonToken.methods.owner().call();
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
        let balance = await this.holonToken.methods.balanceOf(_address).call();
        let strNumber = parseInt(balance);
        return strNumber;
    }

    public getOwner() {
        this.holonToken.methods.owner().call();
        return this.owner;
    }
}