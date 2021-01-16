<header
  class="bg-gray-900 sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center"
>
<div
  class="flex justify-between items-center px-4 py-3 sm:p-0"
>
  <!-- Logo -->
  <img class="h-8" src="static/images/logo-cuadrado.png" alt="Martón Dj">
  
  <!-- xs Menú Button -->
  <div class="sm:hidden">
    <button data-toggle="menu-button" class="block h-6 w-6 text-white opacity-75 hover:opacity-100 focus:opacity-100 focus:outline-none">
      <svg data-toggled="menu-button" class="h-6 w-6 fill-current" x-description="Heroicon name: menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg data-toggled="menu-button" class="hidden h-6 w-6 fill-current" x-description="Heroicon name: x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button> 
  </div>

</div>
<nav>
  Botoness
</nav>

</header>

{{-- @push('foot-script')
    <script>
        let myToggler = document.querySelector('button[data-toggler]')
        
        myToggler.addEventListener('click', function (event) {
          let toggles = document.querySelectorAll('[data-toggled=' + myToggler.dataset.toggler +']')
          console.log(myToggler.dataset.toggler);
          console.log(toggles);
          toggles.forEach(node => node.classList.toggle('hidden'));
        })
    </script>
@endpush --}}