import HolonABI from '../abi/Holon.json';
import HolonControllerABI from '../abi/HolonController.json';
import { Web3Provider } from './Web3Provider';

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

  constructor(private controllerAddress: string, private provider: Web3Provider) { }

  public async initializeHolonController() {
    try {
      this.controller = new this.provider.eth.Contract(HolonControllerABI, this.controllerAddress);
      this.holonAddress = await this.controller.methods.dao().call();
      this.holon = new this.provider.eth.Contract(HolonABI, this.holonAddress);
    } catch (e) {
      console.error(e);
    }
  }

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

  public getPrimaryToken() {
    return '';
  }

  public async getPrimaryTokenAddress() {
    return await this.controller.methods.daoToken().call();
  }
}
