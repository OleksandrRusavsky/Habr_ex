<template>
  <div>
    <h2>Transaction: {{ txn }}</h2>
    <button v-on:click="acceptOffer">AcceptOffer</button>
    <form v-on:submit.prevent="makeOffer">
      <input v-model="offerPrice">
      <button>Make offer</button>
    </form>
    <button v-on:click="reject">Reject</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offerPrice: 0,
      txn: ''
    }
  },
  methods: {
    async makeOffer() {
      this.txn = (await this.$root.core.makeOffer(this.offerPrice)).transactionHash
    },
    async reject() {
      this.txn = (await this.$root.core.reject()).transactionHash
    },
    async acceptOffer() {
      this.txn = (await this.$root.core.acceptOffer()).transactionHash
    }
  }
}
</script>