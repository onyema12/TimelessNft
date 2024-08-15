import React,{Component} from 'react'
import { connectWallet } from '../Blockchain.services'
import { Link } from "react-router-dom";
import Intro from './Intro';
import "./Header.css";
import {truncate, useGlobalState} from '../store/index.jsx';



function withGlobalState(WrappedComponent) {
  return function Wrapper(props) {
    const [connectAccount] = useGlobalState('connectedAccount');
    return <WrappedComponent connectedAccount={connectAccount} {...props} />;
  };
}



class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenuLink: false,
      color: false,
    };
  }

  changeColor = () => {
    if (window.scrollY >= 70) {
      this.setState({ color: true });
    } else {
      this.setState({ color: false });
    }
  };

  onClientEntry = () => {
    window.addEventListener("scroll", this.changeColor);
  };

  componentDidMount() {
    this.onClientEntry();
  };

  render(){
    const { connectedAccount } = this.props;

  return (
  <div className="main" id="home">
    
    <nav
          className={
            this.state.color
              ? "main-nav fixed-NavBar scrolling-active"
              : "main-nav fixed-NavBar"
          }
        >
          <a className={this.state.color ? "sd logo" : "sl logo"} href="/">
            MINTNFT
          </a>
          <div
            className={
              this.state.showMenuLink
                ? this.state.color
                  ? "scc kk menu-link mobile-menu-link"
                  : "sbb pp menu-link mobile-menu-link"
                : this.state.color
                ? "scc menu-link"
                : "sbb menu-link"
            }
          >
            <ul className="">
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-100}
                  spy={true}
                  to="home"
                >
                  Market
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-100}
                  spy={true}
                  to=""
                >
                  Artist
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-100}
                  spy={true}
                  to="skill"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-100}
                  spy={true}
                  to="/about"
                >
                  Community
                </Link>
              </li>
              <li>
                 {connectedAccount ? 
                  <button className='HeaderBtn'>
                  {truncate(connectedAccount,4,4,11)}
                </button>
                 : 
                 <button onClick={connectWallet} className='HeaderBtn'>
                  Connect Wallet
                </button>}
              </li>
            </ul>
          </div>

          <div
            className={
              this.state.color ? "hamburger-menu sd" : "hamburger-menu sl"
            }
          >
            <div
              onClick={() => {
                this.setState({ showMenuLink: !this.state.showMenuLink });
              }}
            >
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </nav>

        <Intro/> 
          
</div>

  );
}
}



export default withGlobalState(Header);
