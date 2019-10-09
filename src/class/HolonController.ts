import { ContractProvider, ContractType } from '../class/HolonClient';
import { HolonToken } from './HolonToken';

interface HolonControllerType {
  methods: {
    dao(): { call(): string },
    daoToken(): { call(): string },
    getNeurons(): { call(): any[] },
  };
  _address: string;
}

interface HolonType {
  methods: {
    daoName(): { call(): string },
  };
}

export class HolonController {
  // @ts-ignore: TS2564 - no initializer
  private controller: HolonControllerType;
  // @ts-ignore: TS2564 - no initializer
  private holon: HolonType;
  // @ts-ignore: TS2564 - no initializer
  private holonAddress: string;

  constructor(private controllerAddress: string, private provider: ContractProvider) { }

  public async getHolonName() {
    await this.initializeHolonController();

    return await this.holon.methods.daoName().call();
  }

  public getControllerAddress() {
    this.controllerAddress = this.controller._address;
    return this.controllerAddress;
  }

  public async getHolonAddress() {
    await this.initializeHolonController();

    return this.holonAddress;
  }

  public async getPrimaryToken() {
    return new HolonToken(await this.getPrimaryTokenAddress(), this.provider);
  }

  public async getPrimaryTokenAddress() {
    await this.initializeHolonController();

    return await this.controller.methods.daoToken().call();
  }

  private async initializeHolonController() {
    try {
      this.controller = this.provider.getContract(ContractType.HolonController, this.controllerAddress);
      this.holonAddress = await this.controller.methods.dao().call();
      this.holon = this.provider.getContract(ContractType.Holon, this.holonAddress);
    } catch (e) {
      console.error(e);
    }
  }
}
