import { HolonController } from './HolonController';
import { ContractProvider } from './HolonClient';

export class Holon {
  // @ts-ignore: TS2564 - no initializer
  private _controller: HolonController;

  constructor(private controllerAddress: string, private provider: ContractProvider) { }

  public getProvider() {
    return this.provider;
  }

  public async getName() {
    return this.controller.getHolonName();
  }

  public async getPrimaryToken() {
    return await this.controller.getPrimaryToken();
  }

  public getControllerAddress() {
    return this.controllerAddress;
  }

  public async getAddress() {
    return await this.controller.getHolonAddress();
  }

  public async getPrimaryTokenAddress() {
    return await this.controller.getPrimaryTokenAddress();
  }

  private get controller() {
    if (!this._controller) {
      this._controller = new HolonController(this.controllerAddress, this.provider);
    }

    return this._controller;
  }
}
