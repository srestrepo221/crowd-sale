import Navbar from 'react-bootstrap/Navbar';

import logo from '../greenbros.png';

const Navigation = () => {
  return(
    <Navbar>
      <img
        alt="logo"
        src={logo}
        width="100"
        height="50"
        className="d-inline-block align-top mx-3"
      />
      <Navbar.Brand href="#" style={{ fontSize: "50px" }} >
        <strong className='my-4 text-center'>GreenBros ICO Crowdsale</strong></Navbar.Brand>
    </Navbar>
  )
}

export default Navigation;

