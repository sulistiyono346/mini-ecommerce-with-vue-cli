<template>
<div class="dscategory">
  <dsnavbar :user_login='user_login' @logout="logout($event)"></dsnavbar>
    <div id="main-admin">
        <div class="row">
         <dssitebar></dssitebar>
        <div class="col-md-10">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Category</h1>
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
    <div class="row">
        <div class="col-lg-6">
            <div class="card bg-light mb-3">
                <div class="card-header"><a @click="change_page('add_category')"> Add Category</a></div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr class="text-center" >
                                <th scope="col">No</th>
                                <th scope="col">Title</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category,index) in this.categories" :key="index" class="text-center">
                                <th scope="row">{{index+1}}</th>
                                <td>{{category.name}}</td>
                                <th scope="col"><button type="button" class="btn btn-primary btn-sm text-center" @click="show_data_update(category)">edit</button>|<button @click="delete_category(category._id)" type="button" class="btn btn-danger btn-sm">delete</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card mb-3">
                <div class="card-header" v-show="this.category_page== 'add_category'">
                    Add Category
                </div>
                <div class="card-header" v-show="this.category_page== 'update_category'">
                    Update Category
                </div>
                <div class="card-body" v-show="this.category_page== 'add_category'">
                    <form v-on:submit.prevent="add_category()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input v-model="category_name" type="text" class="form-control" placeholder="title">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="card-body" v-show="this.category_page== 'update_category'">
                    <form v-on:submit.prevent="update_category()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input v-model="category_name" type="text" class="form-control" placeholder="title">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
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
export default {
  name: 'dashboard_category',
  components: {
    dsnavbar,
    dssitebar
  },
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      categories: [],
      id_category: '',
      category_name: '',
      category_page: 'add_category'
    }
  },
  props: ['user_login'],
  methods: {
    logout () {
      this.$emit('logout')
    },
    change_page (params) {
      this.category_page = params
    },
    show_data_update (category) {
      this.category_name = category.name
      this.id_category = category._id
      this.category_page = 'update_category'
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
    },
    add_category () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: '/categories',
        headers: {
          token: accessToken
        },
        data: {
          name: this.category_name
        }
      })
        .then(({ data }) => {
          this.get_category()
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
    update_category () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/categories/${this.id_category}`,
        headers: {
          token: accessToken
        },
        data: {
          name: this.category_name
        }
      })
        .then(({ data }) => {
          this.get_category()
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
    delete_category (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `/categories/${id}`,
        data: this.user,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.get_category()
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
    }
  },
  created () {
    this.get_category()
  }

}
</script>
