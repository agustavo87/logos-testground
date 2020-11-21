<template>
<div>
    <arete-header>
        <nav-item href="#" current> Portada </nav-item>
        <nav-item href="/" inertia> Inicio </nav-item>
        <nav-item href="#" > Logos </nav-item>
    </arete-header>
    <inertia-link href="/">inertia link control</inertia-link><br>
    <din-archor href="/" inertia>din-archor link control</din-archor>
</div>
</template>

<script>
import AreteHeader from '../../Components/Header'
import NavItem from '../../Components/NavItem'
import DinArchor from '../../Components/DinAnchor'
export default {
    components: {
        AreteHeader,
        NavItem,
        DinArchor 
    },
}
</script>