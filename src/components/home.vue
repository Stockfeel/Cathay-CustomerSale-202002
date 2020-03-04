<template>
  <HomeLayout>
    <div class="time">
      00:08:14
      <div class="time__tooltip">已服務時間</div>
    </div>
    <ProfileSection :user="user" :service="service"/>
    <MarketSection :market="market" />
    <SuggestSection :service="suggest.service" :product="suggest.product"/>
  </HomeLayout>
</template>

<script>
import ProfileSection from './profileSection.vue';
import MarketSection from './marketSection.vue';
import SuggestSection from './suggestSection.vue';
import styled from 'vue-styled-components';

const HomeLayout = styled.div`
  background: #d2f8f3;
  width: 100%;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  padding: 10px 0;
  .time {
    position: absolute; 
    font-size: 14px;
    top: 0;
    right: 0;
    background: #616161;
    color: white;
    padding: 3px 3px 3px 10px;
    border-bottom-left-radius: 15px;
    cursor: pointer;   
    .time__tooltip {
      visibility: hidden;
      position: absolute;
      margin-top: 10px;
      margin-left: -50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      color: #324c5a;
      background: white; 
      box-shadow: 0 6px 15px 0 rgba(128, 197, 197, 0.72);
      padding: 2px 5px;
      width: 105px;
      height: 40px;
    }
    &:hover {
      .time__tooltip {
        visibility: visible;
      }
    }
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
      }
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
