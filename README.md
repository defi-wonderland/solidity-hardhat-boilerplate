# Hardhat Boilerplate

## Why ?

Thought to have a fast way of bootstraping projects with best practice's in mind. Having linters, prettiers, standards on how to commit, and changelog creation & maintenance.

---

## How ?

This is achieved using several hardhat plugins, and external known packages.

---

## Setup

```bash
# Install dependencies
yarn install
# Copy Env example file
cp .env.example .env
```

After installing dependencies and copying the example environment, you will have to update your `.env` file with
at least you alchemy API KEY (`NODE_URI_ETHEREUM`).
<br/>
You can generate your API KEY in the [Alchemy site](https://www.alchemy.com).

---

## Tools

This boilerplate includes:

- [Hardhat](https://hardhat.org/)
- [Solhint](https://github.com/protofire/solhint)
- [Prettier](https://github.com/prettier-solidity/prettier-plugin-solidity)
- [Coverage](https://github.com/sc-forks/solidity-coverage)
- [Gas reporter](https://github.com/cgewecke/hardhat-gas-reporter/tree/master)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Standard version](https://github.com/conventional-changelog/standard-version)
- [Uniswap](https://github.com/Uniswap/uniswap-v2-periphery) + [Internal tooling](./test/utils/uniswap.ts)

---

## Commands

### **Coverage**

```bash
yarn coverage
```

Runs solidity code coverage
<br/>

### **Fork**

```bash
yarn fork
```

Runs a mainnet fork via hardhat's node forking util.

```bash
yarn fork:script {path}
```

Runs the script in mainnet's fork.

```
yarn fork:test
```

Runs tests that should be run in mainnet's fork.
<br/>

### **Lint**

```bash
yarn lint:check
```

Runs solhint.
<br/>

### **Prettier (lint fix)**

```bash
yarn lint:fix
```

Runs prettier
<br/>

### **Release**

```bash
yarn release
```

Runs standard changelog, changes package.json version and modifies CHANGELOG.md accordingly.
<br/>

### **Test**

```bash
yarn test:all
```

Runs all solidity tests.
<br/>

```bash
yarn test:unit
```

Runs all solidity tests in folder [unit](./test/unit)
<br/>

```bash
yarn test:e2e
```

Runs all solidity tests in folder [e2e](./test/e2e)
<br/>

### **Gas report**

```bash
yarn test:gas
```

Runs all tests and report gas usage.
