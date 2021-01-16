require('./bootstrap');

import Vue from 'vue'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import { App, plugin } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'

import {logos} from './logosBoot';


// import { Ziggy } from '../assets/js/ziggy';
import route from 'ziggy';
// depends on object "Matice" frome @translations blade directive.
import {__, trans, setLocale, getLocale, transChoice, MaticeLocalizationConfig, locales} from "matice"



// Start Vuex store
// & register it in logos
Vue.use(Vuex);
const store = new Vuex.Store();
logos.registerStoreModules(store);
Vue.prototype.$logos = logos;  // accessible as an instance property

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

myApp.$mount(el)
window.myApp = myApp;

