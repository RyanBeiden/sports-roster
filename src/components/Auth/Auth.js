import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  signInEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  render() {
    return (
      <div className="Auth__container">
        <div className="Auth__buttonContainer">
          <h2 className="mb-4">Sign In to View Your Team</h2>
          <button className="btn btn-danger Auth__signIn" onClick={this.signInEvent}>Google</button>
        </div>
      </div>
    );
  }
}

export default Auth;
