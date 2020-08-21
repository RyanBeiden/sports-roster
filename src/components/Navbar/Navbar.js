import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import PropTypes from 'prop-types';

import './Navbar.scss';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  signOutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
      <nav className="navbar">
        <header className="navbar-brand"><img alt="Cricket Bats" className="Navbar__logo"
          src="https://firebasestorage.googleapis.com/v0/b/baggy-greens.appspot.com/o/icons%2Fteam-sports%20(1).png?alt=media&token=bec0857c-8111-4dac-a147-7712ffbbcffb" />
          Baggy Greens
        </header>
        <form className="form-inline">
          {authed ? <button className="btn btn-danger my-2 my-sm-0 Navbar__signOut" type="submit" onClick={this.signOutEvent}>Sign Out</button> : ''}
        </form>
      </nav>
    );
  }
}

export default Navbar;
