import { injectProvider } from "../class/Web3Provider";
import { Holon } from "../class/Holon";
import config from "../config/config.json";

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});

describe('Test methods with existing Holon', () => {
    const provider = injectProvider();
    const holon = new Holon(provider, config.holonController);
    
    test('Holon is initialized with a Provider', async () => {
        let currentProvider = await holon.getProvider();
        expect(currentProvider).toHaveProperty("eth");
    });
    
    test('Holon has a Controller Address', () => {
      holon.initializeExistingHolon();
      expect(holon.getControllerAddress()).toBeDefined;
    });
    
    test('Holon has a Holon Address', () => {
        holon.initializeExistingHolon();
        expect(holon.getHolonAddress()).toBeDefined;
    });
    
    test('Holon has a Primary Token Address', () => {
        holon.initializeExistingHolon();
        expect(holon.getPrimaryTokenAddress()).toBeDefined;
    });
    
    test('Holon.getNeurons() returns Array of Neurons', async () => {
        await holon.initializeExistingHolon();
        let neuronsArray = holon.getNeurons();
        expect(Array.isArray(neuronsArray)).toBeDefined;
    });
});