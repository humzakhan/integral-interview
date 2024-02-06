export interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
}

export interface TokenBalanceResponse {
  address: string;
  tokenBalances: TokenBalance[];
}

export interface TokenMetadata {
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
}

export interface AccountTokenBalance {
  symbol: string;
  balance: string;
}