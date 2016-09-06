import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './Auth'
import { Button, Checkbox, Col, FormControl, FormGroup, Row } from 'react-bootstrap';

class ColorGraph extends React.Component {
  render() {
    return (
      <hr className="colorGraph" />
    );
  }
}

const LoginAlert = React.createClass({
  
  render: function (){
    if (this.props.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.handleAlertDismiss}>
          <h4>Login Error!</h4>
          <p>Username or Password invalid! Although this might just be a bad day for you.  Perhaps this is revenge for something you did in high school...</p>
        </Alert>
      );
    }else{
      return (<div> </div>)
    }
  }
});

export class Login extends React.Component {
 state = {
    alertVisible: false
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const pass = ReactDOM.findDOMNode(this.refs.pass).value.trim();
    const rememberMe = ReactDOM.findDOMNode(this.refs.rememberMe).value;

    if (!email || !pass) {
      this.setState({alertVisible: true});
    }else{
      this.setState({alertVisible: false});
    }
    
    var auth = new Auth();
    auth.login( email, pass, rememberMe, (err,authUser) => {
      if (err){
        this.setState({alertVisible: true});
      }

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }

    }).catch(function(err) {
      console.log("Error logging in", err);
      this.setState({alertVisible: true});
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
              <LoginAlert alertVisible={this.state.alertVisible} handleAlertDismiss={this.state.handleAlertDismiss}/>
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
        				  <Button tabIndex="8" bsStyle="success" onClick={this.handleSubmit}>Sign In</Button>
        				</Col>
        			</Row>
      			</fieldset>
      		</form>
      	</Col>
    	</Row>
    );
  }
}


export default Login
