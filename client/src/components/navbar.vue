<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light">
      <router-link to="/">
      <a class="navbar-brand">
        <h4>
          watch
          <span style="color:#00b33c">Market</span>
        </h4>
      </a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div></div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown" l>
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Category</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a>testing</a>
            </div>
          </li>
        </ul>
      </div>
      <form class="form-inline my-1 my-lg-1" id="search-nav">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="search-nav-b"
        >
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <!-- chart -->
      <a
        class="far fa-user-circle"
        data-toggle="tooltip"
        data-placement="top"
        title="profile"
        aria-hidden="true"
        style="margin-right:10px"
      ></a>
      <a
        style="margin-right:5px; font-size:1.3rem;"
        class="cui-cart"
        aria-hidden="true"
        title="Shopping cart"
        data-toggle="popover"
        data-placement="bottom"
      ></a>
      <span class="badge badge-pill badge-success" style="margin-right:20px;margin-left:5px">{{this.carts.length}}</span>
      <div id="button-logout" v-show="login_status==true">
        <a class="btn btn-sm btn-outline-secondary" style="margin-right:10px;" @click="$emit('logout')">logout</a>
      </div>
      <div id="button-login" v-show="login_status==false">
        <router-link to="/login">
        <a class="btn btn-sm btn-outline-secondary" style="margin-right:10px">login</a>
        </router-link>
         <router-link to="/register">
        <a class="btn btn-sm btn-outline-secondary" style="margin-right:20px">register</a>
         </router-link>
      </div>
      <div id="popover-content" style="display:none">
        <ul class="list-group custom-popover" v-for="(item,index) in carts" :key="index">
          <li class="list-group-item">
            <div class="row">
              <div class="col-md-4">
                <img
                  class="card-img-top"
                  :src="item.item_id.img"
                  alt="Card image cap"
                >
              </div>
              <div class="col-md-8">
                <h6 style="font-size:10px">{{item.item_id.title}}</h6>
                <div class="row" style="font-size:15px">
                  <div class="col-md-12">
                    {{item.total_item}}
                    <span style="color:#00b33c;">item</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <hr>
        <div class="row">
          <div class="col md-12">
            <router-link to="/cart">
            <button type="button" class="btn btn-success" style="width:100%">cart</button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data: function () {
    return {

    }
  },
  props: ['login_status', 'carts'],
  methods: {

  }
}
</script>
