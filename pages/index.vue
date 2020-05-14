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
        <div class="item">
          <img src="https://via.placeholder.com/321x200">
          <div class="rows">
            <div class="row clearfix">
              <div class="name">
                Pandesal
              </div>
              <div class="price">
                P2.00
              </div>
            </div>
            <div class="row clearfix">
              <div class="stock">
                In stock: 60
              </div>
            </div>
            <div class="row btn-grp">
              <a href="#" class="btn">Edit</a>
              <a href="#" class="btn">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['activeCat', 'catList'])
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/products'
</style>
