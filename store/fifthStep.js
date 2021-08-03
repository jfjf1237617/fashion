export const state =()=> ({
    doItem: "1 Do Item(s)",
})
export const mutations = {
    CHANGE_DOITEM: (state, newdoItem) => {
        state.doItem = newdoItem;
    },
}
export const actions = {
    changeDoItem({ commit }, { newDoItem }) {
        commit("CHANGE_DOITEM", newDoItem);
    }
}

//  export default {
//      namespaced:true,
//      state,
//      mutations,
//      actions
//  }