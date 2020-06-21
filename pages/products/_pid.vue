<template>
  <div class="container">
    <h1>
      {{ name }}
    </h1>
    <div class="clearfix">
      <div class="details">
        <h3>Product Details</h3>
        <div class="row clearfix">
          <div class="float-left label">
            Price
          </div>
          <div class="float-left">
            P{{ price.toFixed(2) }}
          </div>
        </div>
        <div class="row clearfix">
          <div class="float-left label">
            Stock
          </div>
          <div class="float-left">
            {{ stock }}
          </div>
        </div>
        <div class="row clearfix">
          <div class="float-left label">
            Category
          </div>
          <div class="float-left">
            {{ category }}
          </div>
        </div>
        <Btn class="remove-btn" text="Remove Item" />
      </div>
      <div class="update-form">
        <h3>
          Update Details
        </h3>
        <form>
          <TextInput
            v-model="name"
            icon="fas fa-fw fa-file-signature" />
          <div class="inline-inputs">
            <TextInput
              v-model="price"
              icon="fas fa-fw fa-barcode" />
            <TextInput
              v-model="stock"
              icon="fas fa-fw fa-layer-group" />
          </div>
          <Dropdown
            v-model="category"
            :options="catList"
            icon="fas fa-fw fa-tag"
            default-opt="Select category"
            @onchange="setCategory" />
          <TextInput
            v-if="showCatTxtInput"
            v-model="category"
            class="new-cat"
            icon="fas fa-fw fa-tag"
            placeholder="Enter category" />
          <Btn text="Update Item" />
        </form>
      </div>
      <div class="compute-sales">
        <h3>
          Compute Sales
        </h3>
        <div>
          <div class="row clearfix">
            <TextInput class="date-input float-left" type="date" icon="far fa-calendar" />
            <TextInput class="date-input float-right" type="date" icon="far fa-calendar" />
          </div>
          <div class="row computed-sales">
            <div class="label">
              Total Sales
            </div>
            <div class="amount">
              P200.00
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TextInput from '~/components/TextInput';
import Dropdown from '~/components/Dropdown';
import Btn from '~/components/Btn';
// import urls from '~/configs/urls';

export default {
  /* async asyncData({ params, $axios }) {
    const product = await $axios.get(`${urls.GET_PRODUCTS}/${params.pid}`);
    return product;
  } */
  components: { TextInput, Dropdown, Btn },
  data() {
    return {
      name: 'Pandesal',
      category: 'Bread',
      price: 2,
      stock: 100,
      orders: 100,
      totalSales: 200
    };
  },
  computed: {
    ...mapState(['productList']),
    catList() {
      const list = Object.keys(this.productList);
      list.push('New category');
      return list.map(cat => ({ text: cat, value: cat }));
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productDetails'
</style>
