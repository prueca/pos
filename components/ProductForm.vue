<template>
  <div id="product-form">
    <div class="content-wrapper">
      <form>
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
          <div class="inline-inputs">
            <TextInput
              class="item-name"
              icon="fas fa-fw fa-file-signature"
              placeholder="Enter product name" />
            <TextInput
              class="item-price"
              icon="fas fa-fw fa-barcode"
              placeholder="Enter price" />
          </div>
          <Dropdown
            v-model="form.category"
            :options="catList"
            icon="fas fa-fw fa-tag"
            default-opt="Select category"
            @onchange="setCategory" />
          <TextInput
            v-if="showCatTxtInput"
            icon="fas fa-fw fa-tag"
            placeholder="Enter category" />
          <FileInput
            icon="fas fa-fw fa-image" />
        </div>
        <div class="footer clearfix">
          <BtnLink
            text="Submit" />
          <BtnLink
            text="Close"
            @onclick="$emit('toggleProductForm')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TextInput from '~/components/TextInput';
import Dropdown from '~/components/Dropdown';
import FileInput from '~/components/FileInput';
import BtnLink from '~/components/BtnLink';

export default {
  name: 'ProductForm',
  components: { TextInput, Dropdown, FileInput, BtnLink },
  data: () => ({
    showCatTxtInput: false,
    form: {
      name: null,
      price: null,
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
    setCategory(cat) {
      if (cat === 'New category') {
        this.form.category = null;
        this.showCatTxtInput = true;
        return;
      }

      this.form.category = cat;
      this.showCatTxtInput = false;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/productForm'
</style>