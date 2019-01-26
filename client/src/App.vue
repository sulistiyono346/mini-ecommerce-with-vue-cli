<template>
  <div id="app">
    <navbar :carts="carts" :login_status = 'login_status' @logout="logout($event)" v-show="$route.name != 'login' && $route.name != 'register' && $route.name != 'dashboard' && $route.name != 'dashboard_product' && $route.name != 'dashboard_category'"></navbar>
    <router-view :carts="carts" @get_cart="get_cart" @islogin="isLogin($event)" @logout="logout($event)" :user_login="user"/>
  </div>
</template>
<script>
import navbar from '@/components/navbar.vue'
import axios from '@/api/api.js'

export default {
  name: 'App',
  components: {
    navbar
  },
  data: function () {
    return {
      login_status: false,
      carts: [],
      user: {
        id: '',
        name: '',
        email: '',
        role: '',
        img: ''
      }
    }
  },
  methods: {
    isLogin () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'get',
        url: '/validate',
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          if (data.user.role === 'customer') {
            this.get_cart()
            this.$router.push('/')
            this.user.id = data.user._id
            this.user.name = data.user.name
            this.user.email = data.user.email
            this.user.role = data.user.role
            this.user.img = data.user.img
          } else {
            this.user.id = data.user._id
            this.user.name = data.user.name
            this.user.email = data.user.email
            this.user.role = data.user.role
            this.user.img = data.user.img
            this.$router.push('/dashboard')
          }
          this.login_status = true
        })
        .catch(({ response }) => {
          this.$router.push('/')
        })
    },
    get_cart () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/transactions/cart`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.carts = data
        }).catch((err) => {
          console.log(err.response)
        })
    },

    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
      this.login_status = false
    }
  },
  created () {
    this.isLogin()
  }
}
</script>

<style>
/* login  */
.text-grey {
    color: #606f7b;
  }

  .text-blue {
    color: blue;
  }
  .card {
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    /* border-radius: 0.25rem; */
  }

  .list-none {
    list-style: none;
    padding: 0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .display-none {
    display: none;
  }
  /* login */

  #sidebar .list-group-item {
    border-radius: 0;
    background-color: #333;
    color: #ccc;
    border-left: 0;
    border-right: 0;
    border-color: #2c2c2c;
    white-space: nowrap;
}

/* highlight active menu */
#sidebar .list-group-item:not(.collapsed) {
    background-color: #222;
}

/* closed state */
#sidebar .list-group .list-group-item[aria-expanded="false"]::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 5px;
}

/* open state */
#sidebar .list-group .list-group-item[aria-expanded="true"] {
  background-color: rgb(238, 224, 224);
}
#sidebar .list-group .list-group-item[aria-expanded="true"]::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 5px;
}

/* level 1*/
#sidebar .list-group .collapse .list-group-item  {
  padding-left: 20px;
}
/* level 2*/
#sidebar .list-group .collapse > .collapse .list-group-item {
  padding-left: 30px;
}
/* level 3*/
#sidebar .list-group .collapse > .collapse > .collapse .list-group-item {
  padding-left: 40px;
}
@media (max-width:48em) {
    /* overlay sub levels on small screens */
    #sidebar .list-group .collapse.in, #sidebar .list-group .collapsing {
        position: absolute;
        z-index: 1;
        width: 190px;
    }
    #sidebar .list-group > .list-group-item {
        text-align: center;
        padding: .75rem .5rem;
    }
    /* hide caret icons of top level when collapsed */
    #sidebar .list-group > .list-group-item[aria-expanded="true"]::after,
    #sidebar .list-group > .list-group-item[aria-expanded="false"]::after {
        display:none;
    }
}
/* change transition animation to width when entire sidebar is toggled */
#sidebar.collapse {
  -webkit-transition-timing-function: ease;
       -o-transition-timing-function: ease;
          transition-timing-function: ease;
  -webkit-transition-duration: .2s;
       -o-transition-duration: .2s;
          transition-duration: .2s;
}
#sidebar.collapsing {
  opacity: 0.8;
  width: 0;
  -webkit-transition-timing-function: ease-in;
       -o-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
  -webkit-transition-property: width;
       -o-transition-property: width;
          transition-property: width;

}
/* sidebar */

#search-nav-b{
  width: 500px
  }
  #search-nav
  {
    margin-left: 20px;
    margin-right: 100px;
  }
  #main-admin{
    margin-top: 10px
  }

</style>
