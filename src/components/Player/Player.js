import React from 'react';
import PropTypes from 'prop-types';

import teamShape from '../../helpers/props/teamShape';
import authData from '../../helpers/data/authData';

import './Player.scss';

class Player extends React.Component {
  static = {
    team: teamShape.teamShape,
    firePlayer: PropTypes.func.isRequired,
    editAPlayer: PropTypes.func.isRequired,
  }

  firePlayerEvent = (e) => {
    e.preventDefault();
    const { firePlayer, player } = this.props;
    firePlayer(player.id);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { editAPlayer, player } = this.props;
    editAPlayer(player);
  }

  render() {
    const { player } = this.props;

    return (
      player.uid === authData.getUid()
        ? <div className="card Player__container">
            <img className="card-img-top" src={player.imageUrl} alt="Player card" />
            <div className="card-body">
              <h3>{player.name}</h3>
              <div className="separator"></div>
              <h5>Position: <span className="Player--box">{player.position}</span></h5>
            </div>
            <div className="Player__button-container">
              <button className="btn Player__fire" onClick={this.firePlayerEvent}>Fire Player</button>
              <button className="btn Player__edit" onClick={this.editPlayerEvent}>Edit</button>
            </div>
          </div>
        : null
    );
  }
}

export default Player;
