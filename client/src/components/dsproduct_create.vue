<template>
  <div class="card mb-3">
    <div>
         <div v-if="this.success_status==true" class="alert alert-success" role="alert">
            {{success_message}}
         </div>
         <div v-if="this.failed_status==true" class="alert alert-danger" role="alert">
            {{failed_message}}
         </div>
    </div>
        <div class="card-header">
        <p><a @click="$emit('change_page','list_product')">back</a>/<i>Add Form Product</i></p>
        </div>
        <div class="card-body">
            <form v-on:submit.prevent="add_product">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="Inputtitle">Title</label>
                            <input  v-model="product.title" type="text" class="form-control" placeholder="title">
                        </div>
                        <div class="form-group">
                            <label for="InputPrice">Price</label>
                            <input v-model="product.price" type="text" class="form-control" placeholder="2000000">
                        </div>
                        <div class="form-group">
                            <label for="InputStock">Stock</label>
                            <input v-model="product.stock" type="text" class="form-control" placeholder="20">
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" v-model="product.category">
                                <option disabled value="">Please select one</option>
                                <option v-for="category in this.categories" :key="category.id" :value="category._id">{{category.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="FormControlFile1">Images</label>
                            <input  @change="get_image" type="file" class="form-control-file" id="FormControlFile1">
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="form-group">
                             <label for="exampleFormControlTextarea1">Description</label>
                            <wysiwyg v-model="product.description" id="editor" class="form-control" style="height:360px"></wysiwyg>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from '@/api/api.js'

export default {
  name: 'dashboard_product_create',
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      product: {
        id: '',
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        img: ''
      }
    }
  },
  props: ['categories'],
  methods: {
    get_image (event) {
      this.product.img = event.target.files[0]
    },
    add_product () {
      let accessToken = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('img', this.product.img)
      formData.append('title', this.product.title)
      formData.append('price', this.product.price)
      formData.append('stock', this.product.stock)
      formData.append('description', this.product.description)
      formData.append('category', this.product.category)
      axios({
        method: 'POST',
        url: '/items',
        headers: {
          token: accessToken
        },
        data: formData
      })
        .then(({ data }) => {
          this.$emit('get_product')
          this.success_status = true
          this.success_message = data.message
          this.product.title = ''
          this.product.price = ''
          this.product.stock = ''
          this.product.description = ''
          this.product.category = ''
          this.product.img = ''
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
    }
  }
}
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
