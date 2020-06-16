<template>
    <div>
  <b-navbar toggleable="lg" type="light"  class=" fixed-top navbar-custom">
    <router-link :to="{ name:'home'}" >
      <b-navbar-brand  class="navbar-title">TodoKernel: Web Application</b-navbar-brand>
    </router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      
        
        <!-- If a user is connected -->
        <b-navbar-nav v-if="user" right>
          <b-nav-item-dropdown >
            <!-- user tag -->
            <template v-slot:button-content>
              <strong>{{user.username}}</strong>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOut" >Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav v-else right class="ml-auto">
          <router-link :to="{ name:'login'}" >
            <b-button  class="my-2 my-sm-0 navbar-button" >Log in</b-button>
          </router-link>
          <router-link :to="{ name:'signup'}" >
            <b-button  class="my-2 my-sm-0 navbar-button">Sign up</b-button>
          </router-link>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    signOut () {
      // Remove session 
      this.$store.commit('user', null);
      // Go to home page
      this.$router.push("/");
    }
  }
}
</script>
<style scoped>

.navbar-custom {
    color: #fafafa;
    background-color: #FFA500;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.19);
}
.navbar-title {
  color: #1E2023 !important;
  font-size: 30px !important; 
  margin-left: 10px;
   font-weight: bold;
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.navbar-button {
  border-radius: 16px;
  color: #fafafa;
  border-color: #005AFF;
  background-color: #005AFF;
  padding-top: 7px;
  padding-right: 20px;
  padding-bottom: 7px;
  padding-left: 20px;
  margin:6px;
}
</style>