<template>
  <div class="dropdown">
    <span class="icon" :class="icon" />
    <select v-model="val" @change="$emit('onchange', $event.target.value)">
      <option :value="null" selected disabled>
        {{ defaultOpt }}
      </option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: ['value', 'defaultOpt', 'options', 'icon'],
  computed: {
    val: {
      get() { return this.value; },
      set(v) { this.$emit('input', v); }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/dropdown'
</style>
