<template>
    <b-card
    img-top
    tag="article"
    class="mb-2 login-card ">
    <label class="title" >Log in</label>
    <!-- username -->
    <b-form-group
      id="fieldset-1"
      label="Username or Email"
      label-for="input-1"
      @focus="loginHasBeenFocus= true"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="loginState">
      <b-form-input id="input-1" class="input-card" v-model="login" :state="loginState" trim></b-form-input>
    </b-form-group>
    <!-- password -->
    <b-form-group
      id="fieldset-1"
      label="Password"
      label-for="input-2"
      @focus="passwordHasBeenFocus= true"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="passwordState">
      <b-form-input id="input-2" class="input-card" v-model="password" :state="passwordState" trim></b-form-input>
    </b-form-group>

    <b-button href="#" class="login-button">Log in</b-button>
  </b-card>
</template>
<style scoped>
    .login-card{
        max-width: 50rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        margin-top: 10px;
        background-color: #fff ;
        border-radius: 12px;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19);
        

    }
    .input-card {
        width: 50%;
        margin: auto;
    }
    .login-button {
        border-radius: 16px;
        color: #fff;
        border-color: #3298FF;
        background-color: #3298FF;
        padding-top: 7px;
        padding-right: 20px;
        padding-bottom: 7px;
        padding-left: 20px;
        margin: auto;
        width: 50%;
        }
    .title {
        color: #1E2023 !important;
        font-size: 50px !important; 
        margin-left: 10px;
        font-weight: bold;
}
</style>
<script>
  export default {
    computed: {
      loginState() {
          console.log(this.loginHasBeenFocus);
          if (this.loginHasBeenFocus) {
              console.log("hey");
              return this.login.length > 0 ? true : false;
          } 
              console.log(this.loginHasBeenFocus);
              return true;
        
      },
      passwordState() {
        return this.password.length >= 4 ? true : false
      },
      invalidFeedback() {
        if (this.login.length > 4) {
          return ''
        } else if (this.login.length > 0) {
          return 'Enter at least 4 characters'
        } else {
          return 'Please enter something'
        }
      },
      validFeedback() {
        return this.state === true ? 'Thank you' : ''
      }
    },
    data() {
      return {
        login: '',
        password: '',
        loginHasBeenFocus: false,
        passwordHasBeenFocus: false,
      }
    }
  }
</script>