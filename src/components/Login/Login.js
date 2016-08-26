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

const LoginAlert = React.createClass({
  getInitialState() {
    return {
      alertVisible: false
    };
  },

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>Login Error!</h4>
          <p>Username or Password invalid! Although this might just be a bad day for you.  Perhaps this is revenge for something you did in high school...</p>
        </Alert>
      );
    }else{
      return (<div> </div>)
    }
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
});

export default class Login extends React.Component {

  getInitialState() {
    return {
      error: false
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value
    const rememberMe = this.refs.rememberMe.value

    
    Auth.login( email, pass, rememberMe, (loggedIn) => {
      if (!loggedIn)
        LoginAlert.handleAlertShow();

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }

    }).catch(function(err) {
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
              <LoginAlert />
        			<FormGroup>
        			  <FormControl type="email" placeholder="Email" tabIndex="4" ref="email"  />
        			</FormGroup>
    					<FormGroup>
                <FormControl type="password" name="password" id="password" placeholder="Password" tabIndex="5" ref="pass"/>
    					</FormGroup>
    					<span className="button-checkbox">
        				<Button>
        				  <Checkbox name="rememberMe" ref="rememberMe" value="1" tabIndex="6" >Remember Me</Checkbox>
        				</Button>
      				</span>  			
        			<ColorGraph />
        			<Row>
        				<Col xs={12} md={6}>
        				  <Button tabIndex="8" bsStyle="success">Sign In</Button>
        				</Col>
        			</Row>
      			</fieldset>
      		</form>
      	</Col>
    	</Row>
    );
  }
}
