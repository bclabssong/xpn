const YPN = artifacts.require("YPN");
const EXT = artifacts.require("ExToken");
const fs = require("fs");

module.exports = function(deployer) {
  deployer.deploy(EXT);
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