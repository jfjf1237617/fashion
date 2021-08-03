export const state =()=> ({
	productService: "1 Product(s)",
})


export const mutations = {
	CHANGE_PRODUCTSERVICE: (state, newProductService) => {
		state.productService = newProductService;
	},
}
export const actions = {
	changeProductService({ commit }, { newProductService }) {
		commit("CHANGE_PRODUCTSERVICE", newProductService);
	}
}

// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions
// }