import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});
const qs = require('qs');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

const host = ''
const axiosSetting = {
  proxy: {
    host: host,
    port: 3000
  }
}


import {
  MAIN__GET_DATA,
  MAIN__SET_DATA,
} from '../const/main';

export default {
  namespaced: true,
  state: {

  },
  mutations: {
    [MAIN__SET_DATA](state, {data}) {
      state.total = data.total
      state.items = data.items
      state.filterData = data.aggs
    },
  },
  actions: {
    // получение списка объектов
    async [MAIN__GET_DATA]({commit}, formData) {
      try {
        let url = host + "/rest/search?" + qs.stringify(formData)
        const resp = await axios.get(url, axiosSetting);
        commit(MAIN__SET_DATA, {data: resp.data}) // обновление списка
      } catch (e) {
        console.error('Error fetching MAIN__GET_DATA');
      }
    },
  },
};
