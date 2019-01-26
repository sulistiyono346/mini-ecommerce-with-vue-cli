<template>
  <div class="home">
    <advertisement></advertisement>
    <productList :products='products'></productList>
  </div>
</template>
<script>
import axios from '@/api/api.js'
import advertisement from '@/components/advertisement.vue'
import productList from '@/components/product_list.vue'
export default {
  name: 'home',
  components: {
    advertisement,
    productList
  },
  data () {
    return {
      products: ''
    }
  },
  methods: {
    get_product () {
      axios({
        method: 'GET',
        url: '/items'
      })
        .then(({ data }) => {
          this.products = data
        }).catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  created () {
    this.get_product()
  }
}
</script>
