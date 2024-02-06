import { Account } from "../model";

class AccountService {
  private accounts: Account[] = [];

  createAccount(account: Account) {
    this.accounts.push(account);
  }

  getAccounts() {
    return this.accounts;
  }

  addWalletsToAccount(accountId: string, walletAddresses: string[]) {
    const account = this.verifyAccountExists(accountId);

    if (!account) {
      return;
    }

    const existingWallets = account.wallets;
    const newWallets = walletAddresses.filter(
      (wallet: string) => !existingWallets.includes(wallet)
    );

    account.wallets = [...existingWallets, ...newWallets];
  }

  verifyAccountExists(accountId: string) {
    return this.accounts.find((account) => account.id === accountId);
  }
}

const accountService = new AccountService();
export default accountService;
