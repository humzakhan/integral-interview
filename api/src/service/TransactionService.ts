import { TokenMetadata, Transaction, TransactionType } from '../model';
import { logger } from '../middleware';
import { alchemy } from './AlchemyService';

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

    const response = await alchemy.core.getAssetTransfers(params);

    if (response) {
      logger.info(`Transactions retrieved count: ${response.transfers.length}`);
      return response.transfers.map((tx: any) => {
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