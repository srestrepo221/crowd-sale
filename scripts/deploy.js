// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const NAME = 'Green Bros'
  const SYMBOL = 'GB'
  const MAX_SUPPLY = '2100000'
  const PRICE = ethers.utils.parseUnits('0.025', 'ether')
  // const ICO_MINT_DATE = (Date.now() + (10*60000)).toString().slice(0, 10)
  // const ICO_MINT_DATE = (Date.now() + 120000).toString().slice(0, 10)

  // Deploy Token
  const Token = await hre.ethers.getContractFactory('Token')
  let token = await Token.deploy(NAME, SYMBOL, MAX_SUPPLY)

  await token.deployed()
  console.log(`Token deployed to: ${token.address}\n`)

  // Deploy Crowdsale
  const Crowdsale = await hre.ethers.getContractFactory('Crowdsale')
  const crowdsale = await Crowdsale.deploy(token.address, PRICE, ethers.utils.parseUnits(MAX_SUPPLY, 'ether'))
  //const crowdsale = await Crowdsale.deploy(token.address, PRICE, ethers.utils.parseUnits(MAX_SUPPLY, 'ether'), ICO_MINT_DATE)
  await crowdsale.deployed();

  console.log(`Crowdsale deployed to: ${crowdsale.address}\n`)

  // Send tokens to crowdsale
  const transaction = await token.transfer(crowdsale.address, ethers.utils.parseUnits(MAX_SUPPLY, 'ether'))

  console.log(`Tokens transferred to Crowdsale\n`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
