<template>
  <arete-container>
      <arete-header-1>
        {{ appName }}: {{ $trans('messages.greet.someone', {args: {name: name } } ) }}
        </arete-header-1>
      <div>
        <p class="text-xs text-right">
          <strong>Lenguajes</strong><br>
          Actual: <em>{{ $locale() }}</em> <br>
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

      <p>
        Inertia Locale : {{ $page.props.locale}}
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

    // porque se es redirigido aquí luego de iniciar sesión
    // lo cual puede cambiar el idioma, pero Vue no se entera
    // puesto que esto cambia del lado del servidor
    // y no se actualiza Matice.
    // beforeMount () {
    //     let newLocale = this.$page.props.locale
    //     console.log ('actualizando locale a: ', newLocale);
    //     this.$setLocale(newLocale);
    // },



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