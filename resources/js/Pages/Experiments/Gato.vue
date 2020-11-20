<template>
<div class="bg-gray-300 absolute top-0 bottom-0 left-0 right-0 h-full w-full">
  
  <div class="bg-gray-100 flex">
    <div class="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
      <div class=" xl:max-w-lg xl:ml-auto">
        <img class="h-24" src="../../../img/logo-gato.png" alt="Gatos Malatos">
        <img class="mt-6 sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center rounded-lg shadow-xl lg:hidden" src="../../../img/gato2.jpg" alt="Gato mirando fijo">
        <h1 class="mt-6 text-2xl sm:text-4xl sm:mt-8 font-bold text-gray-900 leading-tight lg:text-3xl xl:text-4xl">
          Nunca permitas que nadie...
          <br class="hidden lg:inline"><span class=" text-orange-600">te diga cuantos gatos podés tener.</span>
        </h1>
        <p class="mt-2 text-gray-700 sm:mt-4 sm:text-xl">
          Gatos Malatos te ayuda a encontrar gatos en adopción que estan cuidados y 
          adaptados a la vida en el hogar y son amigables con las personas.
        </p>
        <div class="mt-4 sm:mt-6">
          <a href="#" class="btn btn-orange shadow-lg  sm:text-base">Encontrá tu gato</a>
          <a href="#" class="btn btn-gray sm:text-base">Enterate de más.</a>
        </div>
      </div>
    </div>
    <div class="hidden lg:block lg:w-1/2 lg:relative">
      <img class="absolute inset-0 h-full w-full object-cover object-center" src="../../../img/gato2.jpg" alt="Gato mirando fijo">
    </div>
  </div>
</div>

</template>

<script>

  export default {
    props: ['request'],
    components: {},
    metaInfo() {
        title: 'Experimento: Gato!!'
    }
  }
</script>