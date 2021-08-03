import { getCountryList } from '~/utils/server';
import { deduplication } from '~/utils';

export const state = () => ({
  list: []
});

export const mutations = {
  updateList( state, list) {
    state.list = list;
  }
};

export const actions = {
  async getList({ commit }) {
    let { code, data } = await getCountryList().catch(console.info);
    if ( code !== 200 || !Array.isArray(data)) return;
    let list = deduplication(data, 'code', true);
    commit('updateList', list);
  }
};