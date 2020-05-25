<template>
  <div id="product-form">
    <div class="content-wrapper">
      <form @submit.prevent="onSubmit">
        <div class="header clearfix">
          <div class="title">
            Add New Item
          </div>
          <a
            href="#"
            class="close"
            @click.prevent="$emit('toggleProductForm')">
            <span class="fas fa-fw fa-times" />
          </a>
        </div>
        <div class="content">
          <div v-if="errors.length > 0" class="errors">
            <ul v-if="errors.length > 1">
              <li v-for="(err, i) in errors" :key="i">
                {{ err }}
              </li>
            </ul>
            <div v-else-if="errors.length === 1" class="err">
              {{ errors[0] }}
            </div>
          </div>
          <div class="inputs">
            <TextInput
              v-model="form.name"
              class="item-name"
              icon="fas fa-fw fa-file-signature"
              placeholder="Enter product name" />
            <div class="inline-inputs">
              <TextInput
                v-model="form.price"
                class="item-price"
                icon="fas fa-fw fa-barcode"
                placeholder="Enter price"
                @onblur="formatPrice" />
              <TextInput
                v-model="form.stock"
                class="item-stock"
                icon="fas fa-fw fa-layer-group"
                placeholder="Enter stock" />
            </div>
            <Dropdown
              v-model="form.category"
              :options="catList"
              icon="fas fa-fw fa-tag"
              default-opt="Select category"
              @onchange="setCategory" />
            <TextInput
              v-if="showCatTxtInput"
              v-model="form.category"
              class="new-cat"
              icon="fas fa-fw fa-tag"
              placeholder="Enter category" />
          </div>
        </div>
        <div class="footer clearfix">
          <Btn :loading="submitted" text="Submit" type="submit" />
          <Btn text="Close" @onclick="$emit('toggleProductForm')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TextInput from '~/components/TextInput';
import Dropdown from '~/components/Dropdown';
import Btn from '~/components/Btn';
import urls from '~/configs/urls';

export default {
  name: 'ProductForm',
  components: { TextInput, Dropdown, Btn },
  data: () => ({
    showCatTxtInput: false,
    submitted: false,
    errors: [],
    form: {
      name: null,
      price: null,
      stock: null,
      category: null
    }
  }),
  computed: {
    ...mapState(['productList']),
    catList() {
      const list = Object.keys(this.productList);
      list.push('New category');
      return list.map(cat => ({ text: cat, value: cat }));
    }
  },
  methods: {
    ...mapMutations(['addProduct']),
    setCategory(cat) {
      if (cat === 'New category') {
        this.form.category = null;
        this.showCatTxtInput = true;
        return;
      }

      this.form.category = cat;
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
    resetForm() {
      this.submitted = false;
      this.form = {
        name: null,
        price: null,
        stock: null,
        category: null
      };
    },
    hasError() {
      this.errors = [];

      if (!this.form.name || !this.form.price || !this.form.stock || !this.form.category) {
        this.errors.push('Missing input');
      }

      if (isNaN(this.form.price)) {
        this.errors.push('Invalid price');
      }

      if (isNaN(this.form.stock)) {
        this.errors.push('Invalid stock');
      }

      return this.errors.length > 0;
    },
    onSubmit() {
      if (this.hasError()) {
        return;
      }

      this.submitted = true;
      this.$axios.$post(urls.NEW_PRODUCT, this.form)
        .then((res) => {
          this.addProduct(res.product);
          this.$emit('toggleProductForm');
          this.resetForm();
        })
        .catch((err) => {
          this.errors.push(err.response.data.error.message || err.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/productForm'
</style>
