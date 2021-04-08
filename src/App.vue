<template>
  <div id="app">
    <Marketplace/>
    <button v-on:click="details">Get details</button>
    <h3>Instance owner: {{ instanceOwner }}</h3>
    <h3>Description: {{ description }}</h3>
    <h3>Asking price: {{ askingPrice }}</h3>
    <h3>Instance buyer: {{ instanceBuyer }}</h3>
    <h3>Offer price: {{ offerPrice }}</h3>
  </div>
</template>

<script>
import Marketplace from "./components/Marketplace";
const core = require('./core/core')

export default {
  name: 'App',
  components: {
    Marketplace
  },
  data() {
    return {
      instanceOwner: '',
      description: '',
      askingPrice: '',

      instanceBuyer: '',
      offerPrice: ''
    }
  },
  methods: {
    async details() {
      this.instanceOwner = (await this.$root.core.getInstanceOwner()).instanceOwner
      this.description = (await this.$root.core.getDescription()).description
      this.askingPrice = (await this.$root.core.getAskingPrice()).askingPrice
      this.instanceBuyer = (await this.$root.core.getInstanceBuyer()).instanceBuyer
      this.offerPrice = (await this.$root.core.getOfferPrice()).offerPrice
    }
  },
  mounted() {
    window.ethereum.request({ method: 'eth_requestAccounts' })
    this.$root.core = core.default
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
