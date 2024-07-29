<script>
import { mapMutations } from 'vuex';
export default {
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    ...mapMutations({
      increment: 'INCREMENT' // map `this.increment()` to `this.$store.commit('increment')`
    })
  }
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <h1 class="text-3xl font-bold underline">Counter!</h1>
  </div>
  <button
    class="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded"
    @click.prevent="increment"
  >
    {{ `Increment Counter - ${count}` }}
  </button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
