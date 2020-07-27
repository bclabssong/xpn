# Contract



### XPN Contract

- 기존에 사용하고 있는 ERC-20 토큰 컨트랙트

### YPN Contract

- 새로 스왑할 ERC-20 토큰 컨트랙트

### Whitelist Contract

- 화이트 리스트에 있는 주소만 기존 토큰을 새 토큰으로 스왑할 수 있게 하는 컨트랙트
- enrollWhiteList(address to, string memory name): 화이트 리스트 추가

### Swap Contract

- 기존 토큰을 새 토큰으로 스왑해주는 컨트랙트
- checkWhitelist(): 함수를 호출한 Address가 Whitelist 컨트랙트에 있는지 확인
- approvedTokenBurn(uint256 value): 스왑 시도한 사람의 토큰을 burn
- newTokenTransfer(): 스왑 시도한 사람에게 새 토큰 transfer
- tokenSwap(uint256 value): 토큰 스왑 실행 함수



### Manual

1. XPN 컨트랙트 배포
2. YPN 컨트랙트 배포
3. Whitelist 컨트랙트 배포
4. Swap 컨트랙트에 XPN, YPN, Whitelist의 CA 넣어서 배포
5. YPN 토큰을 Swap 컨트랙트에 전량 transfer
6. XPN 컨트랙트에서 Swap CA 와 스왑할 토큰 수량 입력 후 approve() 함수 실행
7. Whitelist 컨트랙트 배포한 EOA로 Whitelist에서 enrollWhiteList() 함수에 스왑 승인할 Address와 메타데이터 입력 후 실행
8. 승인된 EOA로 Swap컨트랙트에서 tokenSwap() 함수 실행