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
            <div class="input-wrapper partial-70">
              <span class="icon fas fa-fw fa-file-signature" />
              <input type="text" placeholder="Enter product name">
            </div>
            <div class="input-wrapper partial-30">
              <span class="icon fas fa-fw fa-barcode" />
              <input type="text" placeholder="Enter price">
            </div>
          </div>
          <div class="input-wrapper">
            <span class="icon fas fa-fw fa-tag" />
            <select>
              <option selected disabled>
                Select category
              </option>
              <option>
                Enter new category
              </option>
            </select>
          </div>
          <div
            class="input-wrapper"
            :class="{ hide: !showCatInput }">
            <span class="icon fas fa-fw fa-tag" />
            <input type="text" placeholder="Enter category">
          </div>
          <div class="input-wrapper">
            <span class="icon fas fa-fw fa-image" />
            <input type="text" placeholder="Default image selected" disabled>
            <button class="browse" type="button">
              <span>Browse</span>
              <input class="opaque" type="file">
            </button>
          </div>
        </div>
        <div class="footer">
          <div class="btn-grp clearfix">
            <button class="btn" type="submit">
              Submit
            </button>
            <button
              class="btn"
              type="button"
              @click.prevent="$emit('toggleProductForm')">
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  data: () => ({
    showCatInput: false
  }),
  methods: {
    toggleCatInput() {
      this.showCatInput = !this.showCatInput;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/productForm'
</style>
