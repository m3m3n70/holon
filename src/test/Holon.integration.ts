import { injectProvider } from '../class/Web3Provider';
import { Holon } from '../class/Holon';
import config from '../config/config.json';

expect.extend({
  toBeType(received, argument) {
    const initialType = typeof received;
    const type = initialType === 'object' ? Array.isArray(received) ? 'array' : initialType : initialType;
    return type === argument ? {
      message: () => `expected ${received} to be type ${argument}`,
      pass: true,
    } : {
        message: () => `expected ${received} to be type ${argument}`,
        pass: false,
      };
  },
});

describe('Test methods with existing Holon', () => {
  const holon = new Holon(config.holonController, injectProvider());

  test('Holon is initialized with a Provider', async () => {
    const currentProvider = await holon.getProvider();
    expect(currentProvider).toHaveProperty('eth');
  });

  test('Holon has a Controller Address', () => {
    expect(holon.getControllerAddress()).toBeDefined();
  });

  test('Holon has a Holon Address', async () => {
    expect(await holon.getAddress()).toBeDefined();
  });

  test('Holon has a Primary Token Address', async () => {
    expect(await holon.getPrimaryTokenAddress()).toBeDefined();
  });
});
