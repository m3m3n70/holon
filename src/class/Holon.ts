import { Web3Provider } from './Web3Provider';
import { HolonController } from './HolonController';

export class Holon {
  // @ts-ignore: TS2564 - no initializer
  private controller: HolonController;

  constructor(private controllerAddress: string, private provider: Web3Provider) { }

  public async initializeExistingHolon() {
    try {
      this.controller = await new HolonController(this.controllerAddress, this.provider);
      await this.controller.initializeHolonController();
    } catch (e) {
      console.error(e);
    }
  }

  public getProvider() {
    return this.provider;
  }

  public getHolonName() {
    return this.controller.getHolonName();
  }

  public getControllerAddress() {
    return this.controllerAddress;
  }

  public getHolonAddress() {
    return this.controller.getHolonAddress();
  }

  public async getPrimaryTokenAddress() {
    return await this.controller.getPrimaryTokenAddress();
  }
}
