import Vue from 'vue';

export const state = () => ({
  productList: {}
});

export const getters = {
  categoryList: state => Object.keys(state.productList)
};

export const mutations = {
  setProductList(state, products) {
    state.productList = products;
  },
  addProduct(state, product) {
    const cat = product.category;

    if (state.productList[cat]) {
      state.productList[cat].push(product);
      return;
    }

    Vue.set(state.productList, cat, [product]);
  },
  updateStock(state, { cat, pid, stock }) {
    state.productList[cat] = state.productList[cat].map((item) => {
      if (item.productId === pid) {
        item.stock = stock;
      }

      return item;
    });
  },
  updateInCart(state, { cat, pid, inCart }) {
    state.productList[cat] = state.productList[cat].map((item) => {
      if (item.productId === pid) {
        item.inCart = inCart;
      }

      return item;
    });
  }
};
