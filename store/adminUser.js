import { Server } from '~/utils/server';
const server = new Server();

export const state = () => ({
  user: {
    id: null,
    username: '',
    password: '',
    icon: '',
    email: '',
    nickName: '',
    tags: '',
    note: '',
    createTime: '',
    loginTime: '',
    status: 1,
    totalCommission: 0,
    balance: 0,
    firstName: '',
    lastName: '',
    regionCode: '',
    whatsappNumber: '',
    age: 0,
    gender: '',
    occupation: '',
    expectEarning: '',
    currentEarning: '',
    socialMediaType: '',
    squareStatus:0,
    myCode:'',
    refCode:'',
  }
});
export const mutations = {
  updateUser( state, user) {
    state.user = user;
  },
};
export const actions = {
  async getUser({ commit }, token) {
    let { code, data } = await server.getSelfInfo(token);
    if ( code !== 200) return;
    commit('updateUser', data);
  }
};