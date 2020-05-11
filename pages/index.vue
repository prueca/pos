<template>
  <div class="container">
    <div class="left-panel">
      <h3 class="panel-title">
        Categories
      </h3>
      <div class="cat-grp">
        <a class="cat active" href="#">Bread</a>
        <a class="cat" href="#">Candies</a>
        <a class="cat" href="#">Cakes</a>
        <a class="cat" href="#">Cookies</a>
        <a class="cat" href="#">Drinks</a>
        <a class="cat" href="#">Ice Cream</a>
        <a class="cat" href="#">Processed Meat</a>
        <a class="cat" href="#">Others</a>
      </div>
      <form action="#">
        <div class="new-cat input-wrapper">
          <input type="text" placeholder="New category">
          <button type="submit">
            <span class="fas fa-fw fa-plus" />
          </button>
        </div>
      </form>
    </div>
    <div class="right-panel">
      <h3 class="panel-title">
        Product Listing
      </h3>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/products'
</style>
