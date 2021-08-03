export const state = () => ({
  categories: [
    "Hardware & Industry",
    "Sports & Outdoors",
    "Home Appliance",
    "3C & Digital",
    "Auto Parts",
    "Musical Instruments",
    "Pet Supplies",
    "Large Furniture",
    "Toys",
    "Smart Digital",
    "Digital Audio",
    "Photo Background",
    "Telescope",
    "Camera",
    "Office",
    "Furniture Accessories",
    "Outdoors Furniture",
    "Living Room",
    "Kids Furniture",
    "Bedroom",
    "Beauty & Personal Care",
    "Dining Room",
    "Toys & Games",
    "Backpack",
    "Feature Pack",
    "Outdoor Door",
    "Fitness",
    "Outdoor Equipment",
    "Tool Accessories",
    "Hardware",
    "Industrial Supplies",
    "Gardening",
    "Festival Decoration",
    "Small Home Appliances",
    "Bedding",
    "Bath Room",
    "Kitchen & Toilet",
    "Household appliances",
    "Organizers",
    "Curtains",
    "Indoor lighting",
    "Beauty Supplies",
    "Dental Supplies",
    "Health Care",
    "Epidemic Prevention",
    "Mask",
    "Protection & Equipment",
    "Wardrobe",
    "Bed",
    "Bedside Cupboard",
    "Dresser",
    "Mattress",
    "Shoe Cabinet",
    "Chairs",
    "Tables",
    "Display Cabinet & Shelf",
    "Sofa Beside Table",
    "Sofa",
    "TV cabinet",
    "Cupboard & Sideboard",
    "Chair",
    "Table",
    "Patio Umbrellas",
    "Filing Cabinet & Locker",
    "Desk & Computer Desk",
    "Office Chair & Computer Chair",
  ],
  categoriesMap:new Map(),
  // categoriesMap: new Map([
  //   ["Hardware & Industry", 399],
  //   ["Sports & Outdoors", 330],
  //   ["Home Appliance", 467],
  //   ["3C & Digital", 28],
  //   ["Auto Parts", 534],
  //   ["Musical Instruments", 537],
  //   ["Pet Supplies", 548],
  //   ["Large Furniture", 174],
  //   ["Toys", 248],
  //   ["Smart Digital", 38],
  //   ["Digital Audio", 58],
  //   ["Photo Background", 556],
  //   ["Telescope", 559],
  //   ["Camera", 522],
  //   ["Office", 504],
  //   ["Furniture Accessories", 531],
  //   ["Outdoors Furniture", 503],
  //   ["Living Room", 500],
  //   ["Kids Furniture", 539],
  //   ["Bedroom", 499],
  //   ["Beauty & Personal Care", 546],
  //   ["Dining Room", 502],
  //   ["Toys & Games", 249],
  //   ["Backpack", 520],
  //   ["Feature Pack", 521],
  //   ["Outdoor Door", 558],
  //   ["Fitness", 352],
  //   ["Outdoor Equipment", 338],
  //   ["Tool Accessories", 555],
  //   ["Hardware", 400],
  //   ["Industrial Supplies", 438],
  //   ["Gardening", 494],
  //   ["Festival Decoration", 536],
  //   ["Small Home Appliances", 547],
  //   ["Bedding", 553],
  //   ["Bath Room", 493],
  //   ["Kitchen & Toilet", 495],
  //   ["Household appliances", 560],
  //   ["Organizers", 492],
  //   ["Curtains", 491],
  //   ["Indoor lighting", 497],
  //   ["Beauty Supplies", 550],
  //   ["Dental Supplies", 551],
  //   ["Health Care", 552],
  //   ["Epidemic Prevention", 101],
  //   ["Mask", 477],
  //   ["Protection & Equipment", 155],
  //   ["Wardrobe", 508],
  //   ["Bed", 505],
  //   ["Bedside Cupboard", 507],
  //   ["Dresser", 509],
  //   ["Mattress", 506],
  //   ["Shoe Cabinet", 524],
  //   ["Chairs", 540],
  //   ["Tables", 513],
  //   ["Display Cabinet & Shelf", 512],
  //   ["Sofa Beside Table", 511],
  //   ["Sofa", 510],
  //   ["TV cabinet", 514],
  //   ["Cupboard & Sideboard", 523],
  //   ["Chair", 516],
  //   ["Table", 515],
  //   ["Patio Umbrellas", 554],
  //   ["Filing Cabinet & Locker", 519],
  //   ["Desk & Computer Desk", 517],
  //   ["Office Chair & Computer Chair", 518]
  // ]),
  // "Cars & Motorcycles",
  // "Musical Instruments",
  someCategories: [],
  categoryId: undefined,
  checkCategories: []
})
export const mutations = {
  m_render_categories(state, payload) {
    state.categories = payload;
  },
  m_update_checkCategories(state, payload) {
    if (state.checkCategories.includes(payload)) {
      let index = state.checkCategories.findIndex((item) => {
        return item === payload
      })
      state.checkCategories.splice(index, 1);
      this.$cookies.set("category", JSON.state.checkCategories);
    } else {
      state.checkCategories.push(payload);
      this.$cookies.set("category", state.checkCategories);
    }
  },
  m_get_checkCategories(state, payload) {
    state.checkCategories = payload;
    this.$cookies.set("category", state.checkCategories);
  },
  m_clear_checkCategories(state) {
    state.checkCategories = [];
    this.$cookies.set("category", state.checkCategories);
  },
  m_update_categoryId(state, payload) {
    state.categoryId = payload;
  },
  m_get_someCategories(state, payload) {
    state.someCategories = state.categories.slice(parseInt(payload));
  },
  m_get_categoriesMap(state,payload){
    state.categoriesMap=payload;
  }
}
// export const actions = {
//   a_get_categories({ commit, token}){
//     let {code,data}=await
//   }
// }
