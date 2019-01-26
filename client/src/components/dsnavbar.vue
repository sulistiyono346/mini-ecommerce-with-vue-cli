<template>
     <div id="dashboard_navbar">
        <nav class="navbar navbar-light  justify-content-between">
        <router-link to="/">
            <a class="navbar-brand">
                <h4>
                watch
                <span style="color:#00b33c">Market</span>
                </h4>
            </a>
            </router-link>
            <div class="form-inline">
            <br>
                <p style="margin-right:50px; margin-top:20px"> Welcome, {{this.user_login.name}}</p>
                <div id="button-logout">
                    <a @click="$emit('logout')" class="btn btn-sm btn-outline-secondary" style="margin-right:10px">logout</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['user_login']
}
</script>
