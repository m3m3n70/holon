import { Holon } from '../class/Holon';
import { HolonController } from '../class/HolonController';

const getHolonName = jest.fn();
const getPrimaryToken = jest.fn();

jest.mock('../class/HolonController', () => ({
  HolonController: jest.fn().mockImplementation(() => {
    return { getHolonName, getPrimaryToken };
  }),
}));

describe('Holon', () => {
  const subject = (address: string = '') => {
    return new Holon(address, {} as any);
  };

  beforeEach(() => jest.clearAllMocks());

  test('it gets name from controller', async () => {
    const holon = subject();

    getHolonName.mockResolvedValue(name);

    expect(await holon.getName()).toEqual(name);
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

  test('it only creates a single controller when getting token', async () => {
    const holon = subject();

    await holon.getPrimaryToken();
    await holon.getPrimaryToken();

    expect(HolonController).toHaveBeenCalledTimes(1);
  });
});
