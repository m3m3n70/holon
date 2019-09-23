import ChoiceABI from "../abi/Choice.json";
import MintTokenChoiceABI from "../abi/MintTokenChoice.json";
import MintTokenChoiceByteCode from "../abi/MintTokenChoiceByteCode.json";
import { Web3Provider } from "./Web3Provider";
import { Holon } from "./Holon";
import { HolonToken } from "./HolonToken";

export interface ChoiceType {
    methods: {
        choiceType(): { call(): string },
        getVoteCount(): { call(): string },
        getVoteStatus(): { call(): string },
        daoToken(): { call(): string },
        vote(_sender: string, _voteValue: Number): { send(metaData: object): string }
    };
    _address: string;
}

export interface ChoiceInterface {
    initializeExistingChoice: (_choiceAddress: string) => Object;
    getHolon: () => Holon;
    getChoiceHolonTokenAddress: () => string;
    getProposedBy: () => string;
    getUrl: () => string;
    getStatus: () => string;
    getVoteCount: () => number;
    getApprovalThreshold: () => number;
    getChoiceTypeAddress: () => string;
}

export interface VoteInterface {
    voter: string;
    vote: number;
    voted: boolean;
}

export class Choice implements ChoiceInterface {
    private choiceInstance: ChoiceType;
    private provider: Web3Provider;
    private holon: Holon;
    private choiceHolonTokenAddress: string;
    
    private choiceAddress: string;
    private choiceTypeAddress: string;

    private proposedBy: string;
    private beneficiary: string;
    private amount: number;
    private url: string;
    private status: string;
    private voteCount: number;
    private approvalThreshold: number;
    private voters: Array<any>;

    constructor(_provider: () => Web3Provider, _holon: Holon) {
        this.provider = _provider();
        this.holon = _holon;
    }

    public async initializeExistingChoice(_choiceAddress: string) {
        try {
            this.choiceAddress = _choiceAddress;
            this.choiceInstance = await new this.provider.eth.Contract(ChoiceABI, this.choiceAddress);
            this.choiceAddress = await this.choiceInstance._address;
            this.choiceHolonTokenAddress = await this.choiceInstance.methods.daoToken().call();
            this.status = await this.choiceInstance.methods.getVoteStatus().call();
            this.approvalThreshold = 1; // need to implement
            this.proposedBy = "null"; // need to implement
            this.url = "null"; // need to implement 
            let voteCountString = await this.choiceInstance.methods.getVoteCount().call();
            this.voteCount = parseInt(voteCountString);
            this.choiceTypeAddress = await this.choiceInstance.methods.choiceType().call();
        } catch (e) {
            console.error(e);
        }
    }

    public async createChoice(
        _holonToken: HolonToken, 
        _approvalThreshold: number, 
        _choiceTypeAddress: string,
        _beneficiary: string,
        _amount: number,
        _sender: string
        ): Promise<void> 
    {
        this.choiceHolonTokenAddress = _holonToken.getAddress();
        this.approvalThreshold = _approvalThreshold;
        this.choiceTypeAddress = _choiceTypeAddress;
        this.createChoiceFromContract(_choiceTypeAddress, _beneficiary, _sender);
    }

    private async createChoiceFromContract(_choiceTypeAddress: string, _beneficiary: string, _sender) {
        try {
            const choiceTypeInstance = await new this.provider.eth.Contract(MintTokenChoiceABI, _choiceTypeAddress);
            this.beneficiary = _beneficiary;
            this.amount = 1000;
            const controllerAddress = await this.holon.getControllerAddress();    
            const choiceInstance = await choiceTypeInstance.deploy({
                data: MintTokenChoiceByteCode,
                arguments: [controllerAddress, this.beneficiary, this.amount]
            })
            .send({
                from: _sender,
                gas: 4712388,
                gasPrice: 100000000000
            });
            this.choiceTypeAddress = choiceInstance._address;
            this.choiceAddress = await choiceInstance.methods.getChoiceAddress().call();
        } catch (e) {
            console.error(e);
        }
    }

    public getProvider() {
        return this.provider;
    }

    public getHolon() {
        return this.holon;
    }

    public getChoiceHolonTokenAddress() {
        return this.choiceHolonTokenAddress;
    }

    public getProposedBy() {
        return this.proposedBy;
    }

    public getUrl() {
        return this.url;
    }

    public getStatus() {
        return this.status;
    }

    public getVoteCount() {
        return this.voteCount;
    }

    public getApprovalThreshold() {
        return this.approvalThreshold;
    }

    public getChoiceTypeAddress() {
        return this.choiceTypeAddress;
    }

    public async vote(_sender, _voteValue) {
        try {
            const vote = await this.choiceInstance.methods.vote(_sender, _voteValue).send({
                from: _sender,
                gas: 4712388,
                gasPrice: 100000000000
            });
            console.log(vote);
            return vote;
        } catch (e) {
            console.error(e);
        }
    }
}