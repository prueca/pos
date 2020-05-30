<template>
  <div id="nav">
    <div class="container clearfix">
      <div class="link-grp">
        <nuxt-link to="/" class="link" :class="{ active: $route.path === '/' }">
          Products
        </nuxt-link>
        <nuxt-link to="/orders" class="link" :class="{ active: $route.path === '/orders' }">
          Orders
        </nuxt-link>
        <nuxt-link to="/cart" class="link" :class="{ active: $route.path === '/cart' }">
          Cart
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav'
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/nav'
</style>
