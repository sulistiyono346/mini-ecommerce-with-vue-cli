<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-12 p-0 text-center">
        <h1>
          watch
          <span style="color:#00b33c;">Market</span>
        </h1>
        <img src="../../images/signup-image.jpg" alt style="height:40%;">
        <h5 class="font-weight-light mb-3">Please input your data</h5>
        <div class="row">
          <div class="col-md-4 mx-auto">
            <div>
                <div v-if="this.success_status==true" class="alert alert-success" role="alert">
                 {{success_message}}
                </div>
                <div v-if="this.failed_status==true" class="alert alert-danger" role="alert">
                  {{failed_message}}
                </div>
                </div>
            <form v-on:submit.prevent="register">
              <div class="form-group">
                <label for="exampleInputEmail1" class="text-left">Name</label>
                <input
                  v-model="user.name"
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="name"
                >
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1" class="text-left">Email address</label>
                <input
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="enter email"
                >
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  v-model="user.password"
                  type="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="enter password"
                >
              </div>
              <button type="submit" class="btn btn-primary btn-block">Register</button>
            </form>
            <br>
            <h6>
              <a>
                <hr>
                <router-link to="/">Home</router-link>
                <hr>
              </a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/api/api.js'

export default {
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      axios({
        method: 'post',
        url: '/register',
        data: this.user
      })
        .then(({ data }) => {
          console.log(data)
          this.user.name = ''
          this.user.email = ''
          this.user.password = ''
          this.success_status = true
          this.success_message = data.message
          setTimeout(() => {
            this.success_status = false
          }, 3000)
        })
        .catch(({ response }) => {
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
