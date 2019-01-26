<template>
    <div id="carts_page" style="padding-top:80px">
    <div class="container">
        <div class="row">
            <!-- left -->
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-12">
                        <h6>Shipping</h6>
                        <hr>
                    </div>
                </div>
                <div class="row">
                  <div class="col-md-10">
                    <div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Full name</label>
                        <input v-model="detail_shipping.name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="full name">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControl"  >Province</label>
                        <select class="form-control" v-model="provinceid" >
                        <option disabled value="">Please select one</option>
                        <option v-for="data in this.province" :key="data._id" :value="data.province_id">{{data.province}}</option>
                    </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">City</label>
                        <select class="form-control" v-model="cityid">
                        <option disabled value="">Please select one</option>
                            <option v-for="data in this.city" :key="data._id" :value="data.city_id">{{data.city_name}}</option>
                            </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">Courier</label>
                        <select class="form-control" id="exampleFormControlSelect2" v-model="courier">
                        <option disabled value="">Please select one</option>
                            <option>JNE</option>
                            <option>POS</option>
                            <option>TIKI</option>
                        </select>
                        </div>
                        <div class="form-group">
                        <label for="exampleFormControlSelect2">Services</label>
                        <select class="form-control" id="exampleFormControlSelect2" v-model="cost">
                        <option disabled value="">Please select one</option>
                            <option v-for="data in this.services" :key="data._id" :value="data.cost[0]">{{data.service}} <span style="color:#00b33c;">Rp.{{data.cost[0].value}}</span>***<span>{{data.cost[0].etd}}</span></option>
                        </select>
                        </div>
                    <div class="form-group">
                    <label for="exampleFormControlTextarea1">Detail Address</label>
                    <textarea v-model="detail_shipping.address" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                     </div>
                    <button type="submit" class="btn btn-primary mb-2" @click="checkout()" >Checkout</button>
                    </div>
                    </div>
                </div>
            </div>
            <!-- right -->
            <div class="col-md-3">
                <h5>Profile</h5>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-4">
                                <span class="fa fa-credit-card fa-2" style="font-size:2rem"></span>
                            </div>
                            <div class="col-md-8">
                                <h6>Wallet</h6>
                                <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">20000</span></h6>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-4">
                                <span class="cui-dollar mr-4" style="font-size:2rem"></span>
                            </div>
                            <div class="col-md-8">
                                <h6>Point</h6>
                                <h6 style="font-size:11px"> <span style="color:#00b33c;">2000</span> Points</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <br>
                <div class="row">
                        <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-4">
                                        <span class="cui-cart" aria-hidden="true" style="font-size:1.3rem"></span>
                                    </div>
                                    <div class="col-md-8">
                                        <h6>Item Price</h6>
                                        <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">{{total_item}}</span></h6>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-4">
                                        <span class="fa fa-truck" style="font-size:1.3rem"></span>
                                    </div>
                                    <div class="col-md-8">
                                        <h6>Shipping Price</h6>
                                        <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">{{cost.value}}</span></h6>
                                    </div>
                                </div>
                            </div>
                        <div class="col-md-4" >
                            <div class="row">
                                <div class="col-md-4">
                                    <span class="cui-bookmark" aria-hidden="true" style="font-size:1.7rem"></span>
                                </div>
                                <div class="col-md-8">
                                    <h6>Total:</h6>
                                    <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;" placeholder="0" >{{total_item+(cost.value*carts.length)}}</span></h6>
                                </div>
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
  name: 'shipping',
  components: {
  },
  data () {
    return {
      province: '',
      provinceid: '',
      city: '',
      cityid: '',
      courier: '',
      detail_shipping: {
        name: '',
        address: ''
      },
      services: '',
      cost: {
        value: 0
      }
    }
  },
  props: ['carts'],
  methods: {
    get_provinces () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: '/provinces',
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.province = data
        }).catch(({ response }) => {
          console.log(response)
        })
    },
    get_cities () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/city/${this.provinceid}`,
        headers: {
          token: accessToken
        }
      })
        .then((result) => {
          this.city = result.data
        }).catch(({ response }) => {
          console.log(response)
        })
    },
    get_services () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: `/services`,
        data: {
          destination: this.cityid,
          courier: this.courier
        },
        headers: {
          token: accessToken
        }
      })
        .then((result) => {
          this.services = result.data
        }).catch(({ response }) => {
          console.log(response)
        })
    },
    checkout () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: `/transactions/checkout`,
        data: {
          provinceid: this.provinceid,
          cityid: this.cityid,
          courier: this.courier,
          detail_shipping: this.detail_shipping,
          cost: this.cost
        },
        headers: {
          token: accessToken
        }
      })
        .then((result) => {
          this.services = result.data
        }).catch(({ response }) => {
          console.log(response)
        })
    }
  },
  computed: {
    total_item () {
      let total = 0
      this.carts.forEach(data => {
        total += data.item_id.price * data.total_item
      })
      return total
    }
  },
  watch: {
    provinceid: function () {
      this.get_cities()
    },
    courier: function () {
      this.get_services()
    }
  },
  mounted () {
    this.get_provinces()
  }
}
</script>
