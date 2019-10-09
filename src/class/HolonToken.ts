import { ContractProvider, ContractType } from '../class/HolonClient';

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
  private _contract: HolonTokenType;

  constructor(private holonTokenAddress: string, private provider: ContractProvider) { }

  public async getName() {
    return await this.contract.methods.name().call();
  }

  public async getSymbol() {
    return await this.contract.methods.symbol().call();
  }

  public async getCap() {
    return Number(await this.contract.methods.cap().call());
  }

  public async getTotalSupply() {
    return Number(await this.contract.methods.totalSupply().call());
  }

  public getAddress() {
    return this.holonTokenAddress;
  }

  public async getBalanceOf(_address: string) {
    const balance = await this.contract.methods.balanceOf(_address).call();
    const strNumber = parseInt(balance);
    return strNumber;
  }

  private get contract() {
    if (!this._contract) {
      this._contract = this.provider.getContract(ContractType.HolonToken, this.holonTokenAddress);
    }

    return this._contract;
  }
}
