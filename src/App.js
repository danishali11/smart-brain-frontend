import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageLinkFormCeleb from './components/ImageLinkFormCeleb/ImageLinkFormCeleb';
import Rank from './components/Rank/Rank';
import Celebrity from './components/Celebrity/Celebrity';
import CelebName from './components/CelebName/CelebName';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import './App.css';
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const app = new Clarifai.App({
 apiKey: '8d298d961968441b911a06d4da5eccc1'
});

const particlesOptions = {
  
      "particles": {
          "number": {
              "value": 250,
              "density": {
                  "enable": false
              }
          },
          "size": {
              "value": 3,
              "random": true,
              "anim": {
                  "speed": 4,
                  "size_min": 0.3
              }
          },
          "line_linked": {
              "enable": false
          },
          "move": {
              "random": true,
              "speed": 1,
              "direction": "top",
              "out_mode": "out"
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "bubble"
              },
              "onclick": {
                  "enable": true,
                  "mode": "repulse"
              }
          },
          "modes": {
              "bubble": {
                  "distance": 250,
                  "duration": 2,
                  "size": 0,
                  "opacity": 0
              },
              "repulse": {
                  "distance": 400,
                  "duration": 4
              }
          }
      }
  }

const initialState={

      input: '',
      inputCelebBox: '',
      isVisible:false,
      isFDVisible: false,
      isImageVisible:false,
      imageUrl: '',
      box: {},
      cName: '',
     
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
 }      
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    }
 

 _showMessage = (bool) => {
    this.setState({
      showMessage: bool
    });
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
    


//   Retrieving Celeb Name From API Response
    
    generateName= (data) =>
    {    
         const celeb_name=data.outputs[0].data.regions[0].data.face.identity.concepts[0].name;

         console.log(celeb_name);
          return celeb_name;
    }


//    Retrieving Boundaries Of Detected Face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
   


    displayName = (cName) => {

          this.setState({cName: cName});
          console.log(cName);
            }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onInputChangeCeleb = (event) => {
    this.setState({inputCelebBox: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    this.setState({isImageVisible:true});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          console.log(response);
         fetch('https://salty-fjord-43449.herokuapp.com/image', {

            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {

              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
         this.displayFaceBox(this.calculateFaceLocation(response))
      
      })
      .catch(err => console.log(err));
  }

 onButtonSubmitCeleb = () => {
    
    this.setState({imageUrl: this.state.inputCelebBox});
    this.setState({isImageVisible:true});
    this.setState({box:{}});
    
    app.models
      .predict(
        "e466caa0619f444ab97497640cefc4dc",
        this.state.inputCelebBox)
      .then(response => {
        if (response) {
          console.log(response);
         fetch('https://salty-fjord-43449.herokuapp.com/image', {

            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {

              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }

       this.displayName(this.generateName(response))

      })
      .catch(err => console.log(err));
  }



  onCelebCardSbmt= () =>
   {
if(this.onCelebCardSbmt )
{

  
   this.setState({isImageVisible:false});

  this.setState({
      isVisible: true
    });
  this.setState({
      isFDVisible: false
    });
  
  }
  }


onFaceBtnSbmt= () =>
   {
     this.setState({
      cName: ''
    });
     this.setState({isImageVisible:false});

     this.setState({
      inputimage: ''
    });
if(this.onFaceBtnSbmt )
{
  
  this.setState({
      isFDVisible: true
    });
  this.setState({
      isVisible: false
    });
  
  }
  }


 onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box ,inputimage} = this.state;
    const isVisible = this.state.isVisible;
    const isFDVisible = this.state.isFDVisible;
    const isImageVisible=this.state.isImageVisible;
    return (

      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
            
                <Celebrity 
                  onCelebCardSbmt={this.onCelebCardSbmt}
                  onFaceBtnSbmt={this.onFaceBtnSbmt}
           />
            
      
             
 {/*           <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />

*/}

              <CelebName 
               cName={this.state.cName}
               />
              
               <div>
                {
                  isFDVisible ? (<ImageLinkForm
                onInputChange={this.onInputChange}
               onButtonSubmit={this.onButtonSubmit}
                />): 
                (<div> </div>) 
              
                 }
                </div>

                <div>
                {
                  isVisible ? 
                  (
                    <ImageLinkFormCeleb 
                 onInputChangeCeleb={this.onInputChangeCeleb}
                 onButtonSubmitCeleb={this.onButtonSubmitCeleb}
               /> )  :
                (<div> </div>)
              }
          </div>
              <div>
              {
                isImageVisible ?

            (<FaceRecognition box={box} imageUrl={imageUrl} inputimage={inputimage} />)
           :(<div> </div>)
              }
            </div>
            <ToastContainer /> 
            
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
