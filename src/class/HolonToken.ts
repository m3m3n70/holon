import HolonTokenABI from '../abi/HolonToken.json';
import { Web3Provider } from './Web3Provider';

interface HolonTokenType {
  methods: {
    name(): { call(): string },
    symbol(): { call(): string },
    cap(): { call(): number },
    totalSupply(): { call(): number },
    daoToken(): { call(): string },
    balanceOf(address: string): { call(): string },
    owner(): { call(): string },
  };
}

export class HolonToken {
  // @ts-ignore: TS2564 - no initializer
  private holonToken: HolonTokenType;

  constructor(private holonTokenAddress: string, private provider: Web3Provider) { }

  public async getName() {
    if (!this.holonToken) {
      this.initializeExistingToken();
    }

    return await this.holonToken.methods.name().call();
  }

  public async getSymbol() {
    if (!this.holonToken) {
      this.initializeExistingToken();
    }

    return await this.holonToken.methods.symbol().call();
  }

  public async getCap() {
    if (!this.holonToken) {
      this.initializeExistingToken();
    }

    return Number(await this.holonToken.methods.cap().call());
  }

  public async getTotalSupply() {
    if (!this.holonToken) {
      this.initializeExistingToken();
    }

    return Number(await this.holonToken.methods.totalSupply().call());
  }

  public getAddress() {
    return this.holonTokenAddress;
  }

  public async getBalanceOf(_address: string) {
    const balance = await this.holonToken.methods.balanceOf(_address).call();
    const strNumber = parseInt(balance);
    return strNumber;
  }

  private initializeExistingToken() {
    try {
      this.holonToken = new this.provider.eth.Contract(HolonTokenABI, this.holonTokenAddress);
    } catch (e) {
      console.error(e);
    }
  }
}
