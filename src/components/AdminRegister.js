import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AdminRegister extends Component {

    constructor(props){
        super(props)
        this.state = {
          secret:''
        }
      }
      addAdmin= async ()=>{
        const secret = 300
        const addr = this.props.account
        this.props.twofa.methods.registerAdmin(secret).send({from: addr})
          .on('receipt',(receipt)=>{
            console.log(receipt)
          })
      }
      addMember= async ()=>{
        const secret = 300
        const member = "0x9609D33CeA4eAC07F22343b4977FBD8b7A7fE0c5"
        const addr = this.props.account
        this.props.twofa.methods.addMember(secret,member).send({from: addr})
          .on('receipt',(receipt)=>{
            console.log(receipt)
          })
      }
  render() {
    return <div className="register">
    <input type="text" onChange={(e)=>this.setState({secret:e.target.value})} placeholder='secret code'/>
    <p onClick={()=>this.addAdmin()}>Admin Register</p>
    <p onClick={()=>this.addMember()}>Add member</p>
    </div>
  }
}
