<template>
  <FormInput :inputBasis="width">
    <textarea v-model="noteInput" 
      :class="noteInput.length >= 60 ? 'lock' : ''"></textarea>
    <div 
      :class="noteInput.length >= 60 ? 'word__count lock' : 'word__count'">
      {{ noteInput.length }}/60
    </div>
  </FormInput>
</template>

<script>
import { FormInput } from '../../style.js';

export default {
  name: 'Textarea',
  props: {
    width: String
  },
  components: {
    FormInput
  },
  data () {
    return {
      noteInput: ''
    }
  },
}
</script>
