<template>
  <Card cardDirection="column">
    <MarketLayout>
      <Title>行銷紀錄</Title>
      <div>
        <span>108/12/26/10:36：</span>
        <span>陳世華</span>
        <span> (世界服務中心)</span>
      </div>
      <div>
        <span>
          <span v-for="(item, idx) in market.data" :key="`market-${idx}`">
            <Icon v-if="item.state === 1" :size='15'
              :iconUrl="require('../assets/icon-accept.svg')"/>
            <Icon v-if="item.state === 2" :size='15'
              :iconUrl="require('../assets/icon-refuse.svg')"/>
            <Icon v-if="item.state === 3" :size='15'
              :iconUrl="require('../assets/icon-notime.svg')"/>  
            申辦網路服務
          </span>
        </span>
      </div>
      <router-link to='./market'>
        <MoreButton>
          <p>看更多紀錄</p>
          <Icon :iconUrl="require('../assets/button_more.svg')" :size="20"/>
        </MoreButton>
      </router-link>
    </MarketLayout>
  </Card>
</template>

<script>
import { 
  Card, 
  Title, 
  MoreButton, 
  Icon } from '../style.js';
import styled from 'vue-styled-components';

const MarketLayout = styled.section`
  padding: 10px 25px;
`

export default {
  name: 'MarketSection',
  components: {
    Card,
    Title,
    MoreButton,
    MarketLayout,
    Icon
  },
  props: {
    market: Object
  },
}
</script>
