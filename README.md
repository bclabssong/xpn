# PANTHEON X ERC 20 XPN TOKEN

## Prepare requirement

```bash
$ nvm install 10.14.2
$ nvm use 10.14.2
$ npm install -g truffle@0.5.0
$ npm install -g solhint@1.4.1
```

## Test net from Ganache

* docker cli version

```bash
$ docker pull trufflesuite/ganache-cli:latest
$ docker run -p 8545:8545 trufflesuite/ganache-cli:latest
```

* Ganache gui version

[ganache](https://truffleframework.com/ganache)


## How to test

```bash
$ truffle test
```

## How to use `solhint`

```bash
$ solhint contracts/XPN.sol
```

## How to build

```bash
$ truffle build
```
