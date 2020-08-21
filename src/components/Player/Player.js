import React from 'react';

import teamShape from '../../helpers/props/teamShape';

import './Player.scss';

class Player extends React.Component {
  static = {
    team: teamShape.teamShape,
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card Player__container">
        <img className="card-img-top" src={player.imageUrl} alt="Player card" />
        <div className="card-body">
          <h3>{player.name}</h3>
          <div className="separator"></div>
          <h5>Position: <span className="Player--box">{player.position}</span></h5>
        </div>
      </div>
    );
  }
}

export default Player;
