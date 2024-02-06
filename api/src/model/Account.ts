import { Transaction } from ".";

export interface Account {
  name: string;
  id: string;
  wallet: string;
  transactions?: Transaction[];
}