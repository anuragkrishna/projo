/*jshint esversion: 6 */

import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from '../commons/TextFieldGroup';
import validateLoginInput from '../../validations/login'; 
import { browserHistory } from 'react-router';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('./login.css');
  var logo = require('./large-logo.jpg');
}

class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateLoginInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.loginRequest(this.state)
      .then(
        (res) => this.context.router.push('/'),
        (err) => {
          this.setState({ errors: err.data.errors, isLoading: false })}
      );
    }
  }

  onChange(e) {
    this.setState({ errors: {}});
    this.setState({ [e.target.name]: e.target.value });
  }


  render(){

    const errors = this.state.errors;

    const errorEle = <div className="alert alert-danger" role="alert">
                       <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                       <span className="sr-only alert alert-danger">Error:</span>
                          Invalid Credentials.
                    </div>;

    return (
            <div className="container">
              <div className="row login_main">
                <div className="col-xs-8 col-sm-6 col-md-4 col-md-offset-4">
                  <p className="h1">
                    <span><img src={logo} alt="Brand Logo"/></span> Sign In
                  </p>
                  <form onSubmit={this.onSubmit}>

                    {errors.form && errorEle}

                    <TextFieldGroup
                        label="Username/Email"
                        value={this.state.identifier}
                        type="text"
                        name="identifier"
                        onChange={this.onChange}
                        error={errors.identifier}
                        checkUserExists={this.checkUserExists}
                        />

                    <TextFieldGroup
                        label="Password"
                        value={this.state.password}
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        error={errors.password}
                        />    

                    <div className="form-group">
                      <button className={classnames("btn btn-primary btn-lg",{disabled:this.state.isLoading || this.state.invalid})} type="submit"><strong>Login</strong></button>
                      <span className="h4"> No account yet ? <Link to="signup"><strong><u>Signup</u></strong></Link></span>
                    </div>    
                  </form> 
                </div>
              </div>    
            </div> 
        );
  }

}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default LoginForm;