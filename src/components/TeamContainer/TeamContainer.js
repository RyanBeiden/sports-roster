import React from 'react';

import authData from '../../helpers/data/authData';
import teamData from '../../helpers/data/teamData';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import './TeamContainer.scss';

class TeamContainer extends React.Component {
  state = {
    team: [],
    openForm: false,
  }

  teamRefresh = () => {
    teamData.getPlayersById(authData.getUid())
      .then((team) => this.setState({ team }))
      .catch((err) => console.error('Getting the team broke -> ', err));
  }

  componentDidMount() {
    this.teamRefresh();
  }

  firePlayer = (playerId) => {
    teamData.firePlayer(playerId)
      .then(() => {
        this.teamRefresh();
      })
      .catch((err) => console.error('Firing the player did not work -> ', err));
  }

  createPlayer = (newPlayer) => {
    teamData.createPlayer(newPlayer)
      .then(() => {
        this.teamRefresh();
        this.setState({ openForm: false });
      })
      .catch((err) => console.error('Adding a new player did not work -> ', err));
  }

  render() {
    const { team, openForm } = this.state;

    const teamCards = team.map((player) => <Player key={player.id} player={player} firePlayer={this.firePlayer}/>);

    return (
      <div className="TeamContainer__holder">
        <div className="TeamContainer__createButton">
          <button className="btn btn-success" onClick={() => { this.setState({ openForm: !openForm }); }}>
            {openForm ? <i className="fas fa-times"></i> : <i className="fas fa-plus"></i>}
          </button>
          {openForm ? <PlayerForm createPlayer={this.createPlayer}/> : ''}
        </div>
        <div className="TeamContainer__teamCards">
          {teamCards}
        </div>
      </div>
    );
  }
}

export default TeamContainer;
