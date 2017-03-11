/*jshint esversion: 6 */

import React from 'react';
import classnames from 'classnames';
import validateSignupInput from '../../validations/signup'; 
import TextFieldGroup from '../commons/TextFieldGroup';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('./signup.css');
  var logo = require('./large-logo.jpg');
}


class SignupForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      username: '',
      email:'',
      password:'',
      passwordConfirmation:'',
      role:'',
      errors:{},
      isLoading:false, 
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);

  }

  checkUserExists(e){
    const name = e.target.name;
    const val = e.target.value;
    let invalid;
    console.log("changing error state for", name);
    if(val!==''){
      this.props.isUserExists(val)
      .then(res => {
          let errors = this.state.errors;
          if(res.data.user) {
            errors[name] = 'There is a user with such ' + name;
            console.log("changing error state for", name);
            invalid=true; 
          }
          else{
            errors[name] = ''; 
            invalid=false;
          }
         this.setState({errors: errors, invalid:invalid});
      });
    }
  }

  onChange(e){
    const name = e.target.name;
    let errors = this.state.errors;
    errors[name] = "";
    this.setState({ errors});
    this.setState({
        [e.target.name]: e.target.value
    });
  }

    isDataValid(){

      const {errors, isValid} = validateSignupInput(this.state);

      if(!isValid){
        this.setState({errors:errors, invalid:true});
      }

      return isValid;
   }  

   onSubmit(e){
    e.preventDefault();
    
    if(this.isDataValid())   //is state is valid
    {
        this.setState({errors:{}, isLoading:true});
        this.props.userSignupRequest(this.state)
        .then(() =>{
           //browserHistory.push('/');  Method 1 for redirect
           this.context.router.push('/login'); //Method 2
        },
          ({data}) => {this.setState({errors:data, isLoading:false})}
          );
    }    
  }

  render(){

    const errors = this.state.errors;

    return (
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 signup-summary">
                  <p className="h1">
                    <span><img src={logo} alt="Brand Logo"/></span> Projek
                  </p>
                  <p className="h3">
                    A Project Management Solution for small and medium scale enterprises. 
                  </p>      
                </div>

                <div className="col-xs-8 col-sm-6 col-md-4 signup-detail">
                  <form className={classnames("ui inverted form",{error:errors})} onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <p className="h1">Sign up</p>
                    </div>

                    <TextFieldGroup
                      label="First name"
                      value={this.state.first_name}
                      type="text"
                      name="first_name"
                      onChange={this.onChange}
                      error={errors.first_name}
                      />

                    <TextFieldGroup
                      label="Last name"
                      value={this.state.last_name}
                      type="text"
                      name="last_name"
                      onChange={this.onChange}
                      error={errors.last_name}
                      />

                    <TextFieldGroup
                      label="Username"
                      value={this.state.username}
                      type="text"
                      name="username"
                      onChange={this.onChange}
                      error={errors.username}
                      isItemExists={this.checkUserExists}
                      />

                    <TextFieldGroup
                      label="E-mail"
                      value={this.state.email}
                      type="email"
                      name="email"
                      onChange={this.onChange}
                      error={errors.email}
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

                    <TextFieldGroup
                      label="Confirm Password"
                      value={this.state.passwordConfirmation}
                      type="password"
                      name="passwordConfirmation"
                      onChange={this.onChange}
                      error={errors.passwordConfirmation}
                      />
                    <div className="form-group">
                      <button className={classnames("btn btn-primary btn-lg",{disabled: this.state.isLoading || this.state.invalid})} type="submit"><strong>Sign up</strong></button>  
                      <span className="h4">   Already have an account ? <Link className="signup-a" to="login"><strong><u>Login</u></strong></Link></span>
                    </div>        
                  </form> 
              </div>
          </div>      
      </div> 
      );
  }

}

SignupForm.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}


//For Redirect using context
SignupForm.contextTypes ={
  router: React.PropTypes.object.isRequired
}

export default SignupForm;