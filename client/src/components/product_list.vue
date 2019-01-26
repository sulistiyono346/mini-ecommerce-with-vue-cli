<template>
    <section class="product" id="product">
        <div class="container" style="padding-top:300px">
            <div class="row">
                <div class="col-md-12">
                    <h2>
                        Products
                    </h2>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3" v-for="product in this.products" :key="product.id">
                    <div class="card mb-3">
                        <img class="card-img-top"  :src="product.img"
                            alt="Card image cap">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6 class="card-title">{{product.title}}</h6>
                                </div>
                                <div class="col-md-6">
                                    <p class="card-title">Rp. {{product.price}}</p>
                                </div>
                            </div>

                            <p class="card-text"></p>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="card-text">Stock : <span>{{product.stock}}</span></p>
                                </div>
                                <div class="col-md-6">
                                <i class="cui-list" aria-hidden="true" style="margin-right:5px"></i>
                                <a  class="badge badge-pill badge-success" @click="product_detail(product._id)">detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>
    </section>
</template>
<script>
// import axios from '@/api/api.js'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  props: ['products'],
  methods: {
    product_detail (id) {
      this.$router.push('/product/' + id)
    }
  },
  created () {
  }
}
</script>
