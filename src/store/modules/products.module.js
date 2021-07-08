import axios from "axios";

const state = () => ({
  products: [],
  product: {},
  search: "",
  category: "",
  sort: 0,
});

const getters = {};

const actions = {
  getProducts: async ({commit}) => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/api/product")
      commit("GET_PRODUCTS", res.data)
    } catch (e) {
      console.log(e)
    }
  },
  getProductById: async ({commit}, id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/api/product/${id}`)
      commit("GET_PRODUCTS_BY_ID", res.data)
    } catch (e) {
      console.log(e)
    }
  },
  getProductByCategory: async ({commit}, category) => {
    const res = await axios.get(`http://127.0.0.1:3000/api/category/${category}`)
    commit('GET_PRODUCT_BY_CATEGORY', res.data)
  }
};
const mutations = {
  GET_PRODUCTS (state, products) {
    state.products = products
  },
  GET_PRODUCT_BY_CATEGORY (state, category) {
    state.products = category.products
    },
  GET_PRODUCTS_BY_ID: (state, product) => {
    state.product = product
  },
  SORT_PRODUCT:(state, direction) => {
    if(direction === -1) {
      state.products = state.products.sort((a,b) => a.price - b.price)
    }
    if(direction === 1) {
      state.products = state.products.sort((a,b) => b.price - a.price)
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
