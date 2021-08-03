export const state =()=>({
    active : 1,
})
export const mutations = {
    "CHANGE_ACTIVE":(state, newActive) => {
        state.active = newActive;
    }
}

export const actions = {
    changeActive ({commit},{newActive}){
        commit("CHANGE_ACTIVE",newActive)
    }
}

// export default {
//     namespaced:true,
//     state,
//     mutations,
//     actions
// }