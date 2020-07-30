const Whitelist = artifacts.require("Whitelist");

contract("Whitelist", (accounts) => {
  it("Whitelist contract deployment check", async () => {
    const whitelist = await Whitelist.deployed();
    const balance = await whitelist.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 0, "Contract is not deployed");
  });

  it("Whitelist enrollWhiteList function check", async () => {
    const metadata = "blabla";
    const whitelist = await Whitelist.deployed();

    await whitelist.enrollWhiteList(accounts[0], metadata, {from: accounts[0]});
    const balance = await whitelist.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 1, "Whitelist is not enrolled");
  });
})