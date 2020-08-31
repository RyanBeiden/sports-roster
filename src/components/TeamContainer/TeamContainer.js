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
    editPlayer: {},
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

  editAPlayer = (playerToEdit) => {
    this.setState({ openForm: true, editPlayer: playerToEdit });
  }

  updatePlayer = (playerId, editedPlayer) => {
    teamData.editPlayer(playerId, editedPlayer)
      .then(() => {
        this.teamRefresh();
        this.setState({ openForm: false });
      })
      .catch((err) => console.error('Updating the player did not work -> ', err));
  }

  render() {
    const { team, openForm, editPlayer } = this.state;

    const teamCards = team.map((player) => <Player
      key={player.id}
      player={player}
      firePlayer={this.firePlayer}
      editAPlayer={this.editAPlayer}
    />);

    return (
      <div className="TeamContainer__holder">
        <div className="TeamContainer__createButton">
          {openForm
            ? <button className="btn btn-success" onClick={() => { this.setState({ openForm: !openForm }); }}>
              <i className="fas fa-times"></i></button>
            : <button className="btn btn-success" onClick={() => { this.setState({ openForm: !openForm, editPlayer: {} }); }}>
              <i className="fas fa-plus"></i></button>
          }
          {openForm
            ? <PlayerForm
              createPlayer={this.createPlayer}
              playerCurrentlyEditing={editPlayer}
              updatePlayer={this.updatePlayer}/>
            : ''}
        </div>
        <div className="TeamContainer__teamCards">
          {teamCards}
        </div>
      </div>
    );
  }
}

export default TeamContainer;
