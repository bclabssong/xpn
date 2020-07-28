const Swap = artifacts.require("Swap");
const fs = require("fs");

// Mainnet PANTHEON X TOKEN CA: 0x3b9e094d56103611f0acefdab43182347ba60df4
const XPN_CA = "0x3b9e094d56103611f0acefdab43182347ba60df4";
const XPN_TEST_CA = "0x4e095c9947e60bCdaF5Af51E6A0b889b3E4a4653"
const YPN_CA = fs.readFileSync("../ypnAddress", "utf-8");
const WHITELIST_CA = fs.readFileSync("../WhitelistAddress", "utf-8");

module.exports = function(deployer) {
  deployer.deploy(Swap, XPN_TEST_CA, YPN_CA, WHITELIST_CA);
};