const YPN = artifacts.require("YPN");
const Whitelist = artifacts.require("Whitelist");
const Swap = artifacts.require("Swap");

contract("YPN, Whitelist, Swap", (accounts) => {
  it("YPN, Whitelist, Swap contracts deployment check", async () => {
    const decimals = 18;
    const totalSupply = 770000000 * 10 ** decimals;
    const ypnToken = await YPN.deployed();

    const deployerBalance = await ypnToken.balanceOf(accounts[0]);
    assert.equal(deployerBalance.valueOf(), totalSupply, "Contract is not deployed");
  });

  it("YPN token send to Swap CA", async () => {
    const ypnToken = await YPN.deployed();
    const swapContract = await Swap.deployed();
    const swapAddress = swapContract.address;
    
    await ypnToken.transfer(swapAddress, "770000000000000000000000000", {from: accounts[0]});

    const swapBalance = await ypnToken.balanceOf(swapAddress);
    console.log(swapBalance);
    assert.equal(swapBalance.valueOf(), 770000000000000000000000000, "Token send is wrong");
  });

  it("Whitelist contract deployment check", async () => {
    const whitelist = await Whitelist.deployed();
    const balance = await whitelist.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 0, "Whitelist contract is not deployed");
  });

  it("Whitelist enrollWhiteList function check", async () => {
    const metadata = "blabla";
    const whitelist = await Whitelist.deployed();

    await whitelist.enrollWhiteList(accounts[0], metadata, {from: accounts[0]});
    const balance = await whitelist.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 1, "Whitelist is not enrolled");
  });

  it("Swap contract deployment check", async () => {
    const tokenMount = "770000000000000000000000000";
    const SwapContract = await Swap.deployed();
    const SwapCA = SwapContract.address;
    const newTokenBalance = await SwapContract.newTokenContractBalance({from: SwapCA});
    assert.equal(newTokenBalance.valueOf(), tokenMount, "Swap contract is not deployed");
  });
});