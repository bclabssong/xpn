const Whitelist = artifacts.require("Whitelist");

contract("Whitelist", (accounts) => {
  it("화이트리스트 컨트랙트 배포 여부 확인", async () => {
    const whitelist = await Whitelist.deployed();
    const balance = await whitelist.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 0, "컨트랙트가 정상 동작 하지 않습니다.");
  });

  it("화이트리스 정상 등록 되는지 확인", async () => {
    const metadata = "아무거나";
    const whitelist = await Whitelist.deployed();

    await whitelist.enrollWhiteList(accounts[0], metadata, {from: accounts[0]});
    const balance = await whitelist.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 1, "화이트리스트가 정상 등록되지 않았습니다.");
  });
})