<template>
  <div>
    <DropDownButton @mouseover="isMenuOpen = true" @click="show()">
      <span>{{ text }}</span>
      <Icon v-show="!isMenuOpen" :iconUrl="require('../../assets/icon-arrow-white-down.svg')" />
      <Icon v-show="isMenuOpen" :iconUrl="require('../../assets/icon-arrow-white-up.svg')" />        
    </DropDownButton>
    <DropDownMenu v-show="isMenuOpen"
      @mouseover="isMenuOpen = true"
      @mouseout="isMenuOpen = false"
    >
      <router-link v-for="(item, idx) in list"
        tag="div" 
        :key="`menu-${idx}`"
        :to="`./${item.slug}`">
        <LinkStyle textColor="#324c5a">{{ item.text }}</LinkStyle>
      </router-link>
    </DropDownMenu>
  </div>
</template>

<script>
import { 
  Icon, 
  DropDownButton, 
  DropDownMenu, 
  LinkStyle } from '../../style.js';

export default {
  name: 'DropDown',
  props: {
    text: String, 
    list: Array
  },
  components: {
    Icon,
    DropDownButton,
    DropDownMenu,
    LinkStyle
  },
  data () {
    return {
      isMenuOpen: false,
    }
  },
}
</script>
