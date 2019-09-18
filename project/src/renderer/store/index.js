import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Prompt: []
  },
  mutations: {
    setPrompt(state, text) {
      state.Prompt.push(text)
    },
    delPrompt(state) {
      state.Prompt = []
    },
  },
  actions: {
  }
})
