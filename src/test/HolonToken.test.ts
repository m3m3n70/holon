import { HolonToken } from '../class/HolonToken';

const mockNameCall = jest.fn();
const mockCapCall = jest.fn();
const mockTotalSupplyCall = jest.fn();
const mockSymbolCall = jest.fn();
const tokenContract = {
  methods: {
    name: () => ({ call: mockNameCall }),
    symbol: () => ({ call: mockSymbolCall }),
    cap: () => ({ call: mockCapCall }),
    totalSupply: () => ({ call: mockTotalSupplyCall }),
  },
};

const provider = {
  Contract: jest.fn().mockImplementation((_abi, _address: string) => {
    return tokenContract;
  }),
};

describe('HolonToken', () => {
  const subject = (address: string = '') => {
    return new HolonToken(address, { eth: provider } as any);
  };

  beforeEach(() => jest.clearAllMocks());

  test('it gets name from contract', async () => {
    const name = 'Infinity';

    const token = subject();

    mockNameCall.mockResolvedValue(name);

    expect(await token.getName()).toBe(name);
  });

  test('it gets symbol from contract', async () => {
    const symbol = 'INF';

    const token = subject();

    mockSymbolCall.mockResolvedValue(symbol);

    expect(await token.getSymbol()).toBe(symbol);
  });

  test('it gets cap as number from contract', async () => {
    const token = subject();

    mockCapCall.mockResolvedValue('31145');

    expect(await token.getCap()).toBe(31145);
  });

  test('it gets total supply as number from contract', async () => {
    const token = subject();

    mockTotalSupplyCall.mockResolvedValue('3114543');

    expect(await token.getTotalSupply()).toBe(3114543);
  });

  test('it does not create multiple contracts when getting all token data', async () => {
    const token = subject();

    await token.getName();
    await token.getSymbol();
    await token.getCap();
    await token.getTotalSupply();

    expect(provider.Contract).toHaveBeenCalledTimes(1);
  });
});
