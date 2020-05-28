<template>
  <div>
    <ProductForm
      :class="{ hide: !showProductForm }"
      @toggleProductForm="toggleProductForm" />
    <div class="container">
      <div class="left-panel">
        <h3 class="panel-title">
          Categories
        </h3>
        <div class="cat-list">
          <a
            v-for="cat in categoryList"
            :key="cat"
            :class="{ active: cat === activeCat }"
            class="cat"
            href="#"
            @click.prevent="setActiveCat(cat)">
            {{ cat }}
          </a>
        </div>
      </div>
      <div class="right-panel">
        <div class="clearfix">
          <h3 class="panel-title">
            Product Listing
          </h3>
          <Btn
            text="Add New Product"
            class="new-product"
            @onclick="toggleProductForm" />
        </div>
        <div class="product-list">
          <ProductItem
            v-for="item in productList[activeCat]"
            :key="item.productId"
            :pid="item.productId"
            :name="item.name"
            :price="item.price"
            :stock="item.stock"
            :cat="item.category" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import urls from '~/configs/urls';
import ProductItem from '~/components/ProductItem';
import ProductForm from '~/components/ProductForm';
import Btn from '~/components/Btn';

export default {
  components: { ProductItem, ProductForm, Btn },
  data: () => ({
    activeCat: null,
    showProductForm: false
  }),
  computed: {
    ...mapState(['productList']),
    ...mapGetters(['categoryList'])
  },
  created() {
    this.$axios.$get(urls.GET_PRODUCTS)
      .then((data) => {
        this.setProductList(data.products);
        this.setActiveCat(this.categoryList[0] || null);
      })
      .catch(err => console.log(err.message));
  },
  methods: {
    ...mapMutations(['setProductList']),
    setActiveCat(cat) {
      this.activeCat = cat;
    },
    setCatList(catList) {
      this.catList = catList;
    },
    toggleProductForm() {
      this.showProductForm = !this.showProductForm;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/products'
</style>
