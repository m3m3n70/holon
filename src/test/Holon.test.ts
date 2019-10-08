import { Holon } from '../class/Holon';
import { HolonController } from '../class/HolonController';

const getHolonName = jest.fn();
const getHolonAddress = jest.fn();
const getPrimaryToken = jest.fn();
const getPrimaryTokenAddress = jest.fn();

jest.mock('../class/HolonController', () => ({
  HolonController: jest.fn().mockImplementation(() => {
    return { getHolonName, getHolonAddress, getPrimaryToken, getPrimaryTokenAddress };
  }),
}));

describe('Holon', () => {
  const subject = (address: string = '') => {
    return new Holon(address, {} as any);
  };

  beforeEach(() => jest.clearAllMocks());

  test('it gets name from controller', async () => {
    const name = 'carl';
    const holon = subject();

    getHolonName.mockResolvedValue(name);

    expect(await holon.getName()).toBe(name);
  });

  test('it gets address from controller', async () => {
    const holonAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const holon = subject();

    getHolonAddress.mockResolvedValue(holonAddress);

    expect(await holon.getAddress()).toBe(holonAddress);
  });

  test('it only creates a single controller when getting name', async () => {
    const holon = subject();

    getHolonName.mockResolvedValue(name);

    await holon.getName();
    await holon.getName();

    expect(HolonController).toHaveBeenCalledTimes(1);
  });

  test('it gets primary token from controller', async () => {
    const token = { symbol: 'TOK' };
    const holon = subject();

    getPrimaryToken.mockResolvedValue(token);

    expect(await holon.getPrimaryToken()).toBe(token);
  });

  test('it gets primary token address from controller', async () => {
    const tokenAddress = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';

    const holon = subject();

    getPrimaryTokenAddress.mockResolvedValue(tokenAddress);

    expect(await holon.getPrimaryTokenAddress()).toBe(tokenAddress);
  });

  test('it only creates a single controller when getting token', async () => {
    const holon = subject();

    await holon.getPrimaryToken();
    await holon.getPrimaryToken();

    expect(HolonController).toHaveBeenCalledTimes(1);
  });
});
