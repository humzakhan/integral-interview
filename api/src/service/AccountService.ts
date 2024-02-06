import { Account, Transaction, TransactionType } from "../model";
import transactionService from "./TransactionService";



class AccountService {
  private accounts: { [key: string]: Account } = {};

  createAccount(account: Account) {
    this.accounts[account.id] = account;

    if (account.wallet != null) {
      this.syncTransactions(account.id);
    }
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
  }

  getTransactions(accountId: string): Transaction[] {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return null;
    }

    return account.transactions;
  }

  async syncTransactions(accountId: string): Promise<void> {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return;
    }

    const onchainTransactionsPromise: Promise<Transaction[]> = 
      transactionService.getOnchainTransactions(accountId, TransactionType.DEPOSIT);
      
    const offchainTransactionsPromise: Promise<Transaction[]> = 
      transactionService.getOnchainTransactions(accountId, TransactionType.WITHDRAW);

    const [onchainTransactions, offchainTransactions] = await Promise.all([
      onchainTransactionsPromise,
      offchainTransactionsPromise,
    ]);

    account.transactions = [...onchainTransactions, ...offchainTransactions];
    this.accounts[accountId] = account;
  }
}

const accountService = new AccountService();
export default accountService;
