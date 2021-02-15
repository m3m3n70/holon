import Web3 from 'Web3';
import { Holon } from './class/Holon';
import { HolonClient, ContractProvider } from './class/HolonClient';
import { HolonToken } from './class/HolonToken';
import config from './config/config.json';

async function getHolon(_holonControllerAddress: string, _provider: ContractProvider): Promise<Holon> {
  const holon = new Holon(_holonControllerAddress, _provider);
  const holonName = await holon.getName();
  console.log('Holon Name: ' + holonName);
  return holon;
}

async function getHolonToken(_holonTokenAddress: string, _provider: ContractProvider): Promise<HolonToken> {
  const holonToken = new HolonToken(_holonTokenAddress, _provider);
  const tokenName = await holonToken.getName();
  console.log('Token Name: ' + tokenName);
  return holonToken;
}

function injectProvider() {
  const providerAddress = config.web3host;
  const httpProvider = new Web3.providers.HttpProvider(providerAddress);
  return new HolonClient(new Web3(httpProvider));
}

async function initExample() {
  const provider = injectProvider();

  await getHolon(config.holonController, provider);
  await getHolonToken(config.holonToken, provider);
}

initExample();
