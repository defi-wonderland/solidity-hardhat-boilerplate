import 'dotenv/config';

const MAX_ACCOUNTS = 10;

export function getNodeUrl(networkName: string): string {
  if (networkName) {
    const uri = process.env[`ETH_NODE_URI_${networkName.toUpperCase()}`];
    if (uri && uri !== '') {
      return uri;
    }
  }

  if (networkName === 'localhost') {
    // do not use ETH_NODE_URI
    return 'http://localhost:8545';
  }

  let uri = process.env.ETH_NODE_URI;
  if (uri) {
    uri = uri.replace('{{networkName}}', networkName);
  }
  if (!uri || uri === '') {
    // throw new Error(`environment variable "ETH_NODE_URI" not configured `);
    return '';
  }
  return uri;
}

export function getMnemonic(network: string): string {
  const mnemonic = process.env[`MNEMONIC_${network.toUpperCase()}`] as string;
  if (!mnemonic) {
    console.warn(`No mnemonic for network ${network}`);
    return 'test test test test test test test test test test test junk';
  }
  return mnemonic;
}

export function getPrivateKeys(network: string): string[] {
  const privateKeys = [];
  for (let i = 1; i <= MAX_ACCOUNTS; i ++) {
    const privateKey = process.env[`${network.toUpperCase()}_${i}_PRIVATE_KEY`];
    if (!!privateKey) privateKeys.push(privateKey);
  }
  if (privateKeys.length == 0) {
    console.warn(`No private keys for network ${network}`);
    privateKeys.push('0x0000000000000000000000000000000000000000000000000000000000000bad');
  }
  return privateKeys;
}

export function getAccounts({
  typeOfAccount,
  network,
} : {
  typeOfAccount?: 'mnemonic' | 'privateKey';
  network: string;
}): { mnemonic: string } | string[] {
  if (!typeOfAccount || typeOfAccount == 'privateKey') {
    return getPrivateKeys(network);
  }
  return {
    mnemonic: getMnemonic(network)
  };
}

export function isTesting(): boolean {
 return !!process.env.TEST;
}

export function isHardhatCompile(): boolean {
  return process.argv[process.argv.length - 1] == 'compile';
}