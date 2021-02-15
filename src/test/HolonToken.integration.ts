import Web3 from 'Web3';
import { HolonToken } from '../class/HolonToken';
import config from '../config/config.json';
import { HolonClient } from '../class/HolonClient';

// Test InitializeExistigToken

const subject = () => {
  const providerAddress = config.web3host;
  const httpProvider = new Web3.providers.HttpProvider(providerAddress);
  const provider = new HolonClient(new Web3(httpProvider));

  return new HolonToken(config.holonToken, provider);
};

test('HolonToken returns address', async () => {
  const holonTokenAddress = await subject().getAddress();
  expect(holonTokenAddress).toBeDefined();
});

test('HolonToken has name', async () => {
  const holonTokenAddress = await subject().getName();
  expect(holonTokenAddress).toBeDefined();
});

test('HolonToken has symbol', async () => {
  const holonTokenSymbol = await subject().getSymbol();
  expect(holonTokenSymbol).toBeDefined();
});

test('HolonToken has cap', async () => {
  const holonTokenCap = await subject().getCap();
  expect(holonTokenCap).toBeGreaterThanOrEqual(0);
});

test('HolonToken has Total Supply', async () => {
  const totalTokenSupply = await subject().getTotalSupply();
  expect(totalTokenSupply).toBeGreaterThanOrEqual(0);
});

test('HolonToken can get balances', async () => {
  const senderBalance = await subject().getBalanceOf(config.sender);
  expect(senderBalance).toBeGreaterThanOrEqual(0);
});
