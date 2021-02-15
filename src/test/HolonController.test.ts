import { HolonController } from '../class/HolonController';
import { HolonToken } from '../class/HolonToken';
import { ContractProvider, ContractType } from '../class/HolonClient';

const mockDaoNameCall = jest.fn();
const mockDaoCall = jest.fn();
const mockDaoTokenCall = jest.fn();

const controllerContract = {
  methods: {
    dao: () => ({ call: mockDaoCall }),
    daoToken: () => ({ call: mockDaoTokenCall }),
  },
};

const holonContract = { methods: { daoName: () => ({ call: mockDaoNameCall }) } };

const contractProvider: ContractProvider = {
  getContract: jest.fn().mockImplementation((type, _address: string) => {
    if (type === ContractType.HolonController) {
      return controllerContract;
    } else if (type === ContractType.Holon) {
      return holonContract;
    }
  }),
};

jest.mock('../class/HolonToken', () => ({ HolonToken: jest.fn().mockImplementation() }));

describe('HolonController', () => {
  const subject = (address: string = '', provider: ContractProvider = contractProvider) => {
    return new HolonController(address, provider);
  };

  beforeEach(() => jest.clearAllMocks());

  test('it gets holon name from contract', async () => {
    const name = 'carl';
    const controller = subject();

    mockDaoNameCall.mockResolvedValue(name);

    expect(await controller.getHolonName()).toBe(name);
  });

  test('it gets holon address from contract', async () => {
    const address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
    const controller = subject();

    mockDaoCall.mockResolvedValue(address);

    expect(await controller.getHolonAddress()).toBe(address);
  });

  test('it gets controller contract for controller address', async () => {
    const controllerAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const controller = subject(controllerAddress);

    await controller.getHolonName();

    expect(contractProvider.getContract).toHaveBeenNthCalledWith(1, ContractType.HolonController, controllerAddress);
  });

  test('it gets controller contract for holon address', async () => {
    const holonAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const controller = subject();

    mockDaoCall.mockResolvedValue(holonAddress);

    await controller.getHolonName();

    expect(contractProvider.getContract).toHaveBeenNthCalledWith(2, ContractType.Holon, holonAddress);
  });

  test('it gets holon token for address', async () => {
    const tokenAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const controller = subject();

    mockDaoTokenCall.mockResolvedValue(tokenAddress);

    await controller.getPrimaryToken();

    expect(HolonToken).toHaveBeenCalledWith(tokenAddress, contractProvider);
  });

  test('it gets primary token address', async () => {
    const tokenAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const controller = subject();

    mockDaoTokenCall.mockResolvedValue(tokenAddress);

    expect(await controller.getPrimaryTokenAddress()).toBe(tokenAddress);
  });
});
