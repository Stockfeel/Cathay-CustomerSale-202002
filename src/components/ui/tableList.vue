<template>
  <div>
    <List v-if="data.length > 0 && Array.isArray(data)" :listDirection="direction || 'row'">
      <ListItem v-for="(item, idx) in data" :key="idx">{{ item }}</ListItem>
    </List>
    <List v-if="data.length > 0 && !Array.isArray(data)" :listDirection="direction || 'row'">
      <ListItem>{{ data }}</ListItem>
    </List>
    <WarningText v-if='data.length === 0'>
      尚無資料，詢問搜集輪廓吧！
      <Icon 
        @click="toEditPage"
        :iconUrl="require('../../assets/icon-edit-edit-green.svg')" 
        :size="15">
      </Icon>
    </WarningText>
  </div>
</template>

<script>
import { 
  List, 
  ListItem,
  Icon } from '../../style.js';
import styled from 'vue-styled-components';

const WarningText = styled.div`
  color: #05b077;
  font-size: 14px;
`

export default {
  name: 'TableList',
  props: ['field', 'data', 'toggleEdit', 'direction'],
  components: {
    List,
    ListItem,
    Icon,
    WarningText
  },
  methods: {
    toEditPage() {
      this.toggleEdit(this.field);
    }
  }
}
</script>
