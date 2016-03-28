//container for all of the components of the login page
import React, { PropTypes, Component } from 'react';
import { Input, Button } from 'react-bootstrap';
import request from 'superagent-bluebird-promise';
import PageTemplate from '../../shared/components/PageTemplate.js';
import styles from '../../../public/css/login.css';
import PubSub from 'pubsub-js';

export default class LoginContent extends Component {
  state = {email: '', password: '', failedAttempt: false};

  onLogin = () => {
    var promise = request
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({email: this.state.email, password: this.state.password})
      .promise()
      .then((res) =>{
        let resJson = JSON.parse(res.text);
        PubSub.publish('LOGIN', true);
        this.setState({failedAttempt: false});
        //TODO: redirect to upload page
      })
      .catch((error) =>{
        let resJson = JSON.parse(error.res.text);
        console.log(resJson.message);
        this.setState({failedAttempt: true});
      });
  }

  setEmail = () => {
    this.setState({email:this.refs.email.getValue()});
  }

  setPassword = () => {
    this.setState({password:this.refs.password.getValue()});
  }

  render(){
    return(
      <PageTemplate title="Login" subtitle= "Login to your account.">
        <div className="loginWrapper">
          <p>Email:</p>
          <Input
            type="text"
            ref="email"
            placeholder="Enter email"
            onChange={this.setEmail}/>
          <div className="clear"/>
          <p>Password:</p>
          <Input
            type="text"
            ref="password"
            placeholder="Enter password"
            onChange={this.setPassword}/>
          <div className="clear"/>
          <Button className="loginBtn" bsStyle="primary" onClick={this.onLogin}>LOGIN</Button>
          <Button href="/register" className="registerBtn">REGISTER</Button>
          {this.state.failedAttempt ? <div className="failLabel"> Sorry, either your email or password was incorrect. 
              Please try again. </div> : null}
        </div>
      </PageTemplate>
    );
  }
}