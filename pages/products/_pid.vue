<template>
  <div class="container">
    {{ $route.params.pid }}
  </div>
</template>

<script>
// import urls from '~/configs/urls';
export default {
  /* async asyncData({ params, $axios }) {
    const product = await $axios.get(`${urls.GET_PRODUCTS}/${params.pid}`);
    return product;
  } */
};
</script>
