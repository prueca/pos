<template>
  <div class="item">
    <div class="row clearfix">
      <div class="name">
        {{ name }}
      </div>
      <div class="float-left">
        In stock: {{ stock }}
      </div>
      <div class="float-right">
        P{{ Number(price).toFixed(2) }}
      </div>
    </div>
    <div class="row clearfix">
      <input
        v-model="qty"
        class="float-right qty"
        type="number"
        min="1"
        @change="qtyChange">
      <div class="float-left">
        In cart: {{ inCart }}
      </div>
    </div>
    <div class="row btn-grp">
      <Btn
        text="Checkout"
        :loading="loading.checkout"
        @onclick="checkout" />
      <Btn
        text="Add To Cart"
        :loading="loading.addToCart"
        @onclick="addToCart" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Btn from '~/components/Btn';
import urls from '~/configs/urls';

export default {
  name: 'ProductItem',
  components: { Btn },
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
      this.qty = Number(evt.target.value) > 0 ? evt.target.value : 1;
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

          if (res.error || res.message) {
            alert(res.error || res.message);
          }

          this.updateInCart({
            cat: this.cat,
            pid: this.pid,
            inCart: res.inCart
          });

          this.updateStock({
            cat: this.cat,
            pid: this.pid,
            stock: res.stock
          });
        })
        .catch((err) => {
          this.loading.addToCart = false;
          alert(err.message);
        });
    },
    checkout() {
      const oid = this.$cookies.get('oid');
      const data = {
        oid: oid || null,
        pid: this.pid,
        qty: Number(this.qty)
      };

      this.loading.checkout = true;
      this.$axios.$post(urls.ADD_TO_CART, data)
        .then((res) => {
          this.loading.checkout = false;

          if (res.error || res.message) {
            alert(res.error || res.message);
          }

          this.updateInCart({
            cat: this.cat,
            pid: this.pid,
            inCart: res.inCart
          });

          this.updateStock({
            cat: this.cat,
            pid: this.pid,
            stock: res.stock
          });

          this.$router.push('/cart');
        })
        .catch((err) => {
          this.loading.checkout = false;
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
