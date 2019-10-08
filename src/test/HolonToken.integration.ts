import { HolonToken } from '../class/HolonToken';
import { injectProvider, Web3Provider } from '../class/Web3Provider';
import config from '../config/config.json';

// Test InitializeExistigToken

const holonToken = new HolonToken(config.holonToken, injectProvider());

test('HolonToken returns address', async () => {
  const holonTokenAddress = await holonToken.getAddress();
  expect(holonTokenAddress).toBeDefined();
});

test('HolonToken has name', async () => {
  const holonTokenAddress = await holonToken.getName();
  expect(holonTokenAddress).toBeDefined();
});

test('HolonToken has symbol', async () => {
  const holonTokenSymbol = await holonToken.getSymbol();
  expect(holonTokenSymbol).toBeDefined();
});

test('HolonToken has cap', async () => {
  const holonTokenCap = await holonToken.getCap();
  expect(holonTokenCap).toBeGreaterThanOrEqual(0);
});

test('HolonToken has Total Supply', async () => {
  const totalTokenSupply = await holonToken.getTotalSupply();
  expect(totalTokenSupply).toBeGreaterThanOrEqual(0);
});

test('HolonToken can get balances', async () => {
  const senderBalance = await holonToken.getBalanceOf(config.sender);
  expect(senderBalance).toBeGreaterThanOrEqual(0);
});
