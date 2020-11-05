require('./bootstrap');

import { App, plugin } from '@inertiajs/inertia-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import { InertiaProgress } from '@inertiajs/progress'
import route from 'ziggy';
import { Ziggy } from '../assets/js/ziggy';

InertiaProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 0,

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


Vue.mixin({
  methods: {
    route: (name, params, absolute) => route(name, params, absolute, Ziggy),
  },
});
window.myZiggy = Ziggy;
window.route = route;

const el = document.getElementById('app');

new Vue({
  render: h => h(App, {
    props: {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    },
  }),
}).$mount(el)

