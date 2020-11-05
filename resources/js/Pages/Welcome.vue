<template>
  <arete-container>
      <arete-header-1>Bienvenido
        {{$page.props.user ? $page.props.user.name : 'forastero'}}!
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
  }
</script>