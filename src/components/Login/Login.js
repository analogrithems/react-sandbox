import React from 'react';
import Auth from './Auth.js'
import { Button, Checkbox, Col, FormControl, FormGroup, Row } from 'react-bootstrap';

class ColorGraph extends React.Component {
  render() {
    return (
      <hr className="colorGraph" />
    );
  }
}


export default class Login extends React.Component {

  state = { email: '', password: '', rememberMe: false };


  emailValueLink = (value) => {
      return {
          value: this.state.email,
          requestChange: this.handleEmailChange
      };
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We'll create it in the next step
    Auth.login(this.state.email, this.state.password)
      .catch(function(err) {
        console.log("Error logging in", err);
      });
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={8} md={6} smOffset={2}  mdOffset={3}>
      		<form role="form">
      		  <fieldset>
        			<h2>Please Sign In</h2>
        			<ColorGraph />
        			<FormGroup>
        			  <FormControl type="email" placeholder="Email" tabIndex="4" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}  />
        			</FormGroup>
    					<FormGroup>
                <FormControl type="password" name="password" id="password" placeholder="Password" tabIndex="5" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
    					</FormGroup>
    					<span className="button-checkbox">
        				<Button>
        				  <Checkbox name="rememberMe" id="rememberMe" value="1" tabIndex="7" checked={this.state.rememberMe} onChange={this.handleChange.bind(this, 'rememberMe')}>Remember Me</Checkbox>
        				</Button>
      				</span>  			
        			<ColorGraph />
        			<Row>
        				<Col xs={12} md={6}>
        				  <Button tabIndex="8" bsStyle="success" onClick={this.login.bind(this)} >Sign In</Button>
        				</Col>
        			</Row>
      			</fieldset>
      		</form>
      	</Col>
    	</Row>
    );
  }
}
