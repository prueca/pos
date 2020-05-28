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
        min="0"
        @change="qtyChange">
      <div class="float-left">
        In cart: {{ inCart }}
      </div>
    </div>
    <div class="row btn-grp">
      <Btn text="Place Order" />
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
      addToCart: false
    }
  }),
  methods: {
    ...mapMutations([
      'updateStock',
      'updateInCart'
    ]),
    qtyChange(evt) {
      this.qty = Number(evt.target.value) > -1 ? evt.target.value : 1;
    },
    addToCart() {
      const oid = this.$cookies.get('oid');
      const data = {
        oid: oid || null,
        pid: this.pid,
        qty: Number(this.qty)
      };

      this.loading.buy = true;
      this.$axios.$post(urls.ADD_TO_CART, data)
        .then((res) => {
          this.loading.buy = false;

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
          this.loading.buy = false;
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
