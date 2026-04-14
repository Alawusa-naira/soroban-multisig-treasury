import { Transaction, Networks } from '@stellar/stellar-sdk';

export const validateXDR = (xdr: string) => {
  try {
    // Validate if it's a valid Transaction XDR
    new Transaction(xdr, Networks.TESTNET);
    return true;
  } catch (e) {
    return false;
  }
};

export const decodeXDR = (xdr: string) => {
  try {
    return new Transaction(xdr, Networks.TESTNET);
  } catch (e) {
    throw new Error('Invalid XDR');
  }
};
