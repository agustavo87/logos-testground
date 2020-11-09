<template>
  <arete-container>
      <arete-header-1>
        {{ appName }}: {{ $trans('messages.greet.someone', {args: {name: name } } ) }}
        </arete-header-1>
      <div>
        <p class="text-xs text-right">
          <strong>Lenguajes</strong><br>
          Actual:<em>{{ $locale() }}</em> <br>
          Disponibles: <em>{{ $locales() }}</em>
        </p>
        <p>Este es tu mensaje: <em>{{msg}}</em></p>
      </div>
      <p>
        Llevas aquí: 5 {{ $transChoice('messages.seconds', 5)}}<br>
        Tienes permiso para 1 {{ $transChoice('messages.minutes', 0) }}
      </p>
      <p>
        Además {{ $__('You eat it doubled') }}.
      </p>
      <p>
        Por otra parte:
        <ul>
          <li>{{ $__('auth.failed') }}</li>
          <li>{{ $__("validation.string", { args: { attribute:"tu vieja" } } ) }}</li>
        </ul>
      </p>

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

    props: ['msg', 'appName', 'user'],
    computed: {
      name() {
        return this.$page.props.user ? this.$page.props.user.name : 'forastero'
      }
    }
  }
</script>