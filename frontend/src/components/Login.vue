<template>

      <b-card
      img-top
      tag="article"
      class="mb-2 login-card ">
      <b-form v-if="this.$route.name === 'login'" @submit="loginSubmit" >
      <label class="title" >Log in</label>

          <!-- username -->
          <b-form-group
            id="fieldset-1"
            label="Username or Email"
            label-for="input-1"
            >
            <b-form-input id="input-1" class="input-card" required v-model="form.login" trim></b-form-input>
          </b-form-group>
          <!-- password -->
          <b-form-group
            id="fieldset-2"
            label="Password"
            label-for="input-2">
            <b-form-input id="input-2" class="input-card" v-model="form.password" :type="'password'" required trim></b-form-input>
          </b-form-group>
          <!-- In case there is an error -->
           <b-alert v-if="this.form.error.length > 0" variant="danger" v-text="form.error" show></b-alert>

        <b-button type="submit" class="login-button" >Log in</b-button>
      </b-form>
      <b-form v-if="this.$route.name === 'signup'" @submit="loginSubmit" >

        <label class="title" >Sign up</label>
          <!-- username -->
          <b-form-group
            id="fieldsetUsername"
            label="Username"
            label-for="input-1"
            >
            <b-form-input id="input-1" class="input-card" required v-model="form.login"  trim></b-form-input>
          </b-form-group>
          <!-- username -->
          <b-form-group
            id="fieldsetEmail"
            label="Email"
            label-for="inputEmail"
            >
            <b-form-input id="inputEmail" class="input-card" required v-model="form.login" trim></b-form-input>
          </b-form-group>
          <!-- password -->
          <b-form-group
            id="fieldsetPassword"
            label="Password"
            label-for="inputPassword">
            <b-form-input id="inputSignupPassword" class="input-card" v-model="form.password" :type="'password'" required trim></b-form-input>
          </b-form-group>
          <!-- verify password -->
          <b-form-group
            id="fieldsetPassword"
            label="Verify the password"
            label-for="inputPasswordVerif">
            <b-form-input id="inputSignupPasswordVerif" class="input-card" v-model="form.password" :type="'password'" required trim></b-form-input>
          </b-form-group>
          <!-- In case there is an error -->
           <b-alert v-if="this.form.error.length > 0" variant="danger" v-text="form.error" show></b-alert>

        <b-button type="submit" class="login-button" >Sign up</b-button>
      </b-form>
  </b-card>
</template>
<style scoped>
    .login-card{
        max-width: 40rem;
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
        border-color: #005AFF;
        background-color: #005AFF;
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
    methods: {
      async loginSubmit(evt) {
        // Reset the error
        this.form.error = '';
        evt.preventDefault();

        // Set a object user
        const logins = {
          username: this.form.login,
          password: this.form.password,

        }

        // Request the server
        this.$http.post("/users/authenticate", logins).then(response => {
            this.$store.user = response.data;
            //
            this.$router.push("/");
        }).catch((error) => {    
            this.form.error = error.response.data.message + " 😥";   
        });
      }
    },
    computed: {
      // loginState() {
      //   if (this.loginHasBeenFocus){
      //     console.log("hey");
      //     return this.login.length > 0;
      //   }
      //   return  false;
      // },
      // passwordState() {
      //   return this.password.length >= 4 ? true : false
      // },
      // invalidFeedback() {
      //   if (this.login.length > 4) {
      //     return ''
      //   } else if (this.login.length > 0) {
      //     return 'Enter at least 4 characters'
      //   } else {
      //     return 'Please enter something'
      //   }
      // },
      // validFeedback() {
      //   return this.state === true ? 'Thank you' : ''
      // }
    },
    
    // created() {
    //    this.loginHasBeenFocus = false;
    //    this.loginState = false;
    // },
    
    data() {
      return {
        form: {
        login: '',
        password: '',
        invalidFeedback: '',
        error: '',
        
        }
      }
    }
  }
</script>