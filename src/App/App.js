import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Navbar from '../components/Navbar/Navbar';
import Auth from '../components/Auth/Auth';
import TeamContainer from '../components/TeamContainer/TeamContainer';

import './App.scss';

connection.firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    const loadComponent = () => {
      if (authed) {
        return <TeamContainer />;
      }

      return <Auth />;
    };

    return (
      <div className="App">
        <Navbar authed={authed}/>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
