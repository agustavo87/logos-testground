require('./bootstrap');

import Vue from 'vue'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import { App, plugin } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'

// import { Ziggy } from '../assets/js/ziggy';
import route from 'ziggy';
// depends on object "Matice" frome @translations blade directive.
import {__, trans, setLocale, getLocale, transChoice, MaticeLocalizationConfig, locales} from "matice"


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  mutations: {
    increment (state, n) {
      state.count += n;
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 3)
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment', 5)
      }, 5000)
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})

Vue.mixin({
  methods: {
    route: (name, params, absolute) => route(name, params, absolute, Ziggy),
  },
});

// Matice -translations-.
Vue.mixin({
  methods: {
      $trans: trans,
      $__: __,
      $transChoice: transChoice,
      $setLocale: (locale) => {
        setLocale(locale);
        myApp.$forceUpdate() // Refresh the vue instance after locale change.
      },
      // The current locale
      $locale() {
          // return getLocale()
          return this.$inertia.page.props.locale;
      },
      // A listing of the available locales
      $locales() {
          return locales()
      }
  },
})

InertiaProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 250,

  // The color of the progress bar.
  color: '#aef',

  // Whether to include the default NProgress styles.
  includeCSS: true,

  // Whether the NProgress spinner will be shown.
  showSpinner: false,
})



Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(plugin);

const el = document.getElementById('app');

const myApp = new Vue({
  render: h => h(App, {
    props: {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: function (name) {
        return require(`./Pages/${name}`).default
      },
    },
  }),
  store: store
})

store.dispatch('increment');
store.dispatch('incrementAsync');

myApp.$mount(el)
window.myApp = myApp;
