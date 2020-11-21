<template>
<header class="bg-gray-900 sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center">
  <div class="flex justify-between items-center px-4 py-3 sm:p-0">
    <div>
      <img class="h-8" src="../../img/logo-cuadrado.png" alt="Martón Dj">
    </div>
    <div class="sm:hidden">
      <button @click="isOpen = !isOpen"  class="block h-6 w-6 text-gray-500 hover:text-white focus:text-white focus:outline-none">
        <svg v-if="!isOpen" class="h-6 w-6 fill-current" fill-rule="evenodd"  viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>70 Basic icons by Xicons.co</title><path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" /><path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z"/><path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z"/></svg>
        <svg v-if="isOpen" class="h-4 w-4 mx-auto fill-current" fill-rule="evenodd" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 460.775 460.775"  xml:space="preserve">
          <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
            c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
            c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
            c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
            l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
            c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
          </svg>
      </button> 
    </div>
    </div>
    <nav :class="isOpen ? 'block' : 'hidden'" class="sm:block">
      <div  class=" text-sm px-2 pt-2 pb-4 sm:flex sm:p-0">
        <a href="#" class="block px-2 py-1 text-white font-semibold rounded  hover:bg-gray-800">List your property</a>
        <a href="#" class="block px-2 mt-1 sm:mt-0 sm:ml-2 py-1 text-white font-semibold rounded  hover:bg-gray-800">Trips</a>
        <a href="#" class="block px-2 mt-1 sm:mt-0 sm:ml-2 py-1 text-white font-semibold rounded  hover:bg-gray-800">Messages</a>
        <account-dropdown class="hidden sm:block sm:ml-6"></account-dropdown>
      </div>
      
      <div class="px-4 py-5 border-t border-gray-800 sm:hidden">
          <div class="flex items-center">
            <img src="../../img/panther-profile.png" alt="Gustavo" class="h-8 w-8 rounded-full border-2 border-gray-600  object-cover">
            <span class="ml-3 text-white font-semibold">Jane Doe</span>
          </div>
          <div class="mt-4">
            <a href="#" class="text-gray-400 block hover:text-white">Inglés</a>
            <a href="#" class="mt-2 text-gray-400 block hover:text-white">Español</a>
            <a href="#" class="mt-2 text-gray-400 block hover:text-white">Italiano</a>
          </div>
      </div>

    </nav>


</header>
</template>

<script>
import AccountDropdown from './AccountDropdown'
  export default {
    components: {
      AccountDropdown
    },
    data() {
      return {
        isOpen: true
      }
    }
  }

</script>