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
    getTokenName: () => Promise<string>;
    getTokenSymbol: () => Promise<string>;
    getTokenCap: () => Promise<number>;
    getTokenTotalSupply: () => Promise<number>;
    getBalanceOf: (address: string) => Promise<Number>;
}

export class HolonToken implements HolonTokenInterface {
    private holonToken: HolonTokenType;
    private tokenName: string;
    private tokenSymbol: string;
    private tokenCap: number;
    private tokenTotalSupply: number;

    constructor(private holonTokenAddress: string, private provider: Web3Provider, ) {}

    public async initializeExistingToken() {
        try {
            this.holonToken = await new this.provider.eth.Contract(HolonTokenABI, this.holonTokenAddress);
        } catch (e) {
            console.error(e);
        }
    }

    public getAddress() {
        return this.holonTokenAddress;
    }

    public async getTokenName()  {
        this.tokenName = await this.holonToken.methods.name().call();
        return this.tokenName;
    }   

    public async getTokenSymbol() {
        this.tokenSymbol = await this.holonToken.methods.symbol().call();
        return this.tokenSymbol;
    }

    public async getTokenCap() {
        this.tokenCap = await this.holonToken.methods.cap().call();
        this.tokenCap = Number(this.tokenCap);
        return this.tokenCap;
    }

    public async getTokenTotalSupply() {
        this.tokenTotalSupply = await this.holonToken.methods.totalSupply().call();
        this.tokenTotalSupply = Number(this.tokenTotalSupply);
        return this.tokenTotalSupply;
    }

    public async getBalanceOf(_address: string) {
        let balance = await this.holonToken.methods.balanceOf(_address).call();
        let strNumber = parseInt(balance);
        return strNumber;
    }

}