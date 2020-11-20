<template>
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <!-- Background overlay, show/hide based on modal state.   -->
    <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        v-on:after-leave="fulfill"
    >
      <div v-if="dShow" class="fixed inset-0 transition-opacity" @click="cancel">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <!-- Modal panel, show/hide based on modal state. -->
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="dShow" class="inline-block align-bottom  min-w-3/4 sm:min-w-0  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <slot></slot>
      </div>
    </transition>
    
  </div>
</div>
</template>

<script>
export default {
  props: ['intention', 'show'],
  watch: {
    'intention': function (intent) {
      this.lastIntention = intent
    },
    'show': function (val) {
      this.dShow = val;
    }
  },
  data() {
      return {
          lastIntention: 'cancel',
          dShow: false, 
      }
  },

  created() {
    const handleEscape = (e) => {
      if(e.key === 'Esc' || e.key === "Escape") {
        this.cancel();
      }
    }

    document.addEventListener('keydown', handleEscape)

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape)
    })

  },

  methods: {
      cancel () {
          this.lastIntention = 'cancel';
          this.dShow = false;
      },
      fulfill() {
        this.$emit(this.lastIntention)
      }
  }
}
</script>