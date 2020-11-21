<template>
<div class="relative">
    <button class=" block h-8 w-8 rounded-full overflow-hidden border-2 border-white border-opacity-50 hover:border-opacity-100 focus:outline-none focus:border-opacity-100" @click="isOpen = !isOpen">
      <img src="../../img/panther-profile.png" alt="Gustavo" class="relative z-10 h-full w-full object-cover">
    </button>
    <button  v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 left-0 h-full w-full bg-black cursor-default opacity-25"></button>
    <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
      <account-dropdown-item 
        inertia
        :href="route('auth.login.show')"
        :current="currentPage === 'auth.login.show'" 
        v-if="!user"
        @selection="isOpen = false"
      >
        Iniciar Sesión
      </account-dropdown-item>
      <account-dropdown-item 
        inertia
        :href="route('user.register.show')"
        :current="currentPage === 'user.register.show'"
        v-if="!user"
        @selection="isOpen = false"
      >
        Registrarse
      </account-dropdown-item>
      <account-dropdown-item 
        inertia
        :href="route('user.show', [user.id])"
        :current="currentPage === 'user.show'" 
        v-if="user"
        @selection="isOpen = false"
      >
        Mostrar Perfil
      </account-dropdown-item>
      <account-dropdown-item 
        inertia
        :href="route('user.edit', [user.id])"
        :current="currentPage === 'user.edit'" 
        v-if="user"
        @selection="isOpen = false"
      >
        Editar Perfil
      </account-dropdown-item>
      <account-dropdown-item 
        inertia
        :href="route('auth.logout')"
        v-if="user"
        @selection="isOpen = false"
      >
        Salir
      </account-dropdown-item>
    </div>
</div>
</template>

<script>

  import AccountDropdownItem from './AccountDropdownItem'

  export default {
    components: {
      AccountDropdownItem
    },
    props: {
      user: Object,
      currentPage: String  // Es necesario para la actualización del estado que cambie estos datos.
    },
    data() {
      return {
        isOpen: false
      }
    },
    created() {
      const handleEscape = (e) => {
        if(e.key === 'Esc' || e.key === "Escape") {
          this.isOpen = false
        }
      }

      document.addEventListener('keydown', handleEscape)

      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('keydown', handleEscape)
      })

    },
    methods: {
      log() {
        console.log('selected!')
      }
    }
  }

</script>