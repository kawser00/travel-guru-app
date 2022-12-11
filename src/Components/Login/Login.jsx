import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { Input } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import fbImg from '../../Icon/fb.png'
import googleImg from '../../Icon/google.png'
import { LocationContext } from '../../App';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [{ setLoggedInUser }] = useContext(LocationContext)
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false,
  })

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //**********************GOOGLE SIGN IN ************************ */
  //code for google sign and their information
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, email } = result.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
        }
        setLoggedInUser(signInUser)
        history.replace(from);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  //********************END GOOGLE SIGN IN ********************** */

  //function for facebook sign in button
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then(res => {
        const { displayName, email } = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
        }
        setLoggedInUser(signInUser)
        history.replace(from);
      }).catch(error => console.log(error))
  }
  //********************END FACEBOOK SIGN IN ********************** */

  //*************USER EMAIL, PASSWORD SIGN IN & SIGN OUT**************** */
  //____________code for sign in and sign up user_________________________
  //function for sign up form
  const handleSubmit = (e) => {
    // this code for the sign up user
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          updateUseName(user.name)
        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });
    }
    // this code for the sign in user
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
          history.replace(from)
          console.log('Sign in user info', res.user)
        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });
    }
    e.preventDefault()
  }
  //************END USER EMAIL, PASSWORD SIGN IN & SIGN OUT************** */
  //update user name and other information
  const updateUseName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(res => {
      console.log('User name update successfully')
    })
      .catch(error => {
        console.log(error)
      });
  }

  //_______________________handle blur function_________________________
  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value) //to show this event value with name
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) //use regular expression for email validation
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5 //pass. should be more than 5 characters
      const passwordHasNumber = /\d{1}/.test(e.target.value) // should have minimum 1 number
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  return (
    <div className="back-img px-4">
      <div className="p-4 text-center">
        {/* to show successful/error message on screen */}
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>User created successfully</p>
        }
      </div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5" className="from-style">
            {
              <form onSubmit={handleSubmit}>
                <p className="h5 text-center mb-4 font-weight-bold">{newUser ? 'Create an account' : 'Log In'}</p>
                <div className="grey-text font-weight-bold">
                  {newUser && <MDBInput onBlur={handleBlur} label="First Name" name="name" group type="text" required />}
                  {newUser && <MDBInput onBlur={handleBlur} label="Last Name" name="name" group type="text" required />}
                  <MDBInput onBlur={handleBlur} name="email" label="Username or Email" group type="email" required />
                  <MDBInput onBlur={handleBlur} label="Password" name="password" group type="password" required />
                  <small className="text-danger">Password minimum 6 characters (include; a number and letter)</small>
                  {newUser && <MDBInput onBlur={handleBlur} label="Confirm Password" name="password" group type="password" required />}
                </div>
                {!newUser && <div className='my-4 d-flex justify-content-between'>
                  <div><Input type="checkbox"></Input><span className=" text-dark font-weight-bold ml-2">Remember Me</span></div>
                  <div><span style={{ cursor: 'pointer' }} className="text-warning font-weight-bold">Forget Password</span></div>
                </div>}
                <div className="text-center">
                  <button className="btn btn-warning w-100 font-weight-bold text-dark ">{newUser ? 'Register' : 'Login'}</button>
                </div>
                <div className="text-center mt-3">
                  <span className="">{newUser ? 'Already have an account?' : 'Don’t have an account?'}</span>
                  {newUser ?
                    <span style={{ cursor: 'pointer' }} className="text-warning font-weight-bold " onClick={() => setNewUser(false)}> Log In</span>
                    :
                    <span style={{ cursor: 'pointer' }} className="text-warning font-weight-bold" onClick={() => setNewUser(true)}> Create an account</span>
                  }
                </div>
              </form>
            }
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="otherLogIn">
        <span className="text-center mb-4 d-block ">or</span>
        <span onClick={handleFbSignIn} className="logIn text-dark font-weight-bold"><img style={{ width: '23px', marginRight: '80px' }} src={fbImg} alt="" />Continue with Facebook</span> <br />
        <span onClick={handleGoogleLogIn} className="logIn text-dark font-weight-bold"><img style={{ width: '23px', marginRight: '80px' }} src={googleImg} alt="" />Continue with Google</span>
      </div>
    </div>
  );
};

export default Login;