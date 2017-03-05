/*jshint esversion: 6 */

import React from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';
import validateLoginInput from '../../validations/login'; 


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
    this.setState({ [e.target.name]: e.target.value });
  }


  render(){

    const errors = this.state.errors;

    return (
      <div className="ui inverted segment">
        <form className="ui inverted form" onSubmit={this.onSubmit}>
          <h1>Sign In</h1>

          <TextFieldGroup
              label="Username/e-mail"
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

             <div className="field"> 
                <button disabled={this.state.isLoading || this.state.invalid} className="ui button">
                Log In
                </button>
            </div>    
        </form> 
       </div> 
      )
  }

}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default LoginForm;