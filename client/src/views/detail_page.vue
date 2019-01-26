<template>
    <div class="container" style="padding-top:40px">
        <br>
        <br>
        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-12">
                        <h6>Detail</h6>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                            <img class="card-img-top" src="https://s0.bukalapak.com/img/0141488843/w-1000/image.jpg"
                            alt="Card image cap">
                    </div>
                    <div class="col-md-8">
                        <div>
                    <div v-if="this.success_status==true" class="alert alert-success" role="alert">
                    {{success_message}}
                    </div>
                    <div v-if="this.failed_status==true" class="alert alert-danger" role="alert">
                    {{failed_message}}
                    </div>
                     </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h4>{{this.product.title}}</h4>
                                <hr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h5>Rp.{{this.product.price}}</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                    <label for="">Tersedia <span style="color:#00b33c;">{{this.product.stock}}</span> stok barang</label><br>
                                <label for="">Masukkan jumlah yang diinginkan</label>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <button type="button" class="btn btn-secondary" @click="down_qty()">-</button>
                                            </div>
                                            <div class="col-md-6 ">
                                                <form>
                                                    <div class="form-group ">
                                                        <input v-model= "qty" class="form-control text-center" placeholder="0">
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="col-md-3" style="margin-left:-15px">
                                                <button type="button" class="btn btn-secondary" @click="up_qty()">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-success" style="width:100%" @click="add_cart">  add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-10">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Description</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p>
                                Advertisement definition is - a public notice; especially : one published in the press or broadcast over the air. How to use advertisement in a sentence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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
                           <h6 style="font-size:11px"> <span style="color:#00b33c;">100</span> Points</h6>
                         </div>
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
  name: 'detail_product',
  components: {
  },
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      qty: 1,
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
  methods: {
    get_product () {
      axios({
        method: 'GET',
        url: `/items/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.product.title = data.title
          this.product.price = data.price
          this.product.stock = data.stock
          this.product.description = data.description
          this.product.img = data.img
          this.product.id = data._id
          this.product.category = data.category
        }).catch((err) => {
          console.log(err.response.data)
        })
    },
    up_qty () {
      if (this.qty < this.product.stock) this.qty += 1
    },
    down_qty () {
      if (this.qty !== 1) this.qty -= 1
    },
    add_cart () {
      if (this.qty <= 0) {
        console.log('err')
      } else {
        let accessToken = localStorage.getItem('token')
        axios({
          method: 'POST',
          url: '/transactions/cart',
          headers: {
            token: accessToken
          },
          data: {
            item_id: this.product.id,
            total_item: this.qty
          }
        })
          .then(({ data }) => {
            this.$emit('get_cart')
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
    }
  },
  created () {
    this.get_product()
  }
}
</script>
