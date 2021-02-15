import { HolonToken } from '../class/HolonToken';
import { ContractProvider, ContractType } from '../class/HolonClient';

const mockNameCall = jest.fn();
const mockCapCall = jest.fn();
const mockTotalSupplyCall = jest.fn();
const mockSymbolCall = jest.fn();

const contractProvider: ContractProvider = {
  getContract: jest.fn().mockImplementation(() => ({
    methods: {
      name: () => ({ call: mockNameCall }),
      symbol: () => ({ call: mockSymbolCall }),
      cap: () => ({ call: mockCapCall }),
      totalSupply: () => ({ call: mockTotalSupplyCall }),
    },
  })),
};

describe('HolonToken', () => {
  const subject = (address: string = '') => {
    return new HolonToken(address, contractProvider);
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

  test('it creates a single token contract when getting token data', async () => {
    const address = '0x0D1C97113D70E4D04345D55807CB19C648E17FBA';
    const token = subject(address);

    await token.getName();
    await token.getSymbol();
    await token.getCap();
    await token.getTotalSupply();

    expect(contractProvider.getContract).toHaveBeenCalledTimes(1);
    expect(contractProvider.getContract).toHaveBeenCalledWith(ContractType.HolonToken, address);
  });
});
