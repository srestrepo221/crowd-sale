const Info = ({ account, accountBalance, maxTokens})=> {
  return(
    <div className="my-3">
      <p><strong>Account:</strong> {account}</p>
      <p><strong>Tokens Owned:</strong> {accountBalance}</p>
      <p><strong>
          Green Bros Token contract verified
          <a
            href="https://goerli.etherscan.io/address/0x07Edeecd4DD8ed5B249e4cd10c0f847720c7007A"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            &nbsp;here
          </a>
          </strong></p>
      <p><strong>
          Crowdsale contract verified
          <a
            href="https://goerli.etherscan.io/address/0x6B36fD3D3FC04987C3A54221bcF7f2f28A9CfB94"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            &nbsp;here
          </a>
          </strong></p>
    </div>
  )
}

export default Info;
