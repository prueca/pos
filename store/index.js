export const state = () => ({
  get activeCat() {
    return this.catList[0] || null;
  },
  catList: [
    'Bread',
    'Candies',
    'Cakes',
    'Cookies',
    'Drinks',
    'Ice Cream',
    'Processed Meat',
    'Others'
  ],
  productList: [
    {
      id: 0,
      name: 'Pandesal',
      price: 2.00,
      stock: 60,
      img: 'https://via.placeholder.com/321x200'
    }
  ]
});

export const mutations = {
  setActiveCat(state, cat) {
    state.activeCat = cat;
  }
};
