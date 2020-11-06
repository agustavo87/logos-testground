<template>
  <arete-container>
      <arete-header-1>
        {{ $trans('messages.greet.someone', {args: {name: name } } ) }}
        </arete-header-1>
      <div>
        <p>Este es tu mensaje: <em>{{msg}}</em></p>
      </div>
  </arete-container>
</template>

<script>
  import Layout from '../Layouts/Layout'
  import AreteHeader1 from '../Components/Header1'
  import AreteContainer from '../Components/Container'

  export default {

    layout: (h, page) => h(Layout, [page]),
    components: {
      AreteHeader1,
      AreteContainer
    },

    metaInfo() {
      return {
        title: 'Bienvenido!',
      }
    },

    props: {
      msg: String,
      auth: Boolean,
      user: Object,
    },
    computed: {
      name() {
        return this.$page.props.user ? this.$page.props.user.name : 'forastero'
      }
    }
  }
</script>