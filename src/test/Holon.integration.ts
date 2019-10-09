import Web3 from 'Web3';
import { Holon } from '../class/Holon';
import config from '../config/config.json';
import { HolonClient } from '../class/HolonClient';

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
  const subject = () => {
    const providerAddress = config.web3host;
    const httpProvider = new Web3.providers.HttpProvider(providerAddress);
    const provider = new HolonClient(new Web3(httpProvider));

    return new Holon(config.holonController, provider);
  };

  test('Holon is initialized with a Provider', async () => {
    const currentProvider = await subject().getProvider();
    expect(currentProvider).toHaveProperty('eth');
  });

  test('Holon has a Controller Address', () => {
    expect(subject().getControllerAddress()).toBeDefined();
  });

  test('Holon has a Holon Address', async () => {
    expect(await subject().getAddress()).toBeDefined();
  });

  test('Holon has a Primary Token Address', async () => {
    expect(await subject().getPrimaryTokenAddress()).toBeDefined();
  });
});
