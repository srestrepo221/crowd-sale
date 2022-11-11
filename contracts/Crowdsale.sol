// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Need code that is taken care of with import "./Token.sol";
import "./Token.sol";

contract Crowdsale {
	address public owner;
	Token public token;
	uint256 public price;
	uint256 public maxTokens;
	uint256 public tokensSold;
	uint256 public allowMintingOn; 

	event Buy(uint256 amount, address buyer);
	event Finalize(uint256 tokensSold, uint256 ethRaised);

	constructor(
		Token _token,
		uint256 _price,
		uint256 _maxTokens,
		uint256 _allowMintingOn
	)
	{
		owner = msg.sender;
		token = _token;
		price = _price;
		maxTokens = _maxTokens;
		allowMintingOn = _allowMintingOn;
	}

	mapping(address => bool) public whitelist;

	// Add to whitelist
	function addToWhiteList(address[] calldata toAddAddresses)
	external onlyOwner
	{
		for(uint i = 0; i < toAddAddresses.length; i++){
			whitelist[toAddAddresses[i]] = true;
		}
	}
	// Remove from whitelist
	function removeFromWhitelist(address[] calldata toRemoveAddresses)
    external onlyOwner
    {
        for (uint i = 0; i < toRemoveAddresses.length; i++) {
            delete whitelist[toRemoveAddresses[i]];
        }
    }

	modifier onlyOwner() {
		require(msg.sender == owner, 'caller is not the owner');
		_;
	}

	receive() external payable 
	{
		uint256 amount = msg.value / price;
		buyTokens(amount * 1e18);
	}

	function buyTokens(uint256 _amount) public payable {
		// Allow purchase after specified time
		require(block.timestamp >= allowMintingOn);
		
		// Allow only whitelist to purchase
		require(whitelist[msg.sender], "Not in whitelist");


		// Minimum contribution of tokens
		require( _amount >= (25 * 1e18),"Must contribute 25 eth" ); 

		// Maximum contribution of tokens
		require( _amount <= (25000 * 1e18));

		require(msg.value == (_amount / 1e18) * price);
		require(token.balanceOf(address(this)) >= _amount); 
		require(token.transfer(msg.sender, _amount));

		tokensSold += _amount;

		emit Buy(_amount,msg.sender);
	}

	function setPrice(uint256 _price) public onlyOwner
	{
		price = _price;
	}

	function finalize() public onlyOwner
	{
	// send remaining tokens to crowdsale creator
	// uint256 remainingTokens = token.balanceOf(address(this));
	// require(msg.sender == owner);
	require(token.transfer(owner, token.balanceOf(address(this))));

	// send ether to crowdsale creator
	uint256 value = address(this).balance;
	(bool sent, ) = owner.call{value: value }("");
	require(sent);

	emit Finalize(tokensSold, value); 
	}


}




