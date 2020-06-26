<template>
  <div class="container">
    <h1>
      {{ details.name }}
    </h1>
    <div class="clearfix">
      <div class="details">
        <h3>Product Details</h3>
        <div class="row clearfix">
          <div class="float-left label">
            Price
          </div>
          <div class="float-left">
            P{{ details.price }}
          </div>
        </div>
        <div class="row clearfix">
          <div class="float-left label">
            Stock
          </div>
          <div class="float-left">
            {{ details.stock }}
          </div>
        </div>
        <div class="row clearfix">
          <div class="float-left label">
            Category
          </div>
          <div class="float-left">
            {{ details.category }}
          </div>
        </div>
        <Btn
          class="remove-btn"
          text="Remove Item"
          :loading="removingItem"
          @onclick="removeItem" />
      </div>
      <div class="update-form">
        <h3>
          Update Details
        </h3>
        <form @submit.prevent="updateProduct">
          <TextInput
            v-model="updates.name"
            icon="fas fa-fw fa-file-signature" />
          <div class="inline-inputs">
            <TextInput
              v-model="updates.price"
              icon="fas fa-fw fa-barcode"
              @onblur="formatPrice" />
            <TextInput
              v-model="updates.stock"
              icon="fas fa-fw fa-layer-group" />
          </div>
          <Dropdown
            v-model="updates.category"
            :options="categories"
            icon="fas fa-fw fa-tag"
            default-opt="Select category"
            @onchange="setCategory" />
          <TextInput
            v-if="showCatTxtInput"
            v-model="updates.category"
            class="new-cat"
            icon="fas fa-fw fa-tag"
            placeholder="Enter category" />
          <Btn id="update-btn" text="Update Item" type="submit" :loading="updatingProduct" />
        </form>
      </div>
      <div class="compute-sales">
        <h3>
          Compute Sales
        </h3>
        <div>
          <div class="row clearfix">
            <TextInput
              v-model="dateFrom"
              class="date-input float-left"
              type="date"
              icon="far fa-calendar"
              @onchange="getSales" />
            <TextInput
              v-model="dateTo"
              class="date-input float-right"
              type="date"
              icon="far fa-calendar"
              @onchange="getSales" />
          </div>
          <div class="row computed-sales">
            <div class="label">
              Total Sales
            </div>
            <div class="amount">
              {{ totalSales }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/TextInput';
import Dropdown from '~/components/Dropdown';
import Btn from '~/components/Btn';
import urls from '~/configs/urls';
import { errHandler } from '~/helper';

export default {
  components: { TextInput, Dropdown, Btn },
  async asyncData({ params, $axios }) {
    const { products } = await $axios.$get(`${urls.GET_PRODUCTS}/${params.pid}`);
    const cat = Object.keys(products).pop();
    const details = products[cat].pop();
    let { categories } = await $axios.$get(urls.GET_CATEGORIES);

    if (categories) {
      categories.push('New category');
      categories = categories.map(cat => ({ text: cat, value: cat }));
    }

    return {
      details: {
        ...details,
        pid: details.productId,
        price: details.price.toFixed(2),
        stock: String(details.stock),
        productId: undefined
      },
      updates: {
        ...details,
        pid: details.productId,
        price: details.price.toFixed(2),
        stock: String(details.stock),
        productId: undefined
      },
      categories
    };
  },
  data() {
    return {
      details: {
        pid: this.$route.params.pid,
        name: '---',
        category: '---',
        price: '---',
        stock: '---'
      },
      updates: {
        pid: this.$route.params.pid,
        name: null,
        category: null,
        price: null,
        stock: null
      },
      categories: null,
      showCatTxtInput: false,
      updatingProduct: false,
      removingItem: false,
      totalSales: '----.--',
      dateFrom: '',
      dateTo: ''
    };
  },
  created() {
    this.getSales();
  },
  methods: {
    setCategory(cat) {
      if (cat === 'New category') {
        this.updates.category = null;
        this.showCatTxtInput = true;
        return;
      }

      this.updates.category = cat;
      this.showCatTxtInput = false;
    },
    formatPrice(evt) {
      let value = evt.target.value;

      if (!isNaN(value) && !/^\d+\.\d{2}$/.test(value)) {
        value = Number(value).toFixed(2);
      } else if (isNaN(value)) {
        value = '';
      }

      evt.target.value = value;
    },
    updateProduct() {
      this.updatingProduct = true;
      this.$axios.$post(urls.UPDATE_PRODUCT, this.updates)
        .then((res) => {
          if (res.success) {
            this.details = { ...this.updates };
          }
        })
        .catch(errHandler)
        .finally(() => {
          this.updatingProduct = false;
        });
    },
    getSales() {
      this.totalSales = 'Please wait...';
      this.$axios.$post(urls.GET_SALES, {
        pid: this.details.pid,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      })
        .then(res => (this.totalSales = `P${res.sales}`))
        .catch((err) => {
          this.totalSales = '----.--';
          errHandler(err);
        });
    },
    removeItem() {
      if (confirm('Proceed deleting this item?')) {
        this.removingItem = true;
        this.$axios.$get(`${urls.REMOVE_ITEM}/${this.details.pid}`)
          .then(res => this.$router.push('/'))
          .catch(errHandler)
          .finally(() => (this.removingItem = false));
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productDetails'
</style>
