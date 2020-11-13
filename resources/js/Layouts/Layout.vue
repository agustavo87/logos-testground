<template>
  <main>
    <header
      class="flex justify-center p-2 bg-blue-600 font-medium text-blue-100"
    >
      <nav class="flex justify-center">
        <arete-nav-item
          :href="route('landing')"
          :disabled="route().current('landing')"
        >
          Portada
        </arete-nav-item>
        <arete-nav-item
          inertia
          :href="route('home')"
          :disabled="route().current('home')"
        >
          Inicio
        </arete-nav-item>
        <arete-nav-item
          inertia
          :href="route('auth.login.show')"
          :disabled="route().current('auth.login.show')"
          v-if="!$page.props.user"
        >
          Iniciar Sesión
        </arete-nav-item>
        <arete-nav-item
          inertia
          :href="route('auth.register.show')"
          :disabled="route().current('auth.register.show')"
          v-if="!$page.props.user"
        >
          Registrarse
        </arete-nav-item>
        <arete-nav-item
          inertia
          :href="route('profile.show', [$page.props.user.id])"
          :disabled="route().current('profile.show')"
          v-if="$page.props.user"
        >
          Mostrar Perfil
        </arete-nav-item>
        <arete-nav-item
          inertia
          :href="route('profile.edit', [$page.props.user.id])"
          :disabled="route().current('profile.edit')"
          v-if="$page.props.user"
        >
          Editar Perfil
        </arete-nav-item>
        <arete-nav-item
          inertia
          :href="route('logos.show')"
          :disabled="route().current('logos.show')"
          >Logos
        </arete-nav-item>
      </nav>
      <div v-if="$page.props.user" class="ml-8 flex flex-col">
        <div>{{ $page.props.user.name }}</div>
        <inertia-link
          :href="route('auth.logout')"
          class="text-sm text-blue-300 hover:text-blue-100"
          >Salir</inertia-link
        >
      </div>
    </header>

    <article class="pl-2 pt-5">
      <slot />
    </article>
  </main>
</template>

<script>
import AreteNavItem from "../Components/NavItem";

export default {
  components: {
    AreteNavItem,
  }
};
</script>