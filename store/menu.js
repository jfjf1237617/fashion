export const state = () => ({
  value: ''
});

export const mutations = {
  change( state, value ) {
    state.value = value;
  }
};