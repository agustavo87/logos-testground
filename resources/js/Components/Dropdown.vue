<template>
  <div class="relative">
    <!-- Button Item -->
    <button
      @click="isOpen = !isOpen"
      class="flex justify-between dropdown focus:outline-none"
      :class="buttonClass"
      :title="dTitle"
    >
      <div v-bind="$attrs">
        <slot name="caption" />
      </div>
      <div class="py-1 ml-1 dropdown-item opacity-50">
        <svg
          class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </button>

    <!-- Overlay transparent-->
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full cursor-default"
    ></button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="relative sm:absolute flex-col mt-2 py-2 bg-gray-800 sm:bg-white rounded-lg sm:shadow-xl"
      :class="dropdownClass"
    >
     <!-- class="" -->

      <slot />

    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    captionClass: String, 
    dropdownClass: String,
    dTitle: String,
    open: Boolean
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
  computed: {
    buttonClass() {
      return this.captionClass + " " + (this.isOpen ? "opacity-100" : "");
    },
  },
  created() {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);

    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },
  watch: {
    open: {
      handler: function (val) {
        this.isOpen = val;
      },
      inmediate:true
    }
  }
};
</script>