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
  }
};
