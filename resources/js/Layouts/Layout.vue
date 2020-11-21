// Queda pendiente hacer que los menús se cierren cuando se inicia un link de inertia.
<template>
  <div>
    <arete-header :user="$page.props.user">
      <nav-item 
        :href="route('landing')" 
        :current="route().current('landing')"
      >
        Portada
      </nav-item>
      <nav-item
        inertia
        :href="route('home')"
        :current="route().current('home')"
      >
        Inicio
      </nav-item>
      <nav-item
        inertia
        :href="route('logos.show')"
        :current="route().current('logos.show')"
      > Logos </nav-item>
    </arete-header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import AreteHeader from "../Components/Header";
import NavItem from "../Components/NavItem";
export default {
  components: {
    AreteHeader,
    NavItem,
  },
};
</script>