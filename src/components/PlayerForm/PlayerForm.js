import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
  }

  state = {
    imageUrl: '',
    name: '',
    position: '',
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

  render() {
    return (
      <form className="PlayerForm__form">
        <div className="form-group">
          <label htmlFor="newPlayerName">Player's Name</label>
          <input
          type="text"
          className="form-control"
          id="newPlayerName"
          placeholder="Aaron Finch"
          onChange={this.nameChangeEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="newImageUrl">Image</label>
          <input
          type="text"
          className="form-control"
          id="newImageUrl"
          placeholder="https://cricket.com"
          onChange={this.imageChangeEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="newPosition">Position</label>
          <select className="form-control" id="newPosition" onChange={this.positionChangeEvent}>
            <option>Wicket Keeper</option>
            <option>Batsman</option>
            <option>Captain</option>
            <option>Sweeper</option>
            <option>Bowler</option>
          </select>
        </div>
        <button className="btn btn-success" onClick={this.addPlayerEvent}>Add Player</button>
      </form>
    );
  }
}

export default PlayerForm;
