import { Transaction, TransactionType } from '../model';
import { config } from '../config';
import axios from 'axios';
import { logger } from '../middleware';

class TransactionService {
  public async getOnchainTransactions(walletAddress: string, transactionType: TransactionType): Promise<Transaction[]> {
    let params: any = {
      'fromBlock': '0x0',
      'toBlock': 'latest',
      'withMetadata': true,
      'excludeZeroValue': false,
      'maxCount': '0x3e8',
      'category': ["erc20"]
    };

    if (transactionType === TransactionType.DEPOSIT) {
      params['toAddress'] = walletAddress;
    } else {
      params['fromAddress'] = walletAddress;
    }
    
    const response = await axios.post(`${config.providerUrl}/${config.providerApiKey}`, {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [params]
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    });

    if (response.data) {
      return response.data.result.transfers.map((tx: any) => {
        return {
          blockNumber: tx.blockNum,
          txHash: tx.hash,
          fromAddress: tx.from,
          toAddress: tx.to,
          type: transactionType.toString(),
          amount: tx.value,
          symbol: tx.asset,
          category: tx.category,
          contractAddress: tx.rawContract.address,
          timestamp: tx.metadata.blockTimestamp
        };
      });
    }
  }
}

const transactionService = new TransactionService();
export default transactionService;