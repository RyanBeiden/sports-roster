import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPlayersById = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseData(data)))
    .catch((err) => reject(err));
});

export default { getPlayersById };
