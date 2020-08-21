import React from 'react';

import authData from '../../helpers/data/authData';
import teamData from '../../helpers/data/teamData';

import Player from '../Player/Player';
import './TeamContainer.scss';

class TeamContainer extends React.Component {
  state = {
    team: [],
  }

  componentDidMount() {
    teamData.getPlayersById(authData.getUid())
      .then((team) => this.setState({ team }))
      .catch((err) => console.error('Getting the team broke -> ', err));
  }

  render() {
    const { team } = this.state;

    const teamCards = team.map((player) => <Player key={player.id} player={player}/>);

    return (
      <div className="TeamContainer__holder">
        {teamCards}
      </div>
    );
  }
}

export default TeamContainer;
