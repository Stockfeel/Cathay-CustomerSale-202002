<template>
  <div @mouseover="isMenuOpen = true" @mouseout="isMenuOpen = false">
    <DropDownButton @click="show()">
      <span>{{ text }}</span>
      <Icon v-show="!isMenuOpen" :iconUrl="require('../../assets/icon-arrow-white-down.svg')" />
      <Icon v-show="isMenuOpen" :iconUrl="require('../../assets/icon-arrow-white-up.svg')" />        
    </DropDownButton>
    <Spacing />
    <DropDownMenu v-show="isMenuOpen">
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
import styled from 'vue-styled-components';

const Spacing = styled.div`
  width: 110px;
  height: 10px;
`

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
    LinkStyle,
    Spacing
  },
  data () {
    return {
      isMenuOpen: false,
    }
  },
}
</script>