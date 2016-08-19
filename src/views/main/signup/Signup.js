import React from 'react';
import { Button, Checkbox, Col, FormControl, FormGroup, Row } from 'react-bootstrap';

class ColorGraph extends React.Component {
  render() {
    return (
      <hr className="colorGraph" />
    );
  }
}


export default class Login extends React.Component {

  model = {
    username: 'string',
    email: 'string',
    password: 'string',
    confPassword: 'string',
    
  }

  render() {
    return (
      <Col xs={12} sm={8} md={6} smOffset={2}  mdOffset={3}>
    		<form role="form">
    			<h2>Please Sign Up</h2>
    			<ColorGraph />
      			<FormGroup>
      			  <FormControl type="email" placeholder="Email Address" tabIndex="4" />
      			</FormGroup>
    			<Row>
    				<Col xs={12} sm={6} md={6}>
    					<FormGroup>
                <FormControl type="password" name="password" id="password" placeholder="Password" tabIndex="5" />
    					</FormGroup>
    				</Col>
    				<Col xs={12} sm={6} md={6}>
    					<FormGroup>
    					  <FormControl type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" tabIndex="6" />
    					</FormGroup>
    				</Col>
    			</Row>
    			<Row>
    				<Col xs={4} sm={3} md={3}>
      				<Button bsStyle="primary">
      				  <Checkbox name="t_and_c" id="t_and_c" value="1" tabIndex="7">I Agree</Checkbox>
      				</Button>
    				</Col>
    				<Col xs={8} sm={9} md={9}>
    					 By clicking <strong className="label label-primary">Register</strong>, you agree to the <a href="#" data-toggle="modal" data-target="#t_and_c_m">Terms and Conditions</a> set out by this site, including our Cookie Use.
    				</Col>
    			</Row>
    			
    			<ColorGraph />
    			<Row>
    				<Col xs={12} md={6}>
    				  <Button tabIndex="7" bsStyle="primary">Register</Button>
    				</Col>
    				<Col xs={12} md={6}>
    				  <Button tabIndex="8" bsStyle="success">Sign In</Button>
    				</Col>
    			</Row>
    		</form>
    	</Col>  
    );
  }
}
