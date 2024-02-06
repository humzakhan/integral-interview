import { Account } from '../model';
import { catchAsync } from '../utils';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { nanoid } from 'nanoid';
import { logger } from '../middleware';
import { accountService } from '../service'; 

export const createAccount = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  const newAccount: Account = { id: nanoid(), name: name, wallets: [] as string[] };
  accountService.createAccount(newAccount);
  
  logger.info(`Account created: ${newAccount.id}, name: ${newAccount.name}, wallet count: ${newAccount.wallets.length}`);
  res.status(httpStatus.CREATED).send({ message: newAccount });
});

export const addWalletToAccount = catchAsync(async (req: Request, res: Response) => { 
  const { accountId } = req.params;
  const { walletAddresses } = req.body;
  const account = accountService.verifyAccountExists(accountId);

  if (!account) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Account not found' });
    return;
  }

  accountService.addWalletsToAccount(accountId, walletAddresses);

  logger.info(`Wallets added to account: ${accountId}, wallets: ${walletAddresses}`);
  res.status(httpStatus.OK).send({ message: 'Wallets added to account' });
});

export const getAccount = catchAsync(async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const account = accountService.verifyAccountExists(accountId);

  if (!account) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Account not found' });
    return;
  }

  logger.info(`Account retrieved: ${account.id}, name: ${account.name}, wallet count: ${account.wallets.length}`);
  res.status(httpStatus.OK).send({ message: account });
});

export const getAccounts = catchAsync(async (req: Request, res: Response) => {
  const accounts = accountService.getAccounts();
  logger.info(`Accounts retrieved: ${accounts.length}`);
  res.status(httpStatus.OK).send({ message: accounts });
});