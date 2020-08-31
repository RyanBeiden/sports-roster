import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    playerCurrentlyEditing: PropTypes.object.isRequired,
    updatePlayer: PropTypes.func.isRequired,
  }

  state = {
    imageUrl: '',
    name: '',
    position: '',
    isEditing: false,
  }

  componentDidMount() {
    const { playerCurrentlyEditing } = this.props;
    if (playerCurrentlyEditing.name) {
      this.setState({
        imageUrl: playerCurrentlyEditing.imageUrl,
        name: playerCurrentlyEditing.name,
        position: playerCurrentlyEditing.position,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.playerCurrentlyEditing;
    const incomingPlayer = this.props.playerCurrentlyEditing;

    if (prevPlayer.name !== incomingPlayer.name) {
      this.setState({
        name: incomingPlayer.name || '',
        imageUrl: incomingPlayer.imageUrl || '',
        position: incomingPlayer.position || '',
        isEditing: !!incomingPlayer.name,
      });
    }
  }

  nameChangeEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  imageChangeEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  positionChangeEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  addPlayerEvent = (e) => {
    e.preventDefault();
    const { imageUrl, name, position } = this.state;
    const { createPlayer } = this.props;

    const newPlayer = {
      name,
      imageUrl,
      position,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { name, imageUrl, position } = this.state;
    const { updatePlayer, playerCurrentlyEditing } = this.props;

    const playerWithChanges = {
      name,
      imageUrl,
      position,
      uid: authData.getUid(),
    };

    updatePlayer(playerCurrentlyEditing.id, playerWithChanges);
  }

  render() {
    const {
      name,
      position,
      imageUrl,
      isEditing,
    } = this.state;

    return (
      <form className="PlayerForm__form">
        <div className="form-group">
          <label htmlFor="newPlayerName">Player's Name</label>
          <input
          type="text"
          className="form-control"
          id="newPlayerName"
          placeholder="Aaron Finch"
          value={name}
          onChange={this.nameChangeEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="newImageUrl">Image</label>
          <input
          type="text"
          className="form-control"
          id="newImageUrl"
          placeholder="https://cricket.com"
          value={imageUrl}
          onChange={this.imageChangeEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="newPosition">Position</label>
          <select className="form-control" id="newPosition" onChange={this.positionChangeEvent} value={position}>
            <option>Wicket Keeper</option>
            <option>Batsman</option>
            <option>Captain</option>
            <option>Sweeper</option>
            <option>Bowler</option>
          </select>
        </div>
        { isEditing
          ? <button className="btn btn-success" onClick={this.editPlayerEvent}>Update Player</button>
          : <button className="btn btn-success" onClick={this.addPlayerEvent}>Add Player</button>
        }
      </form>
    );
  }
}

export default PlayerForm;
