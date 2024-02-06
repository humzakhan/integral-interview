import { TokenBalance, TokenBalanceResponse, TokenMetadata, Transaction, TransactionType } from '../model';
import { logger } from '../middleware';
import { alchemy } from './AlchemyService';
import { AccountTokenBalance } from '../model';



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

  public async getTokenBalances(walletAddress: string): Promise<AccountTokenBalance[]> {
    let accountTokenBalances: AccountTokenBalance[] = [];
    const balances: TokenBalanceResponse = await alchemy.core.getTokenBalances(walletAddress);
    const nonZeroBalances = balances.tokenBalances.filter((token: TokenBalance) => {
      return token.tokenBalance !== "0";
    });
    
    for (let token of nonZeroBalances) {
      let balance: number = parseInt(token.tokenBalance, 16);
      const metadata: TokenMetadata = await alchemy.core.getTokenMetadata(token.contractAddress);
      
      balance = balance / Math.pow(10, metadata.decimals);
      accountTokenBalances.push({ symbol: metadata.symbol, balance: balance.toFixed(2) } as AccountTokenBalance);
    }

    return accountTokenBalances;
  }
}

const transactionService = new TransactionService();
export default transactionService;