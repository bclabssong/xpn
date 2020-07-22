const XPN = artifacts.require("./XPN.sol");
const YPN = artifacts.require("./YPN.sol");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(XPN).then(() => {
    if (XPN._json) {
      fs.writeFile('xpnABI', JSON.stringify(XPN._json.abi, 2), err => {
        if (err) throw err
        console.log(`The abi of ${XPN._json.contractName} is recorded on deployedABI file`)
      })
    }
    fs.writeFile('xpnAddress', XPN.address, err => {
      if (err) throw err
      console.log(`The deployed contract address * ${XPN.address} * is recorded on deployedAddress file`)
    })
  })

  deployer.deploy(YPN).then(() => {
    if (YPN._json) {
      fs.writeFile('ypnABI', JSON.stringify(YPN._json.abi, 2), err => {
        if (err) throw err
        console.log(`The abi of ${YPN._json.contractName} is recorded on deployedABI file`)
      })
    }
    fs.writeFile('ypnAddress', YPN.address, err => {
      if (err) throw err
      console.log(`The deployed contract address * ${YPN.address} * is recorded on deployedAddress file`)
    })
  })
};