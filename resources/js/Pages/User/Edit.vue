<template>
  <arete-container>
    <arete-header-1>Editar Perfil:</arete-header-1>
    <form
      @submit.prevent="submit"
      class="mx-auto max-w-sm rounded-lg p-4 flex flex-col justify-start shadow-lg"
    >
      <arete-label for="name">Nombre:</arete-label>
      <arete-text-input
        id="name"
        type="text"
        v-model="form.name"
        placeholder="Juan Perez"
        required
      />
      <arete-input-error :errors="errors.name"></arete-input-error>
      <arete-label for="country">País:</arete-label>
      <arete-select
        id="country"
        v-model="form.country"
        required
        placeholder="selecciona un país..."
      >
        <option
          v-for="countryCode in Object.keys(countries)"
          :key="countryCode"
          :value="countryCode"
        >
          {{ countries[countryCode].name }}
        </option>
      </arete-select>
      <arete-input-error :errors="errors.country"></arete-input-error>
      <arete-processing :a-if="operando">Procesando...</arete-processing>
      <div class="flex justify-end">
        <arete-button type="submit" class="m-2">Enviar</arete-button>
        <arete-button type="reset" class="m-2">Borrar</arete-button>
      </div>
    </form>
  </arete-container>
</template>

<script>
import Layout from "../../Layouts/Layout";
import AreteButton from "../../Components/Button";
import AreteTextInput from "../../Components/TextInput";
import AreteLabel from "../../Components/Label";
import AreteHeader1 from "../../Components/Header1";
import AreteContainer from "../../Components/Container";
import AreteSelect from "../../Components/Select";
import AreteInputError from "../../Components/InputError";
import AreteProcessing from "../../Components/Processing";

export default {
  metaInfo() {
    return {
      title: "Registrarse",
    };
  },
  layout: (h, page) => h(Layout, [page]),
  components: {
    AreteButton,
    AreteTextInput,
    AreteLabel,
    AreteSelect,
    AreteHeader1,
    AreteContainer,
    AreteInputError,
    AreteProcessing
  },
  props: ["countries", "user", "errors"],
  data() {
    return {
      form: {
        name: this.user.name,
        country: this.user.country,
      },
      operando: false,
    };
  },
  computed: {
    countryLang() {
      return this.form.country
        ? this.countries[this.form.country].language
        : this.defLang;
    },
      fullForm() {
        let newForm = {
          language: this.countryLang
        }
        return Object.assign(newForm, this.form)
      }
  },
  methods: {
    submit() {
      console.log("enviando...");
      this.$inertia.put(route("user.update", this.user.id), this.fullForm, {
        replace: true,
        preseveState: true,
        onStart: (visit) => {
          console.log('iniciando... ', visit)  
          this.operando = true;      
          },
        onFinish: () => {
          console.log('visita concluida.')
          this.operando = false;
        }
      });
    },
  },
};
</script>