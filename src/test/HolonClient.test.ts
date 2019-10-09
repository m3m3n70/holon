import HolonABI from '../abi/Holon.json';
import HolonTokenABI from '../abi/HolonToken.json';
import HolonControllerABI from '../abi/HolonController.json';

import { HolonClient, ContractType } from '../class/HolonClient';
import { Holon } from '../class/Holon';

jest.mock('../class/Holon', () => ({ Holon: jest.fn().mockImplementation() }));

const controllerContract = { methods: { dao: () => undefined } };

const eth = { Contract: jest.fn().mockImplementation() };

describe('HolonClient', () => {
  const subject = () => {
    return new HolonClient({ eth });
  };

  beforeEach(() => jest.clearAllMocks());

  test('it creates a new holon for address', () => {
    const address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const client = subject();

    client.getHolon(address);

    expect(Holon).toHaveBeenCalledWith(address, client);
  });

  test('it returns new Holon', () => {
    const client = subject();

    const holon = client.getHolon('0x0D1C97113D70E4D04345D55807CB19C648E17FBA');

    expect(holon).toBeInstanceOf(Holon);
  });

  test('it creates new controller contract for controller address', async () => {
    const controllerAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const client = subject();

    client.getContract(ContractType.HolonController, controllerAddress);

    expect(eth.Contract).toHaveBeenCalledWith(HolonControllerABI, controllerAddress);
  });

  test('it creates new Holon contract for Holon address', async () => {
    const address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const client = subject();

    client.getContract(ContractType.Holon, address);

    expect(eth.Contract).toHaveBeenCalledWith(HolonABI, address);
  });

  test('it creates new HolonToken contract for HolonToken address', async () => {
    const address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const client = subject();

    client.getContract(ContractType.HolonToken, address);

    expect(eth.Contract).toHaveBeenCalledWith(HolonTokenABI, address);
  });

  test('it throws for invalid contract type', async () => {
    const client = subject();

    const getInvalidContract = () => {
      client.getContract('cats' as ContractType, '0x0D1C97113D70E4D04345D55807CB19C648E17FBA');
    };

    expect(getInvalidContract).toThrow();
  });

  test('it returns new contract', async () => {
    const client = subject();

    const contract = client.getContract(ContractType.HolonController, '0x0D1C97113D70E4D04345D55807CB19C648E17FBA');

    expect(contract).toBeInstanceOf(eth.Contract);
  });
});
