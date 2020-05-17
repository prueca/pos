export const state = () => ({
  productList: {}
});

export const mutations = {
  setProductList(state, products) {
    state.productList = products;
  }
};
