import React from 'react';

import authData from '../../helpers/data/authData';
import teamData from '../../helpers/data/teamData';

import Player from '../Player/Player';
import './TeamContainer.scss';

class TeamContainer extends React.Component {
  state = {
    team: [],
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

  render() {
    const { team } = this.state;

    const teamCards = team.map((player) => <Player key={player.id} player={player} firePlayer={this.firePlayer}/>);

    return (
      <div className="TeamContainer__holder">
        {teamCards}
      </div>
    );
  }
}

export default TeamContainer;
