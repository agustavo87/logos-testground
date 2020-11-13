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
      <arete-label for="country">Elige un país:</arete-label>
      <arete-select id="country" v-model="form.country" required placeholder="selecciona un país...">
        <option 
          v-for="countryCode in Object.keys(countries)" 
          :key="countryCode" 
          :value="countryCode"
        >
          {{ countries[countryCode].name }}  
        </option>
      </arete-select>
      
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
  import AreteSelect from '../../Components/Select'

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
      AreteSelect,
      AreteHeader1,
      AreteContainer
    },
    props: ['countries', 'defLang'],
    data () {
      return {
        form: {
          name: null,
          email: null,
          password: null,
          country: null,
        }
      }
    },
    computed: {
      countryLang() {
        return this.form.country ? this.countries[this.form.country].language : this.defLang;
      },
      fullForm() {
        let newForm = {
          language: this.countryLang
        }
        return Object.assign(newForm, this.form)
      }
    },
    methods: {
      submit() {
        console.log('enviando...')
        
        this.$inertia.post(route('user.register'), this.fullForm)
      }
    }
  }
</script>