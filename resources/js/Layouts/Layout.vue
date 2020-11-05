<template>
  <main>
    <header class=" flex justify-center p-2 bg-blue-600 font-medium text-blue-100">
      <nav class="flex justify-center">
        <arete-nav-item :href="route('landing')" :disabled="$page.props.currentRouteName === 'landing'"> Portada </arete-nav-item>
        <arete-nav-item inertia :href="route('home')" :disabled="$page.props.currentRouteName === 'home'"> Inicio </arete-nav-item>
        <arete-nav-item inertia :href="route('auth.login.show')" :disabled="$page.props.currentRouteName === 'auth.login.show'" v-if="!$page.props.user"> Iniciar Sesión </arete-nav-item>
        <arete-nav-item inertia :href="route('auth.register.show')" :disabled="$page.props.currentRouteName === 'auth.register.show'" v-if="!$page.props.user" > Registrarse </arete-nav-item>
        <arete-nav-item inertia :href="route('logos.show')" :disabled="$page.props.currentRouteName === 'logos.show'">Logos </arete-nav-item>
      </nav>
      <div v-if="$page.props.user" class="ml-8 flex flex-col">
          <div>{{ $page.props.user.name }}</div>
          <inertia-link href="/logout"
            class="text-sm text-blue-300 hover:text-blue-100"          
          >Salir</inertia-link>
      </div>

    </header>
      
    <article class="pl-2 pt-5">
      <slot />
    </article>
  </main>
</template>

<script>
import AreteNavItem from '../Components/NavItem';

  export default {
    components: {
      AreteNavItem
    },
    mounted () {
      console.log(Ziggy);
      console.log(route().current())

    }
  }
</script>