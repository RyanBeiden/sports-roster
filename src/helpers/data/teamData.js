import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPlayersById = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseData(data)))
    .catch((err) => reject(err));
});

const firePlayer = (playerId) => axios.delete(`${baseUrl}/team/${playerId}.json`);

const createPlayer = (newPlayer) => axios.post(`${baseUrl}/team.json`, newPlayer);

const editPlayer = (playerId, editedPlayer) => axios.put(`${baseUrl}/team/${playerId}.json`, editedPlayer);

export default {
  getPlayersById,
  firePlayer,
  createPlayer,
  editPlayer,
};
