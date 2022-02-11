import React, { Component } from 'react';
import { Button ,Form ,Navbar ,Container , Nav,Alert} from 'react-bootstrap';

export class Login extends Component {
    checkState= async ()=>{
        // const secret = process.env.REACT_APP_SECRET_NAME.toString()
        const secret = 300
        const a = await this.props.twofa.methods.docs(secret, this.props.account).call()
        if(a.isValue){
            this.setState({showsuccess:true})
            this.setState({showfailure:false})
        }else{
            this.setState({showsuccess:false})
            this.setState({showfailure:true})
        }
      }
      constructor(props){
        super(props)
        this.state = {
          loading:true,
          showsuccess:false,
          showfailure:false
        }
      }

  render() {
    return <div>
        <h3>SignIn</h3>
        <div>
        <div className="register">
    <p onClick={()=>this.checkState()} >SignIn with Auth-Chain</p>
    </div>
    <div className="register register2">
    <p >Signin with Google</p>
    </div>
    <div className="register register2 register3">
    <p >Signin with Facebook</p>
    </div>
    <div>
    <Alert show={this.state.showsuccess} variant="success">
        <Alert.Heading>Success!!</Alert.Heading>
        <p>
          You are successfully Authenticated
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.setState({showsuccess:false})} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
      <Alert show={this.state.showfailure} variant="danger">
        <Alert.Heading>Failed!!</Alert.Heading>
        <p>
          Make sure you used the correct wallet address
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.setState({showfailure:false})} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>

      
    </div>
    </div>
    </div>;
  }
}

export default Login;
