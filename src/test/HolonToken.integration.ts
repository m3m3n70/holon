import { HolonToken } from '../class/HolonToken';
import { injectProvider, Web3Provider } from '../class/Web3Provider';
import config from '../config/config.json';

// Test InitializeExistigToken

const holonToken = new HolonToken(config.holonToken, injectProvider());

test('HolonToken returns address', async () => {
  await holonToken.initializeExistingToken();
  const holonTokenAddress = await holonToken.getAddress();
  expect(holonTokenAddress).toBeDefined();
});

test('HolonToken has name', async () => {
  await holonToken.initializeExistingToken();
  const holonTokenAddress = await holonToken.getTokenName();
  expect(holonTokenAddress).toBeDefined();
});

test('HolonToken has symbol', async () => {
  await holonToken.initializeExistingToken();
  const holonTokenSymbol = await holonToken.getTokenSymbol();
  expect(holonTokenSymbol).toBeDefined();
});

test('HolonToken has cap', async () => {
  await holonToken.initializeExistingToken();
  const holonTokenCap = await holonToken.getTokenCap();
  expect(holonTokenCap).toBeGreaterThanOrEqual(0);
});

test('HolonToken has Total Supply', async () => {
  await holonToken.initializeExistingToken();
  const totalTokenSupply = await holonToken.getTokenTotalSupply();
  expect(totalTokenSupply).toBeGreaterThanOrEqual(0);
});

test('HolonToken can get balances', async () => {
  await holonToken.initializeExistingToken();
  const senderBalance = await holonToken.getBalanceOf(config.sender);
  expect(senderBalance).toBeGreaterThanOrEqual(0);
});
