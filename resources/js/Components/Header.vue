<template>
<header class="bg-gray-900 sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center">
  <div class="flex justify-between items-center px-4 py-3 sm:p-0">
    <!-- Logo -->
    <div>
      <img class="h-8" src="../../img/logo-cuadrado.png" alt="Martón Dj">
    </div>

    <!-- xs Menú Button -->
    <div class="sm:hidden">
      <button @click="isOpen = !isOpen"  class="block h-6 w-6 text-white opacity-75 hover:opacity-100 focus:opacity-100 focus:outline-none">
        <svg v-if="!isOpen" class="h-6 w-6 fill-current" x-description="Heroicon name: menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-if="isOpen" class="h-6 w-6 fill-current" x-description="Heroicon name: x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button> 
    </div>

  </div>

    <!-- Navbar -->
    <nav :class="isOpen ? 'block' : 'hidden'" class="sm:block">
      
      <div  class="text-sm px-2 pt-2 pb-4 sm:flex sm:p-0">

        <!-- Items -->
        <slot></slot>

        <!--Dropdown de cuenta de usuario: sm+ -->
        <account-dropdown class="hidden sm:block sm:ml-6" :user="user" :currentPage="route().current()"></account-dropdown>
      
      </div>

      <!-- account dropdown xs -->
      <div class="px-4 py-5 border-t border-gray-800 sm:hidden">

        <!-- Imagen de perfil -->
        <div class="flex items-center">
          <img src="../../img/panther-profile.png" alt="Gustavo" class="h-8 w-8 rounded-full border-2 border-gray-600  object-cover">
          <span class="ml-3 text-white font-semibold">{{ user ? user.name : 'Invitado'}}</span>
        </div>

        <!-- Items -->
        <div class="mt-4 text-sm">
          <account-mobile-item 
            inertia
            :href="route('auth.show')"
            :current="route().current('auth.show')" 
            v-if="!user"
            first 
          >
            Iniciar Sesión
          </account-mobile-item>
          <account-mobile-item 
            inertia
            :href="route('user.register.show')"
            :current="route().current('user.register.show')"
            v-if="!user"
          >
            Registrarse
          </account-mobile-item>
          <account-mobile-item 
            inertia
            :href="route('user.show', [user.id])"
            :current="route().current('user.show')" 
            v-if="user"
          >
            Mostrar Perfil
          </account-mobile-item>
          <account-mobile-item 
            inertia
            :href="route('user.edit', [user.id])"
            :current="route().current('user.edit')" 
            v-if="user"
          >
            Editar Perfil
          </account-mobile-item>
          <account-mobile-item 
            inertia
            :href="route('auth.logout')"
            v-if="user"
          >
            Salir
          </account-mobile-item>
        </div>

      </div>

    </nav>

</header>
</template>

<script>

// import { Inertia } from '@inertiajs/inertia'
import AccountDropdown from './AccountDropdown'
import AccountMobileItem from './AccountMobileItem'

  export default {
    components: {
      AccountDropdown,
      AccountMobileItem
    },

    props: {
      user: Object,
      default: null
    },
    data() {
      return {
        isOpen: true
      }
    }
  }

</script>