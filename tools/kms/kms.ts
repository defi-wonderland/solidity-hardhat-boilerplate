import 'dotenv/config';
import _ from 'lodash';
import { KMS } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/kms';

const DEFAULT_CLIENT_CONFIGURATION: ClientConfiguration = {
  apiVersion: '2014-11-01',
  region: 'us-east-1',
};

const kms = new KMS(DEFAULT_CLIENT_CONFIGURATION);

const encrypt = async (stringToEncrypt: string): Promise<string> => {
  const data = await kms
    .encrypt({
      KeyId: process.env.KMS_KEY_ID as string,
      Plaintext: Buffer.from(stringToEncrypt),
    })
    .promise();
  return data.CiphertextBlob!.toString('base64');
};

const encryptSeveral = async (plainStrings: string[]): Promise<string[]> => {
  return await Promise.all(_.map(plainStrings, (plainString) => encrypt(plainString)));
};

const decrypt = async (encryptedString: string): Promise<string> => {
  const decryptedInfo = await kms
    .decrypt({
      CiphertextBlob: Buffer.from(encryptedString, 'base64'),
    })
    .promise();
  return decryptedInfo.Plaintext!.toString();
};

const decryptSeveral = async (encryptedStrings: string[]): Promise<string[]> => {
  return await Promise.all(_.map(encryptedStrings, (encryptedString) => decrypt(encryptedString)));
};

const getDecryptedPrivateKey = async (): Promise<string> => {
  return await decrypt(process.env.ENCRYPTED_PRIVATE_KEY as string);
};

export default {
  getDecryptedPrivateKey,
  encrypt,
  encryptSeveral,
  decrypt,
  decryptSeveral,
};
