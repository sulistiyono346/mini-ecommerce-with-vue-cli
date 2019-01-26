<template>
    <div id="carts_page" style="padding-top:80px">
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-12">
                            <h6>Carts</h6>
                            <hr>
                        </div>
                    </div>
                      <!-- batas -->
                          <div>
                    <div v-if="this.success_status==true" class="alert alert-success" role="alert">
                    {{success_message}}
                    </div>
                    <div v-if="this.failed_status==true" class="alert alert-danger" role="alert">
                    {{failed_message}}
                    </div>
                     </div>
                <ul class="list-group" v-for="(data,index) in carts" :key="index" >
                        <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-1">
                                <img class="card-img-top" src="https://s0.bukalapak.com/img/0141488843/w-1000/image.jpg"
                                alt="Card image cap">
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12">
                                    <h6>{{data.item_id.title}}</h6>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <h5>Rp. {{data.item_id.price}}</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                        <label for="">Tersedia <span style="color:#00b33c;">{{data.item_id.stock}}</span> stok barang</label><br>
                                    <label for="">Masukkan jumlah yang diinginkan</label>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <button type="button" class="btn btn-secondary" @click="down_qty(data._id)">-</button>
                                                </div>
                                                <div class="col-md-6 ">
                                                    <form>
                                                        <div class="form-group ">
                                                            <input  class="form-control text-center"  :placeholder="data.total_item">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-md-3" style="margin-left:-15px">
                                                    <button type="button" class="btn btn-secondary" @click="up_qty(data._id)">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="row">
                                <div class="col-md-12">
                                    <h5>Rp.{{data.item_id.price*data.total_item}}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="row">
                                <div class="col-md-12">
                                    <a  class="cui-trash" aria-hidden="true" @click="delete_cart(data._id)"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    </li>
                </ul>
                    <!-- batas -->
                </div>
                <div class="col-md-3">
                    <h5>Profile</h5>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                        <div class="row">
                                <div class="col-md-4" >
                                        <span class="fa fa-credit-card fa-2" style="font-size:2rem"></span>
                                </div>
                                <div class="col-md-8" >
                                <h6>Wallet</h6>
                               <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">2000.000</span></h6>
                             </div>
                        </div>
                        <hr>
                        <div class="row">
                                <div class="col-md-4" >
                                        <span class="cui-dollar mr-4" style="font-size:2rem"></span>
                                </div>
                                <div class="col-md-8" >
                                <h6>Point</h6>
                               <h6 style="font-size:11px"> <span style="color:#00b33c;">200</span> Points</h6>
                             </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- batas -->
            <div class="row" style="margin:2rem">
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-10">
                                <h6>Subtotal: Rp. {{sub_total}}</h6>
                                 <p>Belum termasuk ongkos kirim</p>
                            </div>
                            <div class="col-md-2">
                                    <router-link to="/shipping">
                                    <button type="button" class="btn btn-success" style="width:100%">pay</button>
                                    </router-link>
                                </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
</template>
<script>
import axios from '@/api/api.js'
export default {
  name: 'Carts',
  data: function () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false
    }
  },
  props: ['carts'],
  methods: {
    get_cart () {
      this.$emit('get_cart')
    },
    delete_cart (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `/transactions/cart/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.$emit('get_cart')
          this.success_status = true
          this.success_message = data.message
          setTimeout(() => {
            this.success_status = false
          }, 3000)
        }).catch((err) => {
          console.log(err.response)
        })
    },
    up_qty (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/transactions/up_qty/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.$emit('get_cart')
        }).catch(({ response }) => {
          this.failed_status = true
          this.failed_message = response.data.message
          setTimeout(() => {
            this.failed_status = false
          }, 3000)
        })
    },
    down_qty (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/transactions/down_qty/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.$emit('get_cart')
        }).catch(({ response }) => {
          this.failed_status = true
          this.failed_message = response.data.message
          setTimeout(() => {
            this.failed_status = false
          }, 3000)
        })
    }
  },
  computed: {
    sub_total () {
      let subTotal = 0
      this.carts.forEach(data => {
        subTotal += data.item_id.price * data.total_item
      })
      return subTotal
    }
  },
  created () {
    this.get_cart()
  }
}
</script>
