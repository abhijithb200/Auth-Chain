import React, { Component } from 'react';
import Web3  from 'web3';
import './App.css';
import TwoFA from '../abis/TwoFA.json'
import Register from './Register';
import { Button ,Form ,Navbar ,Container , Nav} from 'react-bootstrap';
import Login from './Login';
import { config } from 'dotenv';


//https://kovan.infura.io/v3/99065cc6e6d341f893265c0827f23268

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    
    
  }

  async loadWeb3(){
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable()
          await this.loadBlockchainData()
      }
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          await this.loadBlockchainData()
      }
      else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  }
  async loadBlockchainData(){
    const web3 = window.web3
    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
   
    const networkId = await web3.eth.net.getId()
    const networkData = TwoFA.networks[networkId]
    if(networkData){
      //connecting to our smart contract
      const twofa = web3.eth.Contract(TwoFA.abi,networkData.address)
      this.setState({twofa})
      
    }else{
      window.alert('Seems like it is not deployed')
    }
    this.setState({loading:false})
}

constructor(props){
  super(props)
  this.state = {
    loading:true,
    status:'register',
    account:''
  }
}


  render() {
    return (
      <div className="container">
        <h1></h1>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Auth-Chain</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link onClick={()=>this.setState({status:'register'})}>Register</Nav.Link>
      <Nav.Link onClick={()=>this.setState({status:'login'})}>Login</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        <div className="container-fluid mt-5">
          <div className="row">
            {
              !this.state.loading ?  <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <p>Current active account : <b>{this.state.account}</b></p>
               
                {
                  this.state.status == 'register' ? <Register twofa={this.state.twofa} account={this.state.account}/> :
                  <Login twofa={this.state.twofa} account={this.state.account} />
                }
                
              </div>
            </main> : <h1>Non-Ethereum browser detected. You should consider trying MetaMask!</h1>
            }
            
           
          </div>
        </div>
      </div>
    );
  }
}

export default App;
