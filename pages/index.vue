<template>
  <div class="container">
    <div class="left-panel">
      <h3 class="panel-title">
        Categories
      </h3>
      <div class="cat-list">
        <a
          v-for="cat in catList"
          :key="cat"
          :class="{ active: cat === activeCat }"
          class="cat"
          href="#">
          {{ cat }}
        </a>
      </div>
      <form action="#">
        <div class="new-cat input-wrapper">
          <input type="text" placeholder="New category">
          <button type="submit">
            <span class="fas fa-fw fa-plus" />
          </button>
        </div>
      </form>
    </div>
    <div class="right-panel">
      <div class="clearfix">
        <h3 class="panel-title">
          Product Listing
        </h3>
        <a href="#" class="new-product btn">
          Add New Product
        </a>
      </div>
      <div class="product-list">
        <ProductItem
          v-for="item in productList"
          :key="item.id"
          :img="item.img"
          :name="item.name"
          :price="item.price"
          :stock="item.stock" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductItem from '~/components/ProductItem';
export default {
  components: { ProductItem },
  computed: mapState(['activeCat', 'catList', 'productList'])
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/products'
</style>
