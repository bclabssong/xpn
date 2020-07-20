const XPN = artifacts.require("./XPN.sol");
const YPN = artifacts.require("./YPN.sol");

module.exports = function(deployer) {
  deployer.deploy(XPN);
  deployer.deploy(YPN);
};