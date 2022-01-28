import React, { Component } from 'react';
import Web3  from 'web3';
import './App.css';
import TwoFA from '../abis/TwoFA.json'

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3(){
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable()
      }
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
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
      
    }
}

constructor(props){
  super(props)
  this.state = {
    loading:true
  }
}

async checkState(){
  const a = await this.state.twofa.methods.docs(110, this.state.account).call()
  console.log(a)
}
async createState(){
  const secret = 110
  this.state.twofa.methods.createDocument(secret).send( { from: this.state.account})
    .once('receipt',(receipt)=>{
      console.log(receipt,'hey')
    })
}


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            AuthChain
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <p>{this.state.account}</p>
            <button onClick={()=>this.createState()}>Create</button>
            <button onClick={()=>this.checkState()}>Check</button>
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <h1>AuthChain</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
