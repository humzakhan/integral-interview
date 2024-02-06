import { catchAsync } from '../utils';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { logger } from '../middleware';
import { accountService } from '../service'; 

export const createAccount = catchAsync(async (req: Request, res: Response) => {
  const { name, wallet } = req.body;
  const newAccount = accountService.createAccount(name, wallet);
  
  logger.info(`Account created: ${newAccount.id}, name: ${newAccount.name}, wallet: ${newAccount.wallet}`);
  res.status(httpStatus.CREATED).send({ message: newAccount });
});

export const updateAccount = catchAsync(async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const { name, wallet } = req.body;

  const account = accountService.verifyAccountExists(accountId);

  if (!account) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Account not found' });
    return;
  }

  account.name = name;
  accountService.updateAccount(accountId, name, wallet);

  logger.info(`Account updated: ${account.id}, new name: ${account.name}, wallet: ${account.wallet}`);
  res.status(httpStatus.OK).send({ message: account });
});


export const getAccount = catchAsync(async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const account = accountService.verifyAccountExists(accountId);

  if (!account) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Account not found' });
    return;
  }

  logger.info(`Account retrieved: ${account.id}, name: ${account.name}, wallet: ${account.wallet}`);
  res.status(httpStatus.OK).send({ message: account });
});

export const getAccounts = catchAsync(async (req: Request, res: Response) => {
  const accounts = accountService.getAccounts();
  logger.info(`Accounts retrieved: ${accounts.length}`);
  res.status(httpStatus.OK).send({ message: accounts });
});

export const getAccountTransactions = catchAsync(async (req: Request, res: Response) => {
  const accounts = accountService.getAccounts();
  logger.info(`Accounts retrieved: ${accounts.length}`);
  res.status(httpStatus.OK).send({ message: accounts });
});