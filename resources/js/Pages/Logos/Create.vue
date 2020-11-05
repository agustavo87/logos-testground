<template>
  <arete-container>
    <arete-header-1>Logos</arete-header-1>
    <div class="container-main">
      <p>¿Listo para crear?</p>
      <p>Hola este es tu mensaje: <em>{{msg}}</em></p>
      <arete-button type="submit">Hola</arete-button>
      <!-- <img class="rounded-lg" src="https://i.ytimg.com/vi/amoeAh5EzQc/maxresdefault.jpg">
      <img src="https://3.bp.blogspot.com/-E4pO5fXm9q8/U0Io9dIVPVI/AAAAAAAAAHQ/0xXXFp7IlAo/s1600/buho+sue%C3%B1o.jpg" alt="buho"> -->
    </div>
  </arete-container>
</template>

<script>
  import Layout from '../../Layouts/Layout'
  import AreteButton from '../../Components/Button'
  import AreteContainer from '../../Components/Container'
  import AreteHeader1 from '../../Components/Header1'

  export default {
    metaInfo() {
      return {
        title: 'Es hora de crear!',
      }
    },
    layout: (h, page) => h(Layout, [page]),
    components: {
      AreteButton,
      AreteContainer,
      AreteHeader1
    },
    props: {
      msg: String,
      auth: Boolean,
      user: Object
    },
  }
</script>