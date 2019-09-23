import { Holon } from "../class/Holon";
import { Choice } from "../class/Choice";
import { injectProvider } from "../class/Web3Provider";
import config from "../config/config.json";
import { stat } from "fs";

describe('Test methods with Initialize Existing Choice', () => {

    let holon = new Holon(injectProvider);
    holon.initializeExistingHolon(config.choice);
    let choice = new Choice(injectProvider, holon);

    test('Choice is created with a Provider', async () => {
        await choice.initializeExistingChoice(config.choice);
        let currentProvider = await choice.getProvider();
        expect(currentProvider).toHaveProperty("eth");
    });
    
    test('Choice is created with a Holon', async () => {
        await choice.initializeExistingChoice(config.choice);
        let currentHolon = await choice.getHolon();
        expect(currentHolon).toHaveProperty("controllerAddress");
        expect(currentHolon).toHaveProperty("holonControllerInstance");
    });
    
    test('Choice has a valid Token', async () => {
        await choice.initializeExistingChoice(config.choice);
        let token = await choice.getChoiceHolonTokenAddress();
        expect(token).toHaveLength(42);
    });

    test('Choice has a proposer', async () => {
        await choice.initializeExistingChoice(config.choice);
        let proposedBy = await choice.getProposedBy();
        expect(proposedBy).toBeDefined();
    });
    
    test('Choice has a url', async () => {
        await choice.initializeExistingChoice(config.choice);
        let choiceUrl = await choice.getUrl();
        expect(choiceUrl).toBeDefined();
    });
    
    test('Choice has a valid status', async () => {
        await choice.initializeExistingChoice(config.choice);
        let status = await choice.getStatus();
        expect(status).toBeDefined();
    });
    
    test('Choice has a valid vote count', async () => {
        await choice.initializeExistingChoice(config.choice);
        let voteCount = await choice.getVoteCount();
        expect(voteCount).toBeGreaterThanOrEqual(0);
    });
    
    test('Choice has a valid approval threshold', async () => {
        await choice.initializeExistingChoice(config.choice);
        let approvalThreshold = await choice.getApprovalThreshold();
        expect(approvalThreshold).toBeGreaterThanOrEqual(0);
    });
    
    test('Choice has a valid Choice Type address', async () => {
        await choice.initializeExistingChoice(config.choice);
        let choiceTypeAddress = await choice.getChoiceTypeAddress();
        expect(choiceTypeAddress).toHaveLength(42);
    });

    test('Vote', async () => {
        await choice.initializeExistingChoice(config.choice);
        let choiceVote = await choice.vote(config.sender, 10);
        // expect(choiceVote).toThrowError();
    });
});

