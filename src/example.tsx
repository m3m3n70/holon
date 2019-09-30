import { Web3Provider, injectProvider } from "./class/Web3Provider";
import { Holon } from "./class/Holon";
import { HolonToken } from "./class/HolonToken";
import config from "./config/config.json";


async function getHolon(_holonControllerAddress: string, _provider: Web3Provider): Promise<Holon> {
    const holon = new Holon(_holonControllerAddress, _provider);
    await holon.initializeExistingHolon();
    const holonName = await holon.getHolonName();
    console.log("Holon Name: " + holonName);
    return holon;
}

async function getHolonToken(_holonTokenAddress: string, _provider: Web3Provider): Promise<HolonToken> {
    const holonToken = new HolonToken(_holonTokenAddress, _provider);
    await holonToken.initializeExistingToken();
    const tokenName = await holonToken.getTokenName();
    console.log("Token Name: " + tokenName);
    return holonToken;
}

async function initExample() {
    const provider = injectProvider();
    await getHolon(config.holonController, provider);
    await getHolonToken(config.holonToken, provider);
}

initExample();