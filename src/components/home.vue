<template>
  <HomeLayout>
    <div class="time">
      00:08:14
    </div>
    <ProfileSection :user="user" :service="service"/>
    <MarketSection :market="market" />
    <SuggestSection :service="suggest.service" :product="suggest.product" :insurances="insurances"/>
  </HomeLayout>
</template>

<script>
import ProfileSection from './profileSection.vue';
import MarketSection from './marketSection.vue';
import SuggestSection from './suggestSection.vue';
import styled from 'vue-styled-components';

const HomeLayout = styled.div`
  background: #d2f8f3;
  height: 100%;
  width: 100%;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  .time {
    position: absolute; 
    font-size: 14px;
    top: 0;
    right: 0;
    background: #616161;
    color: white;
    padding: 3px 3px 3px 10px;
    border-bottom-left-radius: 15px;
  } 
`

export default {
  name: 'Home',
  data() {
    return {
      user: {
        name: '林國泰',
        age: 31,
        specials: ['XXX/XX/XX 申訴名單', 'XXX/XX拒絕行'],
        features: ['慣用左手','不識字'],
        employee: '國壽副總',
        tags: ['旅遊愛好','新手爸媽','數位族'],
      },
      service: {
        date: '108/12/26',
        time: '10:36',
        route: '0800 進線',
        note: '申請 ATM 保單借款'
      },
      market: {
        date: '108/12/26',
        time: '10:36',
        owner: '陳世華',
        place: '世界服務中心',
        data: [
          {
            state: 1,
            note: '申辦網路服務'
          },
          {
            state: 2,
            note: '申辦網路服務'
          },
          {
            state: 3,
            note: '申辦網路服務'
          }
        ]
      },
      suggest: {
        service: [
          {
            id: 1,
            title: '申辦網路服務',
            state: 1,
          },
          {
            id: 2,
            title: '申辦電子單據',
            state: 2,
          },
          {
            id: 3,
            title: '申辦網路服務',
            state: 3,
          },
          {
            id: 4,
            title: '申辦網路服務',
            state: 1,
          },
          {
            id: 5,
            title: '申辦電子單據',
            state: 2,
          },
          {
            id: 6,
            title: '申辦電子單據',
            state: 0,
          }
        ],
        product: [
          {
            id: 1,
            title: '意外附約升級',
            state: 0,
          },
          {
            id: 2,
            title: '意外附約目標客戶',
            state: 2,
          },
          {
            id: 3,
            title: '意外附約升級',
            state: 3,
          },
          {
            id: 4,
            title: '意外附約目標客戶',
            state: 2,
          },
          {
            id: 5,
            title: '意外附約目標客戶',
            state: 1,
          },
          {
            id: 6,
            title: '意外附約升級',
            state: 1,
          }
        ]
      },
      insurances: [
        {
          text: '照護給付',
          value: 10000,
          average: 30000
        },
        {
          text: '重疾給付',
          value: 3444,
          average: 30000
        },
        {
          text: '癌症醫療',
          value: 12345789,
          average: 30000
        },
        {
          text: '實支實付',
          value: 40000,
          average: 30000
        },
        {
          text: '手術醫療',
          value: 10000,
          average: 5324
        },
        {
          text: '疾病醫療',
          value: 10000,
          average: 30000
        },
        {
          text: '意外醫療',
          value: 10000,
          average: 30000
        },
        {
          text: '生存給付',
          value: 10000,
          average: 30000
        },
        {
          text: '身故給付',
          value: 10000,
          average: 30000
        },
        {
          text: '傷殘給付',
          value: 10000,
          average: 30000
        }
      ]
    }
  },
  components: {
    ProfileSection,
    MarketSection,
    SuggestSection,
    HomeLayout
  }
}
</script>
