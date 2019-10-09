import Web3 from 'Web3';
import HolonControllerABI from '../abi/HolonController.json';
import HolonABI from '../abi/Holon.json';
import HolonTokenABI from '../abi/HolonToken.json';

import { Holon } from './Holon';

export enum ContractType {
  Holon = 'holon',
  HolonToken = 'holon-token',
  HolonController = 'holon-controller',
}

export interface ContractProvider {
  getContract: (contractType: ContractType, address: string) => Web3.eth.Contract;
}

export class HolonClient implements ContractProvider {
  constructor(private provider: Web3) { }

  public getHolon(address: string): Holon {
    return new Holon(address, this as any); // XXX - remove 'as any'
  }

  public getContract(contractType: ContractType, address: string): Web3.eth.Contract { // web3.eth.Contract
    return new this.provider.eth.Contract(this.getABI(contractType), address);
  }

  private getABI(contractType: ContractType) {
    switch (contractType) {
      case ContractType.HolonController:
        return HolonControllerABI;
      case ContractType.Holon:
        return HolonABI;
      case ContractType.HolonToken:
        return HolonTokenABI;
      default:
        throw new Error('Invalid contract type.');
    }
  }
}
