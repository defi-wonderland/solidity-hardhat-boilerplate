import inquirer from 'inquirer';
import kms from './kms';

const main = async () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          message: 'Select action to perform',
          type: 'list',
          name: 'action',
          choices: ['encrypt', 'decrypt'],
        },
      ])
      .then(async (answ) => {
        if (answ.action === 'encrypt') {
          await encrypt();
        } else {
          await decrypt();
        }
      })
      .catch(reject);
  });
};

const encrypt = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          message: 'Enter text to encrypt',
          type: 'password',
          name: 'toEncrypt',
        },
      ])
      .then(async (answ) => {
        const encryptedString = await kms.encrypt(answ.toEncrypt);
        console.log('Encrypted string:', encryptedString);
        resolve();
      })
      .catch(reject);
  });
};

const decrypt = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          message: 'Enter text to decrypt',
          type: 'password',
          name: 'toDecrypt',
        },
      ])
      .then(async (answ) => {
        const decryptedString = await kms.decrypt(answ.toDecrypt);
        console.log('Decrypted string:', decryptedString);
        resolve();
      })
      .catch(reject);
  });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
