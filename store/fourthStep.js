export const state = () => ({
    postImageTask: "1 Post(Image) Task(s)",
    postVideoTask: "",
    storyImageTask: "",
    storyVideoTask: "",
})
export const mutations = {
    CHANGE_IMAGETASK: (state, { postImageStr, postVideoStr, storyImageStr, storyVideoStr }) => {
        console.log(postImageStr);
        state.postImageTask = postImageStr;
        state.postVideoTask = postVideoStr;
        state.storyImageTask = storyImageStr;
        state.storyVideoTask = storyVideoStr;
    },
}
export const actions = {
    changeImageTask({ commit }, { newImageTask }) {
        commit("CHANGE_IMAGETASK", newImageTask);
    }
}

//  export default {
//      namespaced:true,
//      state,
//      mutations,
//      actions
//  }