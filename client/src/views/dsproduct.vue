<template>
<div class="dsproduct">
    <dsnavbar :user_login='user_login' @logout="logout($event)"></dsnavbar>
    <div id="main-admin">
        <div class="row">
         <dssitebar></dssitebar>
    <div class="col-md-10">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Product</h1>
            <div>
                <div v-if="this.success_status==true" class="alert alert-success" role="alert">
                 {{success_message}}
                </div>
                <div v-if="this.failed_status==true" class="alert alert-danger" role="alert">
                 {{failed_message}}
                </div>
            </div>
            <hr>
        </div>
    </div>
    <div class="row" v-show="product_page=='list_product'">
        <div class="col-lg-12">
            <div class="card bg-light mb-3">
                <div class="card-header"><a data-toggle="modal"  @click="change_page('create_product')">add product</a></div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Stock</th>
                                <th scope="col">images</th>
                                <th class="text-center" scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product,index) in this.products" :key="index">
                                <th scope="row">{{index+1}}</th>
                                <td>{{product.title}}</td>
                                <th scope="col">{{product.category.name}}</th>
                                <th scope="col">{{product.stock}}</th>
                                <th><img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width:40px; height: 35px;" :src="product.img" data-holder-rendered="true">
                                </th>
                                <th class="text-center" scope="col">
                                <button type="button" class="btn btn-primary btn-sm text-center" @click="show_data_update(product)">edit</button>|
                                <button type="button" class="btn btn-danger btn-sm" @click="delete_product(product._id)">delete</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <formcreate v-if="product_page=='create_product'" @change_page='change_page($event)' :categories='categories' @get_product='get_product'></formcreate>
    <formupdate v-if="product_page=='update_product'" @change_page='change_page($event)' :categories='categories' :product_update='product' @get_product='get_product'></formupdate>
    </div>
    </div>
    </div>
    <div class="" style="padding-top:4em"></div>
    </div>
</template>
<script>
import axios from '@/api/api.js'
import dsnavbar from '@/components/dsnavbar.vue'
import dssitebar from '@/components/dssitebar.vue'
import formupdate from '@/components/dsproduct_update.vue'
import formcreate from '@/components/dsproduct_create.vue'

export default {
  name: 'dashboard_product',
  components: {
    dsnavbar,
    dssitebar,
    formupdate,
    formcreate
  },
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      products: [],
      product_page: 'list_product',
      product: {
        id: '',
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        img: ''
      },
      categories: [{
        __v: '',
        _id: '',
        name: ''
      }]
    }
  },
  props: ['user_login'],
  methods: {
    logout () {
      this.$emit('logout')
    },
    change_page (params) {
      this.product_page = params
    },
    show_data_update (product) {
      this.product = product
      this.product_page = 'update_product'
    },
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
    },
    delete_product (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `/items/${id}`,
        data: this.user,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.get_product()
          this.success_status = true
          this.success_message = data.message
          setTimeout(() => {
            this.success_status = false
          }, 3000)
        }).catch(({ response }) => {
          this.failed_status = true
          this.failed_message = response.data.message
          setTimeout(() => {
            this.failed_status = false
          }, 3000)
        })
    },
    get_category () {
      axios({
        method: 'GET',
        url: '/categories',
        data: this.user
      })
        .then(({ data }) => {
          this.categories = data
        }).catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  created () {
    this.get_category()
    this.get_product()
  }

}
</script>
