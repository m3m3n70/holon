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
  // @ts-ignore: TS2564 - no initializer
  private holonName: string;

  constructor(private controllerAddress: string, private provider: Web3Provider) { }

  public async initializeHolonController() {
    try {
      this.controller = await new this.provider.eth.Contract(HolonControllerABI, this.controllerAddress);
      this.holonAddress = await this.controller.methods.dao().call();
      this.holon = await new this.provider.eth.Contract(HolonABI, this.holonAddress);
      this.holonName = await this.holon.methods.daoName().call();
    } catch (e) {
      console.error(e);
    }
  }

  public getHolonName() {
    return this.holonName;
  }

  public getControllerAddress() {
    this.controllerAddress = this.controller._address;
    return this.controllerAddress;
  }

  public getHolonAddress() {
    return this.holonAddress;
  }

  public async getPrimaryTokenAddress() {
    return await this.controller.methods.daoToken().call();
  }
}
