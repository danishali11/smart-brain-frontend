import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
   var Spinner = require('react-spinkit');

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  onClick(event) {
      this.onShow();
      this.onSubmitSignIn();
      
   }



state = {
    progrssBar: false
  }

  onShow = ()=> {
    this.setState({
      progrssBar: true
    });
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {

                     var toastId = null;
                       var customToastId = 'xxx-yyy';
                     
                                    

                    if (! toast.isActive(this.toastId)) {                
                       if (this.state.signInEmail==='') 
                        {
                             this.toastId =   toast.error("Enter Email!", {
                                  position: toast.POSITION.TOP_CENTER,
                                  autoClose: 2500 ,
                                  hideProgressBar: true
                                });
                                     

                        }else if (this.state.signInPassword==='' )
                        {
                              this.toastId =   toast.error("Enter Password!", {
                                  position: toast.POSITION.TOP_CENTER,
                                  autoClose: 2500,
                                  hideProgressBar: true
                                });
                                    
                        }

    fetch('https://salty-fjord-43449.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
        
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {

          this.props.loadUser(user)
          this.props.onRouteChange('home');

        
        }
      })
  }}
  

  render() {
    const { onRouteChange } = this.props;
     const progrssBar=this.state.progrssBar;
    return (

      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                onClick={(event) => { this.onClick()}}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
              
        <div>
        {   progrssBar ?
        (<Spinner name="ball-pulse-sync" color="aqua"/>):(<div></div>)
      }</div>
              <ToastContainer />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;