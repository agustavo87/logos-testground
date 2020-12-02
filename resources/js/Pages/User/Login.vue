<template>
  <arete-container>
    <arete-header-1>INICIAR SESIÓN:</arete-header-1>
    <div v-if="$page.props.flash['auth-error']" class=" bg-red-200 p-4 text-center max-w-md mx-auto rounded">
        {{ $page.props.flash['auth-error'] }}
    </div>
    <form @submit.prevent="submit"
    class="mx-auto max-w-md rounded-lg p-4 flex flex-col justify-start shadow-lg"
    >

    <arete-label for="email">E-mail</arete-label>
    <arete-text-input id="email" type="email" v-model="form.email" placeholder="juan@example.com" required />
    <arete-label for="password">Password:</arete-label>
    <arete-text-input type="password" id="password" v-model="form.password" required />
    <arete-checkbox class="mt-2" name="remember" v-model="form.remember">Recordar</arete-checkbox>
    <div class="flex justify-end">
      <arete-button type="submit" class="m-2">Enviar</arete-button>
      <arete-button type="reset" class="m-2">Borrar</arete-button>
    </div>
    
    
    </form>
  </arete-container>
</template>

<script>
  import Layout from '../../Layouts/Layout'
  import AreteButton from '../../Components/Button'
  import AreteTextInput from '../../Components/TextInput'
  import AreteLabel from '../../Components/Label'
  import AreteCheckbox from '../../Components/Checkbox'
  import AreteHeader1 from '../../Components/Header1'
  import AreteContainer from '../../Components/Container'

  export default {
    metaInfo() {
      return {
        title: 'Iniciar Sesión',
      }
    },
    layout: (h, page) => h(Layout, [page]),
    components: {
      AreteButton,
      AreteTextInput,
      AreteLabel,
      AreteCheckbox,
      AreteHeader1,
      AreteContainer
    },
    data () {
      return {
        form: {
          email: null,
          password: null,
          remember: false
        }
      }
    },
    methods: {
      submit() {
        this.$inertia.post(route('auth.show'), this.form)
      }
    }
  }
</script>