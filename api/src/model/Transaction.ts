export interface Transaction {
  blockNumber: number;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  type: string;
  amount: number;
  symbol: string;
  category: string;
  contractAddress: string;
  timestamp: string;
};

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw'
}