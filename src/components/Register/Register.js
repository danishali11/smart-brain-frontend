import React , { Component } from 'react';
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Swal = require('sweetalert2');



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
   var toastId = null;
   var customToastId = 'xxx-yyy';
 
                

if (! toast.isActive(this.toastId)) {                
   if (this.state.name==='') 
    {
         this.toastId =   toast.error("Enter Name!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2500 ,
              hideProgressBar: true
            });
                 

    }
    else if (this.state.email==='' )
    {
          this.toastId =   toast.error("Enter Email!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2500,
              hideProgressBar: true
            });
                

    }
    else if (this.state.password==='') 
    {
          this.toastId =  toast.error("Enter Password!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2500,
              hideProgressBar: true
            });
          
    }
}
    fetch('https://salty-fjord-43449.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {

          this.props.loadUser(user)
          this.props.onRouteChange('home');

               Swal.fire({
                position: 'bottom',
                type: 'success',
                title: 'Account Created Successfully',
                showConfirmButton: true,
                timer: 4000,
              })                      }
      })
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
              <ToastContainer />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;