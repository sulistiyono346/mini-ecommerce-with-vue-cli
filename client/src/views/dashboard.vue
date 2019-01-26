<template>
<div class="dashboard">
  <dsnavbar :user_login='user_login' @logout="logout($event)"></dsnavbar>
    <div id="main-admin">
        <div class="row">
         <dssitebar></dssitebar>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dashboard</h1>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-primary text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                        <h1>20</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">Tools</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-success text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                    <h1>20</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">Tutorial</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-info text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                    <h1>20</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">Explanations</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-danger  text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                    <h1>20</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">Beginner</div>
                        </div>
                    </div>
                </div>
                <hr>
                <h5>Category</h5>
                <hr>
                    <div class="row">
                    <div class="col-md-8" id="main">
                        <div class="card bg-light mb-3">
                            <div class="card-header">TOP V</div>
                            <div class="card-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>example title</td>
                                            <td>20</td>
                                            <td>2000.000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" id="rightbar">
                        <div class="card bg-light mb-3">
                            <div class="card-header">TOP 3</div>
                            <div class="card-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>2</td>
                                            <th scope="col">3</th>
                                        </tr>
                                    </tbody>
                                </table>
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
// import dsproduct from '@/components/dsproduct.vue'
// import dscategory from '@/components/dscategory.vue'
import dsnavbar from '@/components/dsnavbar.vue'
import dssitebar from '@/components/dssitebar.vue'
export default {
  name: 'dashboard',
  components: {
    dsnavbar,
    dssitebar
  },
  data () {
    return {

    }
  },
  props: ['user_login'],
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>
