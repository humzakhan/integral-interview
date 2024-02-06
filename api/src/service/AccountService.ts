import { nanoid } from "nanoid";
import { logger } from "../middleware";
import { Account, AccountTokenBalance, Transaction, TransactionType } from "../model";
import transactionService from "./TransactionService";



class AccountService {
  private accounts: { [key: string]: Account } = {};

  createAccount(name: string, wallet: string): Account {
    const account: Account = {
      id: nanoid(),
      name,
      wallet
    };

    this.accounts[account.id] = account;

    if (wallet !== '') {
      this.syncTransactions(account.id, wallet);
    }

    return account;
  }

  getAccounts(): Account[] {
    return Object.values(this.accounts);
  }

  verifyAccountExists(accountId: string): Account | null {
    return this.accounts[accountId] || null;
  }

  updateAccount(accountId: string, name: string, wallet: string): Account {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return null;
    }

    account.name = name;
    account.wallet = wallet;

    this.accounts[accountId] = account;

    if (wallet !== '' && wallet !== account.wallet) {
      this.syncTransactions(account.id, wallet);
    }

    return account;
  }

  getTransactions(accountId: string): Transaction[] {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return null;
    }

    return account.transactions;
  }

  async getTokenBalances(accountId: string): Promise<AccountTokenBalance[]> {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return null;
    }

    const balances = await transactionService.getTokenBalances(account.wallet);
    return balances;
  }

  async syncTransactions(accountId: string, wallet: string): Promise<void> {
    try {
      const account = this.verifyAccountExists(accountId);

      if (!account) {
        return;
      }

      const onchainTransactionsPromise: Promise<Transaction[]> = 
        transactionService.getOnchainTransactions(wallet, TransactionType.DEPOSIT);

      const offchainTransactionsPromise: Promise<Transaction[]> = 
        transactionService.getOnchainTransactions(wallet, TransactionType.WITHDRAW);

      const [onchainTransactions, offchainTransactions] = await Promise.all([
        onchainTransactionsPromise,
        offchainTransactionsPromise,
      ]);

      account.transactions = [...onchainTransactions, ...offchainTransactions];
      this.accounts[accountId] = account;
    }
    catch (error) {
      logger.error(`Error syncing transactions for account ${accountId}: ${error}`);
    }
  }
}

const accountService = new AccountService();
export default accountService;
