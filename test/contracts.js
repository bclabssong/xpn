const YPN = artifacts.require("YPN");
const Whitelist = artifacts.require("Whitelist");
const Swap = artifacts.require("Swap");
const EXT = artifacts.require("ExToken");

contract("YPN, Whitelist, Swap, EXT test", (accounts) => {
  it("EXT contract deployment check", async () => {
    const decimals = 18;
    const totalSupply = 770000000 * 10 ** decimals;
    const exToken = await EXT.deployed();

    const deployerBalance = await exToken.balanceOf(accounts[0]);
    assert.equal(deployerBalance.valueOf(), totalSupply, "Contract is not deployed");
  });

  it("ExToken approve to Swap CA", async () => {
    const tokenMount = "770000000000000000000000000";
    const exToken = await EXT.deployed();
    const SwapContract = await Swap.deployed();
    const SwapCA = SwapContract.address;

    exToken.transfer(accounts[1], tokenMount, {from: accounts[0]});
    exToken.approve(SwapCA ,tokenMount, {from: accounts[1]});
    const ac1Balance = await exToken.balanceOf(accounts[1]);
    assert.equal(ac1Balance.valueOf(), tokenMount, "transfer is wrong");
  });

  it("YPN contract deployment check", async () => {
    const decimals = 18;
    const totalSupply = 770000000 * 10 ** decimals;
    const ypnToken = await YPN.deployed();

    const deployerBalance = await ypnToken.balanceOf(accounts[0]);
    assert.equal(deployerBalance.valueOf(), totalSupply, "Contract is not deployed");
  });

  it("YPN token send to Swap CA", async () => {
    const decimals = 18;
    const transferSupply = 770000000 * 10 ** decimals;
    const ypnToken = await YPN.deployed();
    const swapContract = await Swap.deployed();
    const swapAddress = swapContract.address;
    
    await ypnToken.transfer(swapAddress, "770000000000000000000000000", {from: accounts[0]});

    const swapBalance = await ypnToken.balanceOf(swapAddress);
    assert.equal(swapBalance.valueOf(), transferSupply, "Token send is wrong");
  });

  it("Whitelist contract deployment check", async () => {
    const whitelist = await Whitelist.deployed();
    const balance = await whitelist.balanceOf(accounts[1]);
    assert.equal(balance.valueOf(), 0, "Whitelist contract is not deployed");
  });

  it("Whitelist enrollWhiteList function check", async () => {
    const metadata = "blabla";
    const whitelist = await Whitelist.deployed();

    await whitelist.enrollWhiteList(accounts[1], metadata, {from: accounts[0]});
    const balance = await whitelist.balanceOf(accounts[1]);
    assert.equal(balance.valueOf(), 1, "Whitelist is not enrolled");
  });

  it("Swap contract deployment check", async () => {
    const tokenMount = "770000000000000000000000000";
    const SwapContract = await Swap.deployed();
    const SwapCA = SwapContract.address;

    const newTokenBalance = await SwapContract.newTokenContractBalance();
    assert.equal(newTokenBalance.valueOf(), tokenMount, "Swap contract is not deployed");
  });

  // it("Token Swap check", async () => {
  //   const tokenMount = "770000000000000000000000000";
  //   const SwapContract = await Swap.deployed();
  //   const SwapCA = SwapContract.address;

  //   await SwapContract.tokenSwap(tokenMount, {from: accounts[1]});
  //   const newTokenBalance = await SwapContract.newTokenContractBalance();
  //   assert.equal(newTokenBalance.valueOf(), 0, "tokenSwap function is wrong");
  // });
});