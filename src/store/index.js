import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/components/axios-auth.js'

import ingredients from './modules/ingredients'
import portfolio from './modules/portfolio'
import globalaxios from 'axios'
const url = 'https://dog.ceo/api/breeds/image/random'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dogpic: null,
    isLoading: null,
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    setDogImg (state, response) {
      state.isLoading = null
      state.dogpic = response.data.message
    },
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
      alert('Logout Successfully!')
    }
  },
  actions: {
    getDogImg ({ commit, state }, response) {
      state.isLoading = true
      globalaxios
        .get(`${url}`)
        .then(response => {
          console.log(response)
          commit('setDogImg', response)
        })
        .catch(err => { console.log(err) })
    },
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup ({ commit, dispatch }, authData) {
      console.log(authData)
      axios.post('accounts:signUp?key=AIzaSyAJD-32GmlamnMcYJ1GcASY1rJ3RBWj1X4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          alert('Sign up Successfully!')
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(res => console.log(authData.email, authData.password))
    },
    login ({ commit, dispatch }, authData) {
      axios.post('accounts:signInWithPassword?key=AIzaSyAJD-32GmlamnMcYJ1GcASY1rJ3RBWj1X4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res)
          alert('Sign In Successfully!')
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(res => console.log(res))
    },
    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
    storeUser ({ commit, state }, userData) {
      if (!state.idToken) {
        return
      }
      console.log(userData)
      globalaxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser ({ commit, state }) {
      if (!state.idToken) {
        return
      }
      globalaxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (const key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0])
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  },
  modules: {
    ingredients,
    portfolio
  }
})
