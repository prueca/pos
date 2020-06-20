<template>
  <div class="item">
    <div class="row clearfix name">
      <nuxt-link :to="`/products/${pid}`">
        {{ name }}
      </nuxt-link>
    </div>
    <div class="row clearfix">
      <div class="float-right">
        {{ inCart }} / {{ stock }}
      </div>
      <div class="float-left">
        P{{ Number(price).toFixed(2) }}
      </div>
    </div>
    <div class="row clearfix">
      <TextInput
        v-model="qty"
        text-align="right"
        class="qty float-right"
        @onchange="qtyChange" />
      <Btn
        text="Add To Cart"
        class="float-left add-to-cart"
        :loading="loading.addToCart"
        @onclick="addToCart" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Btn from '~/components/Btn';
import TextInput from '~/components/TextInput';
import urls from '~/configs/urls';

export default {
  name: 'ProductItem',
  components: { Btn, TextInput },
  props: ['pid', 'name', 'price', 'stock', 'cat', 'inCart'],
  data: () => ({
    qty: 1,
    loading: {
      addToCart: false,
      checkout: false
    }
  }),
  methods: {
    ...mapMutations([
      'updateStock',
      'updateInCart'
    ]),
    qtyChange(evt) {
      this.qty = /^\d+$/.test(evt.target.value) && Number(evt.target.value) > 0
        ? evt.target.value : 1;
    },
    addToCart() {
      const oid = this.$cookies.get('oid');
      const data = {
        oid: oid || null,
        pid: this.pid,
        qty: Number(this.qty)
      };

      this.loading.addToCart = true;
      this.$axios.$post(urls.ADD_TO_CART, data)
        .then((res) => {
          this.loading.addToCart = false;

          if (res.inCart) {
            this.updateInCart({
              cat: this.cat,
              pid: this.pid,
              inCart: res.inCart
            });
          }

          if (res.stock) {
            this.updateStock({
              cat: this.cat,
              pid: this.pid,
              stock: res.stock
            });
          }

          if (res.error || res.message) {
            alert(res.error || res.message);
          }
        })
        .catch((err) => {
          this.loading.addToCart = false;
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
