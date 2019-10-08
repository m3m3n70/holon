import { Web3Provider } from './Web3Provider';
import { HolonController } from './HolonController';

export class Holon {
  // @ts-ignore: TS2564 - no initializer
  private controller: HolonController;

  constructor(private controllerAddress: string, private provider: Web3Provider) { }

  public getProvider() {
    return this.provider;
  }

  public async getName() {
    if (!this.controller) {
      await this.initializeExistingHolon();
    }

    return this.controller.getHolonName();
  }

  public async getPrimaryToken() {
    if (!this.controller) {
      await this.initializeExistingHolon();
    }

    return await this.controller.getPrimaryToken();
  }

  public getControllerAddress() {
    return this.controllerAddress;
  }

  public async getAddress() {
    if (!this.controller) {
      await this.initializeExistingHolon();
    }

    return await this.controller.getHolonAddress();
  }

  public async getPrimaryTokenAddress() {
    if (!this.controller) {
      await this.initializeExistingHolon();
    }

    return await this.controller.getPrimaryTokenAddress();
  }

  private async initializeExistingHolon() {
    try {
      this.controller = new HolonController(this.controllerAddress, this.provider);
    } catch (e) {
      console.error(e);
    }
  }
}
