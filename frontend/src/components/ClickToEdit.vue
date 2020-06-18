<template>
  <div>
    <b-form-input type="text"
           v-if="edit"
           :value="valueLocal"
           @blur.native="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal);"
           @keyup.enter="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal); $emit('action', submit);"
           v-focus=""
             />
        <p v-else="" @click="edit = true;">
          {{valueLocal}}
        </p>
    </div>
</template>

<script>
  export default {

  props: ['value','action'],

  data () {
  return {
      edit: false,
      valueLocal: this.value,
      submit: this.action,
    }
  },

  watch: {
    value: function() {
      this.valueLocal = this.value;
    }
  },

  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }

}
</script>