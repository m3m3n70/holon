import { Holon } from "./class/Holon";
import { HolonToken } from "./class/HolonToken";
import { injectProvider } from "./class/Web3Provider";
import config from "./config/config.json";
import { Choice } from "./class/Choice";

async function getHolon(_holonControllerAddress: string): Promise<void> {
    const holon = new Holon(injectProvider);
    await holon.initializeExistingHolon(_holonControllerAddress);
    const holonNeurons = await holon.getNeurons();
}

async function getHolonToken(_holonTokenAddress: string): Promise<void> {
    const holonToken = new HolonToken(injectProvider);
    await holonToken.initializeExistingToken(_holonTokenAddress);
    const tokenName = await holonToken.getTokenName();
    const tokenSymbol = await holonToken.getTokenSymbol();
    const tokenCap = await holonToken.getTokenCap();
    const tokenTotalSupply = await holonToken.getTokenTotalSupply();
    const senderBalance = await holonToken.getBalanceOf(config.sender);
}

async function getChoice(_choiceAddress: string): Promise<void> {
    const holon = new Holon(injectProvider);
    holon.initializeExistingHolon(config.holonController);
    const choice = new Choice(injectProvider, holon);
    await choice.initializeExistingChoice(config.choice);
    const voteCount = await choice.getVoteCount();
    const choiceTypeAddress = await choice.getChoiceTypeAddress();
    const choiceToken = await choice.getChoiceHolonTokenAddress();
    const vote = await choice.vote(config.sender, 1);
}

async function createChoice(_approvalThreshold: number, _choiceTypeAddress: string) {
    const holon = new Holon(injectProvider);
    holon.initializeExistingHolon(config.holonController);
    const choice = new Choice(injectProvider, holon);
    const holonToken = new HolonToken(injectProvider);
    await choice.createChoice(holonToken, _approvalThreshold, _choiceTypeAddress, config.beneficiary, 100, config.sender);
}

getHolon(config.holonController);
getHolonToken(config.holonToken);
getChoice(config.choice);
createChoice(1, config.mintTokenChoice);