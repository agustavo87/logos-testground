<template>
  <arete-container>
    <arete-header-1>Registro:</arete-header-1>
    <form @submit.prevent="submit"
    class="mx-auto max-w-sm rounded-lg p-4 flex flex-col justify-start shadow-lg"
    >
      <arete-label for="name">Nombre:</arete-label>
      <arete-text-input id="name" type="text" v-model="form.name" placeholder="Juan Perez" required />
      <arete-label for="email">E-mail:</arete-label>
      <arete-text-input id="email" type="email" v-model="form.email" placeholder="juan@example.com" required />
      <arete-label for="password">Password:</arete-label>
      <arete-text-input type="password" id="password" v-model="form.password" required />
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
  import AreteHeader1 from '../../Components/Header1'
  import AreteContainer from '../../Components/Container'

  export default {
    metaInfo() {
      return {
        title: 'Registrarse',
      }
    },
    layout: (h, page) => h(Layout, [page]),
    components: {
      AreteButton,
      AreteTextInput,
      AreteLabel,
      AreteHeader1,
      AreteContainer
    },
    data () {
      return {
        form: {
          name: null,
          email: null,
          password: null,
        }
      }
    },
    methods: {
      submit() {
        console.log('enviando...')
        this.$inertia.post('/register', this.form)
      }
    }
  }
</script>