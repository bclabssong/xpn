const YPN = artifacts.require("YPN");
const Swap = artifacts.require("Swap");

contract("YPN", (accounts) => {
  it("YPN contract deployment check", async () => {
    const decimals = 18;
    const totalSupply = 770000000 * 10 ** decimals;
    const ypnToken = await YPN.deployed();

    const deployerBalance = await ypnToken.balanceOf(accounts[0]);
    assert.equal(deployerBalance.valueOf(), totalSupply, "Contract is not deployed");
  });

  it("YPN token send to Swap CA", async () => {
    const decimals = 18;
    const totalSupply = 770000000 * 10 ** decimals;
    const ypnToken = await YPN.deployed();
    const swapContract = await Swap.deployed();
    const swapAddress = swapContract.address;
    
    await ypnToken.transfer(swapAddress, "770000000000000000000000000", {from: accounts[0]});

    const deployerBalance = await ypnToken.balanceOf(accounts[0]);
    assert.equal(deployerBalance.valueOf(), 0, "Token send is wrong");
  });
})