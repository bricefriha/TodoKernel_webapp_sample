<template>
  <div>
    <b-form-input type="text"
           v-if="edit"
           :value="valueLocal"
           @blur.native="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal);"
           @keyup.enter="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal); $emit('action', submit);"
           v-focus=""
             />
      <b-row v-else @click="edit = true;" style="margin-left=20px !important;">
        <b-col >
        <strong  >
          {{valueLocal}}
        </strong>
        </b-col>
        <b-col cols="2">
          <font-awesome-icon size="sm" style="margin-right=20px !important;" :icon="['fas', 'pen']" />
        </b-col>
      </b-row>

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