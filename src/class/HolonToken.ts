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

  public async getTokenName() {
    return await this.holonToken.methods.name().call();
  }

  public async getTokenSymbol() {
    return await this.holonToken.methods.symbol().call();
  }

  public async getTokenCap() {
    return Number(await this.holonToken.methods.cap().call());
  }

  public async getTokenTotalSupply() {
    return Number(await this.holonToken.methods.totalSupply().call());
  }

  public async getBalanceOf(_address: string) {
    const balance = await this.holonToken.methods.balanceOf(_address).call();
    const strNumber = parseInt(balance);
    return strNumber;
  }
}
