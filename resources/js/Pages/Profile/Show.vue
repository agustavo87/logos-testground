<template>
  <arete-container>
    <arete-header-1>{{ user.name }}</arete-header-1>
    <p>Información de Usuario:</p>
    <ul>
      <li>E-Mail: {{user.email}}</li>
      <li>País: {{ country.name }}</li>
      <li>Miembro desde: {{ user.created_at }}</li>
    </ul>
  </arete-container>
</template>

<script>
  import Layout from '../../Layouts/Layout'
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
      AreteHeader1,
      AreteContainer
    },
    props: ['user', 'country'],
    data () {
      return {
        form: {
          name: null,
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
          locale: this.countryLang
        }
        return Object.assign(newForm, this.form)
      }
    },
    methods: {
      submit() {
        console.log('enviando...')
        
        this.$inertia.post(route('auth.register'), this.fullForm)
      }
    }
  }
</script>