import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mensagem: {
      msg: "Tests",
      type: "error",
      value: false
    }
  },
  mutations: {
    'CHANGE_MSG': (state, msgObj) => {
        state.mensagem = msgObj;
    }
  },
  actions: {

  }
})
