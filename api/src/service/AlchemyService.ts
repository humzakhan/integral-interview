import { config } from "../config";

const { Alchemy, Network } = require("alchemy-sdk");

const alchemyConfig = {
    apiKey: config.providerApiKey, 
    network: Network.ETH_MAINNET, 
};

const alchemy = new Alchemy(alchemyConfig);
export { alchemy };