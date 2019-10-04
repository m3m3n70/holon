import Web3 from 'Web3';
import config from '../config/config.json';

export interface Web3Provider {
    (): Web3Provider;
    eth: {
        Contract: new(ABI: any, address: string) => any,
        getAccounts: () => string;
    };
    methods: {
        dao(): { call: () => void },
    };
}

export interface ProviderInterface {
    getProvider(): Web3Provider;
    getConnectionStatus(): boolean;
    getHttpProvider(): Object;
}

export class Provider implements ProviderInterface {
    public HttpProvider: Object;
    private provider: Web3Provider;
    private isConnected: boolean;

    constructor(_provider: Web3Provider) {
        this.provider = _provider;
    }

    public getProvider() {
        return this.provider;
    }

    public getConnectionStatus() {
        return this.isConnected;
    }

    public getHttpProvider() {
        return this.HttpProvider;
    }
}

export function injectProvider() {
    const providerAddress = config.web3host;
    const httpProvider = new Web3.providers.HttpProvider(providerAddress);
    const web3provider = new Web3(httpProvider);
    const ethProvider = new Provider(web3provider);
    const provider = ethProvider.getProvider();
    return provider;
}
