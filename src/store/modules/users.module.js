import axios from "axios";

const state = () => ({
  user: {},
  isLoginSuccess: false,
  loginMessage: "",
  isRegisterSuccess: false,
  registerMessage: "",
});

const getters = {};

const actions = {
  async login({ commit }, user) {
    try {
      const res = await axios.post("http://127.0.0.1:3000/api/user/login", user)
      console.log(res)
      commit("setUser", user);
      commit("setLoginSuccess", true);
      commit("setLoginMessage", "");
    } catch (error) {
      commit("setLoginSuccess", false);

      const errorResponse = error.response;
      if (errorResponse && errorResponse.status === 400) {
        commit(
          "setLoginMessage",
          errorResponse.data?.message || "Login failed!"
        );
      } else {
        commit("setLoginMessage", "Login failed!");
      }
    }
  },

  async register({ commit }, user) {
    try {
      const res = await axios.post('http://127.0.0.1:3000/api/user/register', user)
      console.log(res.data)
      commit("setRegisterSuccess", true);
      commit("setRegisterMessage", "");
    } catch (e) {
      console.log(e)
      commit("setRegisterMessage", e.message === "Request failed with status code 400" ? "Email already in use" : "");
      commit("setRegisterSuccess", false);
    }
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setLoginSuccess(state, status) {
    state.isLoginSuccess = status;
  },

  setLoginMessage(state, message) {
    state.loginMessage = message;
  },

  setRegisterSuccess(state, status) {
    state.isRegisterSuccess = status;
  },

  setRegisterMessage(state, message) {
    state.registerMessage = message;
  },

  logout(state) {
    state.user = {};
    state.isLoginSuccess = false;
    state.isRegisterSuccess = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
