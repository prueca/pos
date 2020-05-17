<template>
  <div class="item">
    <img :src="image">
    <div class="rows">
      <div class="row clearfix">
        <div class="name">
          {{ name }}
        </div>
        <div class="price">
          P{{ price.toFixed(2) }}
        </div>
      </div>
      <div class="row clearfix">
        <div class="stock">
          In stock: {{ stock }}
        </div>
      </div>
      <div class="row btn-grp">
        <a href="#" class="btn">Edit</a>
        <a href="#" class="btn">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['image', 'name', 'price', 'stock']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
