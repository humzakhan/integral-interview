import { Account } from "../model";

class AccountService {
  private accounts: Account[] = [];

  createAccount(account: Account) {
    this.accounts.push(account);
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  verifyAccountExists(accountId: string): Account | null {
    return this.accounts.find((account) => account.id === accountId);
  }

  updateAccount(accountId: string, name: string, wallet: string): Account {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return null;
    }

    account.name = name;
    account.wallet = wallet;
  }
}

const accountService = new AccountService();
export default accountService;
