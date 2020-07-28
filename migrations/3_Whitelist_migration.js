const Whitelist = artifacts.require("Whitelist");

const fs = require("fs");

module.exports = function(deployer) {
  deployer.deploy(Whitelist).then(() => {
    if (Whitelist._json) {
      fs.writeFile('WhitelistABI', JSON.stringify(Whitelist._json.abi, 2), err => {
        if (err) throw err
        console.log(`The abi of ${Whitelist._json.contractName} is recorded on deployedABI file`)
      })
    }
    fs.writeFile('WhitelistAddress', Whitelist.address, err => {
      if (err) throw err
      console.log(`The deployed contract address * ${Whitelist.address} * is recorded on deployedAddress file`)
    })
  })
};