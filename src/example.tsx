import { Web3Provider, injectProvider } from "./class/Web3Provider";
import { Holon } from "./class/Holon";
import { HolonToken } from "./class/HolonToken";
import { Choice } from "./class/Choice";
import config from "./config/config.json";


async function getHolon(_provider: Web3Provider, _holonControllerAddress: string): Promise<Holon> {
    const holon = new Holon(_provider, _holonControllerAddress);
    await holon.initializeExistingHolon();
    const holonName = await holon.getHolonName();
    console.log("Holon Name: " + holonName);
    return holon;
}

async function getHolonToken(_provider: Web3Provider, _holonTokenAddress: string): Promise<HolonToken> {
    const holonToken = new HolonToken(_provider, _holonTokenAddress);
    await holonToken.initializeExistingToken();
    const tokenName = await holonToken.getTokenName();
    console.log("Token Name: " + tokenName);
    return holonToken;
}

async function getChoice(_provider: Web3Provider, _holonControllerAddress: string, _choiceAddress: string): Promise<void> {
    const holon = new Holon(_provider, _holonControllerAddress);
    holon.initializeExistingHolon();
    const choice = new Choice(_provider, holon);
    await choice.initializeExistingChoice(config.choice);
    const voteCount = await choice.getVoteCount();
    console.log("Holon Choice Vote Count: " + voteCount);
}

// async function createChoice(_approvalThreshold: number, _choiceTypeAddress: string) {
//     const holon = new Holon(injectProvider);
//     holon.initializeExistingHolon(config.holonController);
//     const choice = new Choice(injectProvider, holon);
//     const holonToken = new HolonToken(injectProvider);
//     await choice.createChoice(holonToken, _approvalThreshold, _choiceTypeAddress, config.beneficiary, 100, config.sender);
// }

async function initExample() {
    const provider = injectProvider();
    await getHolon(provider, config.holonController);
    await getHolonToken(provider, config.holonToken);
    await getChoice(provider, config.holonController, config.choice);
    // createChoice(1, config.mintTokenChoice);
}

initExample();

