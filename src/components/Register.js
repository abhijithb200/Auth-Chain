import React,{ Component } from 'react';
import { Button ,Form} from 'react-bootstrap';
import './Register.css'

class Register extends Component {
    


  createState= async ()=>{
    const secret = process.env.REACT_APP_SECRET_NAME.toString()
    const addr = this.props.account
    this.props.twofa.methods.createDocument(secret).send({from: addr})
      .on('receipt',(receipt)=>{
        console.log(receipt)
      })
  }

  render() {
  return(
        <div>
          <h3>SignUp</h3>
          <h3>{}</h3>
            <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<p>or</p>
<div className="register">
<p onClick={()=>this.createState()}>SignUp with Auth-Chain</p>
</div>


            
  </div>
      )
  
  }
}

export default Register;
