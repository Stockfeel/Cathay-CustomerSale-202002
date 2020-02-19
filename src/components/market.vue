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
          <span>申辦網路服務</span>
        </span>
        <span>
          <span>申辦網路服務</span>
        </span>
        <span>
          <span>申辦網路服務</span>
        </span>
      </div>
      <MoreButton>
        <p>看更多紀錄</p>
        <Icon :iconUrl="require('../assets/button_more.svg')" :size="20"/>
      </MoreButton>
    </MarketLayout>
  </Card>
</template>

<script>
import { Card, Title, MoreButton, Icon } from '../style.js';
import styled from 'vue-styled-components';

const MarketLayout = styled.section`
  padding: 10px 25px;
`

export default {
  name: 'Market',
  components: {
    Card,
    Title,
    MoreButton,
    MarketLayout,
    Icon
  },
  data () {
    return {
      market: {
        date: '108/12/26',
        time: '10:36',
        owner: '陳世華',
        place: '世界服務中心',
        data: [
          {
            state: 0,
            note: '申辦網路服務'
          },
          {
            state: 1,
            note: '申辦網路服務'
          },
          {
            state: 2,
            note: '申辦網路服務'
          }
        ]
      } 
    }
  },
}
</script>
